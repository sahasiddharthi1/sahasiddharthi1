import type { OutboundMessage } from './whatsapp'
import { sendMessages } from './whatsapp'
import { createSession, handleUserInput } from '../src/lib/engine'
import { resolveArea } from '../src/lib/areas'
import { presentTurn } from './presenter'
import { store } from './store'
import { classifyIntent, handleRAGQuery } from './llm-router'

function messageText(body: unknown): string | null {
  const b = body as Record<string, unknown>
  if (typeof b?.type === 'string' && b.type === 'text' && typeof b?.text === 'object' && b.text !== null) {
    const t = b.text as Record<string, unknown>
    if (typeof t.body === 'string') return t.body
  }
  if (typeof b?.type === 'string' && b.type === 'list_response') {
    return (b.body as string) ?? (b.list_response as Record<string, unknown>)?.title as string ?? null
  }
  return null
}

export async function handleIncoming(phone: string, body: unknown): Promise<void> {
  const text = messageText(body)
  if (!text) return

  const prev = store.get(phone)
  const session = prev ?? createSession(resolveArea(text))

  const intent = classifyIntent(text)

  if (intent.type === 'rag' && session.step === 'greeting') {
    const ragResponse = await handleRAGQuery(text)
    const msgs: OutboundMessage[] = [{ type: 'text', text: { body: ragResponse } }]
    await sendMessages(phone, msgs)
    return
  }

  const { turn, session: next } = handleUserInput(session, text)
  store.set(phone, next)

  const msgs: OutboundMessage[] = presentTurn(turn)
  await sendMessages(phone, msgs)
}
