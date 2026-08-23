import { useParams } from 'react-router-dom'
import { getArea } from '../lib/areas'
import { services } from '../lib/catalog'
import BookButton from './BookButton'

export default function AreaPage() {
  const { slug } = useParams<{ slug: string }>()
  const area = slug ? getArea(slug) : undefined

  if (!area) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-600">Area not found</p>
          <a href="#/" className="text-[#25D366] mt-2 inline-block hover:underline">← Back to home</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#075E54] text-white px-6 py-6">
        <a href="#/" className="text-xs opacity-70 hover:opacity-100">← Home</a>
        <h1 className="text-2xl font-bold mt-2">{area.name}</h1>
        <p className="text-sm opacity-80">{area.experts.length} experts available</p>
      </header>

      <section className="px-6 py-6">
        <h2 className="text-lg font-bold mb-4">Available experts</h2>
        <div className="space-y-3">
          {area.experts.map((e) => (
            <div key={e.name} className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                {e.photo}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{e.name}</p>
                <p className="text-sm text-gray-500">{e.bookings} bookings · {e.rating}⭐</p>
              </div>
              <div className="text-right">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <p className="text-xs text-green-600 mt-1">Available</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-6">
        <h2 className="text-lg font-bold mb-4">Services in {area.name}</h2>
        <div className="grid grid-cols-2 gap-3">
          {services.map((s) => (
            <div key={s.id} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="text-sm font-semibold">{s.name}</p>
              <p className="text-xs text-gray-400">₹{s.pricePerHour}/hr</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-8 text-center">
        <p className="text-gray-500 mb-4">Ready to book?</p>
        <BookButton area={area.name} />
      </section>
    </div>
  )
}
