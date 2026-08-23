import type { Session } from '../src/lib/types'

export interface TrackingStep {
  label: string
  delay: number
}

export function getTrackingPlan(session: Session): TrackingStep[] {
  const name = session.expert?.name ?? 'the expert'
  return [
    { label: `🎉 Booking accepted for ${session.area}`, delay: 500 },
    { label: `🧹 ${name} is preparing`, delay: 2000 },
    { label: `🚶 ${name} is on the way`, delay: 4000 },
    { label: `📍 ${name} is 5 min away`, delay: 6000 },
    { label: `✅ ${name} has arrived`, delay: 7000 },
  ]
}
