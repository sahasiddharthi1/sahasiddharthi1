import type { Service } from './types'

export const services: Service[] = [
  { id: 'dishwashing', name: 'Dishwashing', pricePerHour: 150, icon: '🍽️' },
  { id: 'kitchen', name: 'Kitchen Deep Clean', pricePerHour: 180, icon: '🧹' },
  { id: 'fullhouse', name: 'Full House Cleaning', pricePerHour: 250, icon: '🏠' },
  { id: 'laundry', name: 'Laundry', pricePerHour: 160, icon: '👕' },
]

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id)
}
