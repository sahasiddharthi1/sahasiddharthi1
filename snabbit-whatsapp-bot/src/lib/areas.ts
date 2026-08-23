import type { Area, Expert } from './types'

const experts: Record<string, Expert[]> = {
  koramangala: [
    { name: 'Priya S.', rating: 4.8, bookings: 312, photo: '👩' },
    { name: 'Anjali M.', rating: 4.7, bookings: 287, photo: '👩' },
    { name: 'Ravi K.', rating: 4.6, bookings: 198, photo: '👨' },
  ],
  'hsr-layout': [
    { name: 'Deepa R.', rating: 4.9, bookings: 445, photo: '👩' },
    { name: 'Suresh P.', rating: 4.5, bookings: 156, photo: '👨' },
  ],
  bellandur: [
    { name: 'Meena L.', rating: 4.7, bookings: 278, photo: '👩' },
    { name: 'Kiran D.', rating: 4.6, bookings: 203, photo: '👨' },
  ],
  indiranagar: [
    { name: 'Aisha N.', rating: 4.8, bookings: 356, photo: '👩' },
    { name: 'Vikram T.', rating: 4.5, bookings: 167, photo: '👨' },
  ],
}

const areaNames: Record<string, string> = {
  koramangala: 'Koramangala',
  'hsr-layout': 'HSR Layout',
  bellandur: 'Bellandur',
  indiranagar: 'Indiranagar',
}

export function resolveArea(text: string): string | undefined {
  const lower = text.toLowerCase()
  if (lower.includes('koramangala')) return 'koramangala'
  if (lower.includes('hsr')) return 'hsr-layout'
  if (lower.includes('bellandur')) return 'bellandur'
  if (lower.includes('indiranagar')) return 'indiranagar'
  return undefined
}

export function getArea(slug: string): Area | undefined {
  const e = experts[slug]
  if (!e) return undefined
  return {
    slug,
    name: areaNames[slug],
    experts: e,
    availableServices: ['dishwashing', 'kitchen', 'fullhouse', 'laundry'],
  }
}

export function getAreas(): Area[] {
  return Object.keys(experts).map((slug) => getArea(slug)!)
}

export function randomExpert(slug: string): Expert | undefined {
  const e = experts[slug]
  return e ? e[Math.floor(Math.random() * e.length)] : undefined
}

export function getEta(): string {
  return `${10 + Math.floor(Math.random() * 15)} min`
}

export function getArrivalSlot(): string {
  const now = new Date()
  now.setMinutes(now.getMinutes() + 15 + Math.floor(Math.random() * 15))
  return now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}
