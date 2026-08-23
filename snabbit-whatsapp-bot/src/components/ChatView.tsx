import { useState, useRef, useEffect } from 'react'
import { createSession, handleUserInput } from '../lib/engine'
import MessageBubble from './MessageBubble'
import PaymentSheet from './PaymentSheet'

interface Msg {
  id: number
  text: string
  isBot: boolean
}

export default function ChatView({ area }: { area?: string }) {
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [session, setSession] = useState(() => createSession(area))
  const [typing, setTyping] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)

  const push = (text: string, isBot: boolean) => {
    const msg = { id: ++idRef.current, text, isBot }
    setMessages((prev) => [...prev, msg])
  }

  useEffect(() => {
    const init = area ? `Hi, I need cleaning in ${area}` : 'Hi'
    const { turn, session: next } = handleUserInput(session, init)
    setSession(next)
    setTimeout(() => push(turn.text, true), 400)
    if (turn.tracking) setShowPayment(true)
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text: string) => {
    if (!text.trim()) return
    push(text, false)
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      const { turn, session: next } = handleUserInput(session, text)
      setSession(next)
      push(turn.text, true)
      if (turn.tracking) setShowPayment(true)
    }, 600 + Math.random() * 400)
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-[#ECE5DD]">
      <header className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-xl">🧹</div>
        <div>
          <p className="font-semibold text-sm">Snabbit Bot</p>
          <p className="text-xs opacity-70">{typing ? 'typing...' : 'online'}</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {messages.map((m) => (
          <MessageBubble key={m.id} text={m.text} isBot={m.isBot} />
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </main>

      {showPayment && session.total && (
        <div className="px-4 pb-2">
          <PaymentSheet amount={session.total} onConfirm={() => { setShowPayment(false); send('Paid') }} />
        </div>
      )}

      <footer className="bg-[#f0f0f0] border-t border-gray-200 px-3 py-2 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send(input)}
          placeholder="Type a message..."
          className="flex-1 bg-white rounded-full px-4 py-2 text-sm outline-none border border-gray-200 focus:border-[#25D366]"
        />
        <button
          onClick={() => send(input)}
          className="bg-[#25D366] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#1da851] transition-colors"
        >
          ▶
        </button>
      </footer>
    </div>
  )
}
