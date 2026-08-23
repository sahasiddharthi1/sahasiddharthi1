import { useState } from 'react'

export default function PaymentSheet({
  amount,
  onConfirm,
}: {
  amount: number
  onConfirm: () => void
}) {
  const [phase, setPhase] = useState<'idle' | 'processing' | 'success'>('idle')

  const handlePay = () => {
    setPhase('processing')
    setTimeout(() => {
      setPhase('success')
      setTimeout(onConfirm, 1200)
    }, 1800)
  }

  if (phase === 'success') {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-200 text-center">
        <div className="text-3xl mb-2">✅</div>
        <p className="text-green-700 font-semibold">Payment successful!</p>
        <p className="text-sm text-gray-500 mt-1">₹{amount} paid via Razorpay</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">Snabbit Cleaning</span>
        <span className="text-2xl font-bold text-gray-900">₹{amount}</span>
      </div>
      <div className="border-t border-gray-100 pt-4 mb-4">
        <p className="text-xs text-gray-400">Powered by Razorpay</p>
      </div>
      {phase === 'idle' ? (
        <button
          onClick={handlePay}
          className="w-full bg-[#25D366] hover:bg-[#1da851] text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Pay ₹{amount}
        </button>
      ) : (
        <div className="flex items-center justify-center gap-2 py-3">
          <div className="w-4 h-4 border-2 border-[#25D366] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-500">Processing...</span>
        </div>
      )}
    </div>
  )
}
