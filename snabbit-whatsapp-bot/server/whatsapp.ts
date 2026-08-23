import { serverConfig } from './config'

export interface OutboundMessage {
  type: 'text' | 'interactive'
  text?: { body: string }
  interactive?: {
    body?: { text: string }
    action?: {
      buttons?: Array<{ reply?: { title: string } }>
    }
  }
}

async function sendText(to: string, body: string): Promise<void> {
  if (serverConfig.localMock) {
    console.log(`[MOCK WA → ${to}] ${body}`)
    return
  }
  const url = `https://graph.facebook.com/${serverConfig.graphVersion}/${serverConfig.whatsappPhoneNumberId}/messages`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${serverConfig.whatsappAccessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body },
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`WhatsApp sendText failed: ${res.status} ${err}`)
  }
}

async function sendInteractive(to: string, msg: OutboundMessage): Promise<void> {
  if (serverConfig.localMock) {
    const body = msg.interactive?.body?.text ?? ''
    const btns = msg.interactive?.action?.buttons?.map((b) => b.reply?.title).join(', ') ?? ''
    console.log(`[MOCK WA → ${to}] ${body} [buttons: ${btns}]`)
    return
  }
  const url = `https://graph.facebook.com/${serverConfig.graphVersion}/${serverConfig.whatsappPhoneNumberId}/messages`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${serverConfig.whatsappAccessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'interactive',
      interactive: msg.interactive,
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`WhatsApp sendInteractive failed: ${res.status} ${err}`)
  }
}

export async function sendMessages(to: string, msgs: OutboundMessage[]): Promise<void> {
  for (const m of msgs) {
    if (m.type === 'text' && m.text) {
      await sendText(to, m.text.body)
    } else if (m.type === 'interactive') {
      await sendInteractive(to, m)
    }
  }
}
