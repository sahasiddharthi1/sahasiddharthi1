import { getWhatsAppLink } from '../lib/wa'

export default function BookButton({ area, children = 'Book on WhatsApp' }: { area?: string; children?: string }) {
  const areaText = area ? `Hi, I need cleaning in ${area}` : 'Hi, I need cleaning'
  const href = getWhatsAppLink(areaText)
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold px-6 py-3 rounded-full transition-colors"
    >
      {children}
    </a>
  )
}
