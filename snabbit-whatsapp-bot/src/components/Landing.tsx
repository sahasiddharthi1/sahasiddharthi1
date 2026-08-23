import { services } from '../lib/catalog'
import { getAreas } from '../lib/areas'
import BookButton from './BookButton'

const howItWorks = [
  { step: '1', title: 'Open WhatsApp', desc: 'Tap the button — no app download needed' },
  { step: '2', title: 'Pick service & area', desc: 'Tell the bot what you need and where' },
  { step: '3', title: 'Pay online', desc: 'Razorpay payment link — UPI / cards / netbanking' },
  { step: '4', title: 'Track your expert', desc: 'Live updates until they arrive at your door' },
]

const compareRows = [
  { feature: 'App download required', snabbit: false, urban: true },
  { feature: 'Book in <30 seconds', snabbit: true, urban: false },
  { feature: 'Transparent pricing', snabbit: true, urban: true },
  { feature: 'Live tracking', snabbit: true, urban: true },
  { feature: 'Pay on WhatsApp', snabbit: true, urban: false },
]

export default function Landing() {
  const areas = getAreas()

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-[#075E54] to-[#128C7E] text-white px-6 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Book home cleaning on WhatsApp</h1>
        <p className="text-lg opacity-90 mb-8 max-w-md mx-auto">
          No app download. No registration. Just open WhatsApp and book.
        </p>
        <BookButton />
      </section>

      <section className="px-6 py-12 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Services</h2>
        <div className="grid grid-cols-2 gap-4">
          {services.map((s) => (
            <div key={s.id} className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-100">
              <div className="text-3xl mb-2">{s.icon}</div>
              <p className="font-semibold">{s.name}</p>
              <p className="text-sm text-gray-500 mt-1">₹{s.pricePerHour}/hr</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">How it works</h2>
        <div className="max-w-lg mx-auto space-y-6">
          {howItWorks.map((h) => (
            <div key={h.step} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold shrink-0">
                {h.step}
              </div>
              <div>
                <p className="font-semibold">{h.title}</p>
                <p className="text-sm text-gray-500">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-12 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Why WhatsApp beats the app</h2>
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-50 text-sm font-semibold border-b border-gray-200">
            <div className="p-3" />
            <div className="p-3 text-center text-[#25D366]">Snabbit</div>
            <div className="p-3 text-center text-gray-400">App-based</div>
          </div>
          {compareRows.map((r) => (
            <div key={r.feature} className="grid grid-cols-3 text-sm border-b border-gray-100 last:border-0">
              <div className="p-3 text-gray-600">{r.feature}</div>
              <div className="p-3 text-center">{r.snabbit ? '✅' : '❌'}</div>
              <div className="p-3 text-center text-gray-400">{r.urban ? '✅' : '❌'}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Areas we serve</h2>
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
          {areas.map((a) => (
            <a
              key={a.slug}
              href={`#/area/${a.slug}`}
              className="bg-white rounded-2xl p-4 text-center border border-gray-100 hover:border-[#25D366] transition-colors"
            >
              <p className="font-semibold">{a.name}</p>
              <p className="text-xs text-gray-400 mt-1">{a.experts.length} experts</p>
            </a>
          ))}
        </div>
      </section>

      <section className="px-6 py-12 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">FAQ</h2>
        <div className="space-y-4">
          {[
            { q: 'Do I need to download an app?', a: 'No. Everything happens on WhatsApp — just scan the QR and chat.' },
            { q: 'How do I pay?', a: 'The bot sends a Razorpay link. Pay with UPI, card, or netbanking.' },
            { q: 'Can I track my expert?', a: 'Yes! Get live updates from dispatch to arrival.' },
            { q: 'What areas do you serve?', a: 'Koramangala, HSR Layout, Bellandur, and Indiranagar.' },
          ].map((f) => (
            <details key={f.q} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <summary className="font-semibold cursor-pointer">{f.q}</summary>
              <p className="text-sm text-gray-500 mt-2">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-[#075E54] text-white px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to try it?</h2>
        <p className="opacity-80 mb-6">Scan the QR and book in under 30 seconds.</p>
        <BookButton />
      </section>
    </div>
  )
}
