const phone = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined

export function getWhatsAppLink(text?: string): string | null {
  if (!phone) return null
  const encoded = text ? `?text=${encodeURIComponent(text)}` : ''
  return `https://wa.me/${phone}${encoded}`
}
