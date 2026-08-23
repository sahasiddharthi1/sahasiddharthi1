import type { BotTurn, Session } from './types'
import { resolveArea } from './areas'
import { getService } from './catalog'

export type { BotTurn }

export function createSession(area?: string): Session {
  return { step: 'greeting', area }
}

function parseService(text: string): string | undefined {
  const lower = text.toLowerCase()
  if (lower.includes('dish')) return 'dishwashing'
  if (lower.includes('kitchen')) return 'kitchen'
  if (lower.includes('full') || lower.includes('house')) return 'fullhouse'
  if (lower.includes('laundry') || lower.includes('wash')) return 'laundry'
  return undefined
}

function parseDuration(text: string): number | undefined {
  const match = text.match(/(\d+)\s*(?:hr|hour)/i)
  return match ? parseInt(match[1]) : undefined
}

function parseRating(text: string): number | undefined {
  const match = text.match(/(\d)/)
  return match ? parseInt(match[1]) : undefined
}

function isYes(text: string): boolean {
  return /^(yes|y|sure|ok|okay|confirm|book|go)$/i.test(text.trim())
}

function isNo(text: string): boolean {
  return /^(no|n|nah|cancel|stop|back)$/i.test(text.trim())
}

function isRestart(text: string): boolean {
  return /^(restart|start over|new booking|menu)$/i.test(text.trim())
}

function isHelp(text: string): boolean {
  return /^(help|options|what can)/i.test(text.trim())
}

export function handleUserInput(session: Session, text: string): { turn: BotTurn; session: Session } {
  if (isRestart(text)) {
    return { turn: { text: 'Fresh start! Which area do you need cleaning in?\n\n• Koramangala\n• HSR Layout\n• Bellandur\n• Indiranagar' }, session: { step: 'greeting' } }
  }

  if (isHelp(text)) {
    return { turn: { text: 'Here are the services:\n\n🍽️ Dishwashing — ₹150/hr\n🧹 Kitchen Deep Clean — ₹180/hr\n🏠 Full House — ₹250/hr\n👕 Laundry — ₹160/hr\n\nJust tell me what you need and your area!' }, session }
  }

  const area = resolveArea(text)
  const service = parseService(text)
  const duration = parseDuration(text)

  switch (session.step) {
    case 'greeting': {
      if (area) {
        if (service && duration) {
          const svc = getService(service)!
          const total = svc.pricePerHour * duration
          return { turn: { text: `Got it — ${svc.name} in ${area}, ${duration} hours.\n\nTotal: ₹${total} (${svc.pricePerHour}/hr × ${duration}h)\n\nShall I confirm?`, buttons: ['Confirm', 'Change service'] }, session: { step: 'confirm', area, service, duration, total } }
        }
        if (service) {
          return { turn: { text: `Great choice! How many hours of ${service}?`, buttons: ['1 hour', '2 hours', '3 hours', '4 hours'] }, session: { step: 'duration', area, service } }
        }
        return { turn: { text: `We're live in ${area}! What service do you need?\n\n🍽️ Dishwashing — ₹150/hr\n🧹 Kitchen Deep Clean — ₹180/hr\n🏠 Full House — ₹250/hr\n👕 Laundry — ₹160/hr`, buttons: ['Dishwashing', 'Kitchen', 'Full House', 'Laundry'] }, session: { step: 'service', area } }
      }
      return { turn: { text: 'Hi! 👋 Welcome to Snabbit.\n\nWhich area do you need cleaning in?\n\n• Koramangala\n• HSR Layout\n• Bellandur\n• Indiranagar', buttons: ['Koramangala', 'HSR Layout', 'Bellandur', 'Indiranagar'] }, session }
    }

    case 'service': {
      if (service) {
        return { turn: { text: `How many hours of ${service}?`, buttons: ['1 hour', '2 hours', '3 hours', '4 hours'] }, session: { ...session, step: 'duration', service } }
      }
      return { turn: { text: "Didn't catch that. Pick a service:" }, session }
    }

    case 'duration': {
      if (duration) {
        const svc = getService(session.service!)!
        const total = svc.pricePerHour * duration
        return { turn: { text: `${svc.name} — ${duration} hours.\n\nTotal: ₹${total}\n\nConfirm booking?`, buttons: ['Confirm', 'Change service'] }, session: { ...session, step: 'confirm', duration, total } }
      }
      return { turn: { text: "How many hours? e.g. 2 hours" }, session }
    }

    case 'confirm': {
      if (isYes(text) || isNo(text)) {
        if (isNo(text)) {
          return { turn: { text: 'No worries! What service do you need?' }, session: { ...session, step: 'service' } }
        }
        const id = `snb-${Date.now().toString(36)}`
        return { turn: { text: `Perfect! Here's your payment link:\n\nhttps://rzp.io/l/${id}\n\nPay ₹${session.total} to confirm. I'll track your expert after payment.`, tracking: true }, session: { ...session, step: 'tracking', paid: true } }
      }
      return { turn: { text: 'Confirm or change?' }, session }
    }

    case 'tracking': {
      if (isYes(text)) {
        return { turn: { text: 'Expert dispatched! ETA 12 min. Updates incoming...' }, session: { ...session, step: 'done' } }
      }
      return { turn: { text: 'Waiting for payment. Need anything else?' }, session }
    }

    case 'done': {
      if (isYes(text)) {
        return { turn: { text: 'Rate your experience (1-5 stars):', buttons: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐⭐'] }, session: { ...session, step: 'rating' } }
      }
      return { turn: { text: 'Thanks! Type "new booking" to start over.' }, session }
    }

    case 'rating': {
      const rating = parseRating(text)
      if (rating) {
        return { turn: { text: `Thanks for the ${rating}⭐ rating! Type "new booking" to book again.` }, session: { ...session, step: 'done', rating } }
      }
      return { turn: { text: 'Tap a star rating (1-5):' }, session }
    }

    default:
      return { turn: { text: 'Type "new booking" to start.' }, session: { step: 'greeting' } }
  }
}
