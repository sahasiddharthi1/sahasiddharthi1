import { createServer } from 'node:http'
import { create } from '@wppconnect-team/wppconnect'
import type { Message } from '@wppconnect-team/wppconnect'

interface ListOptions {
  buttonText: string
  description: string
  title?: string
  footer?: string
  sections: Array<{
    title: string
    rows: Array<{ rowId: string; title: string; description: string }>
  }>
}

import { createSession, handleUserInput } from '../src/lib/engine'
import { resolveArea } from '../src/lib/areas'
import { presentTurn } from './presenter'
import { store } from './store'
import type { OutboundMessage } from './whatsapp'

const SESSION = process.env.WA_SESSION ?? 'snabbit'
const QR_PORT = Number(process.env.QR_PORT ?? 9090)
const CHROME = process.env.CHROME_PATH ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const HEADLESS = process.env.WA_HEADLESS !== 'false'

let latestQr = ''
let qrAttempts = 0

createServer((req, res) => {
  if (req.url === '/qr.json') {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ qr: latestQr, attempts: qrAttempts }))
    return
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(`<!doctype html><html><head><meta charset="utf-8"><title>Snabbit QR</title></head>
<body style="background:#075E54;color:#fff;font-family:system-ui;display:flex;flex-direction:column;align-items:center;padding:24px">
<h2>Snabbit WhatsApp bot</h2>
<p>Scan this QR with your phone: WhatsApp → Linked devices → Link a device</p>
<img id="qr" style="width:260px;background:#fff;padding:12px;border-radius:12px" alt="QR" />
<p id="hint" style="opacity:.8"></p>
<script>
async function poll(){
  try{
    const r=await fetch('/qr.json'); const d=await r.json();
    if(d.qr){ document.getElementById('qr').src=d.qr; document.getElementById('hint').textContent='QR updated — scan with your phone'; }
    else { document.getElementById('hint').textContent='Waiting for QR...'; }
  }catch(e){}
  setTimeout(poll,1500);
}
poll();
</script>
</body></html>`)
}).listen(QR_PORT, () => {
  console.log(`[qr] Open http://localhost:${QR_PORT} to see the QR code (scan with your phone)`)
})

async function deliver(
  client: {
    sendText: (to: string, body: string) => Promise<unknown>
    sendListMessage: (to: string, opts: ListOptions) => Promise<unknown>
  },
  to: string,
  messages: OutboundMessage[],
): Promise<void> {
  for (const m of messages) {
    if (m.type === 'text') {
      await client.sendText(to, (m.text as { body: string }).body)
    } else if (m.type === 'interactive') {
      const interactive = m.interactive as {
        body?: { text?: string }
        action?: { buttons?: Array<{ reply?: { title?: string } }> }
      }
      const bodyText = interactive.body?.text ?? 'Choose an option:'
      const titles = (interactive.action?.buttons ?? [])
        .map((b) => b.reply?.title)
        .filter((t): t is string => Boolean(t))
      const opts: ListOptions = {
        buttonText: 'Choose',
        description: bodyText,
        sections: [
          {
            title: 'Options',
            rows: titles.map((t, i) => ({ rowId: String(i), title: t, description: ' ' })),
          },
        ],
      }
      await client.sendListMessage(to, opts)
    }
  }
}

function scheduleLocalTracking(client: { sendText: (to: string, body: string) => Promise<unknown> }, to: string, expertName: string): void {
  const plan: Array<{ label: string; delay: number }> = [
    { label: '🎉 Booking accepted', delay: 400 },
    { label: `🚶 ${expertName} is on the way`, delay: 2500 },
    { label: `📍 ${expertName} is 5 min away`, delay: 4500 },
    { label: `✅ ${expertName} arrived`, delay: 5000 },
  ]
  let acc = 0
  for (const step of plan) {
    acc += step.delay
    setTimeout(() => {
      void client.sendText(to, step.label).catch(() => undefined)
    }, acc)
  }
}

async function main(): Promise<void> {
  const client = await create({
    session: SESSION,
    headless: HEADLESS,
    logQR: false,
    autoClose: 0,
    puppeteerOptions: {
      executablePath: CHROME,
      args: ['--no-sandbox', '--disable-gpu'],
    },
    catchQR: (qrBase64) => {
      latestQr = qrBase64
      qrAttempts += 1
      console.log(`\n[qr] New QR generated (attempt ${qrAttempts}) — scan it at http://localhost:${QR_PORT}`)
    },
    statusFind: (status, session) => {
      console.log(`[status] ${status} (session: ${session})`)
      if (String(status).toLowerCase() === 'ready') {
        console.log('[bot] ✅ Online — message your WhatsApp number: "Hi, I need cleaning in Koramangala"')
      }
    },
  })

  client.onMessage((raw) => {
    const msg = raw as Message & { body?: string; fromMe?: boolean; isGroupMsg?: boolean; listResponse?: { title?: string } }
    if (msg.fromMe || msg.isGroupMsg) return
    const text =
      msg.type === 'list_response' ? msg.body ?? msg.listResponse?.title : msg.type === 'chat' ? msg.body : null
    console.log(`[msg] from=${String(msg.from)} type=${msg.type} text=${JSON.stringify(text)}`)
    if (!text) return

    void (async () => {
      const from = msg.from
      const prev = store.get(from)
      const session = prev ?? createSession(resolveArea(text))
      const { turn, session: next } = handleUserInput(session, text)
      store.set(from, next)

      await deliver(client, from, presentTurn(turn))
      if (turn.tracking) scheduleLocalTracking(client, from, next.expert?.name ?? 'the expert')
    })().catch((err) => console.error('[bot] handler error:', err))
  })

  const shutdown = async () => {
    console.log('\n[bot] shutting down…')
    try {
      await client.close()
    } catch {
      // already closed
    }
    process.exit(0)
  }
  process.on('SIGINT', () => void shutdown())
  process.on('SIGTERM', () => void shutdown())
}

void main().catch((err) => {
  console.error('[bot] failed to start:', err)
  process.exit(1)
})
