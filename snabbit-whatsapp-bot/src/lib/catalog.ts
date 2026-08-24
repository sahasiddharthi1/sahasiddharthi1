import type { Service } from './types'

export const services: Service[] = [
  { id: 'dishwashing', name: 'Dishwashing', pricePerHour: 150, icon: '🍽️' },
  { id: 'kitchen', name: 'Kitchen Deep Clean', pricePerHour: 180, icon: '🧹' },
  { id: 'fullhouse', name: 'Full House Cleaning', pricePerHour: 250, icon: '🏠' },
  { id: 'laundry', name: 'Laundry & Ironing', pricePerHour: 160, icon: '👕' },
  { id: 'bathroom', name: 'Bathroom Deep Clean', pricePerHour: 200, icon: '🚿' },
  { id: 'sofa', name: 'Sofa & Carpet Cleaning', pricePerHour: 300, icon: '🛋️' },
  { id: 'ac', name: 'AC Servicing', pricePerHour: 350, icon: '❄️' },
  { id: 'pest', name: 'Pest Control', pricePerHour: 500, icon: '🐛' },
  { id: 'painting', name: 'Home Painting', pricePerHour: 400, icon: '🎨' },
  { id: 'plumbing', name: 'Plumbing Repair', pricePerHour: 450, icon: '🔧' },
  { id: 'electrical', name: 'Electrical Work', pricePerHour: 400, icon: '⚡' },
  { id: 'deepclean', name: 'Deep Clean Package', pricePerHour: 600, icon: '✨' },
]

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id)
}