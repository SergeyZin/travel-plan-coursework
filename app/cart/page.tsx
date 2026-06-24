'use client'

import Link from 'next/link'
import { SafeImage } from '@/components/SafeImage'
import { useBookingStore } from '@/store/useBookingStore'
import { formatPrice, formatDate } from '@/lib/utils'
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { cart, removeFromCart, totalPrice, clearCart } = useBookingStore()
  const router = useRouter()

  const handleCheckout = () => {
    router.push('/checkout')
  }

  if (!cart.length) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Корзина пуста</h1>
        <p className="text-slate-500 mb-6">Добавьте туры, которые хотите забронировать</p>
        <Link href="/catalog" className="btn-primary">Найти тур</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Корзина</h1>
      <div className="space-y-4 mb-8">
        {cart.map((item) => (
          <div key={item.tripId} className="card p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative w-full md:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
              <SafeImage src={item.image || '/images/placeholder.jpg'} alt={item.tripTitle} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <Link href={`/trip/${item.tripSlug}`} className="font-bold text-slate-900 hover:text-teal-600 transition-colors">
                {item.tripTitle}
              </Link>
              <p className="text-sm text-slate-500 mt-1">Дата: {formatDate(item.startDate)}</p>
              <p className="text-sm text-slate-500">Путешественников: {item.travelers}</p>
              <p className="font-bold text-teal-600 mt-1">{formatPrice(item.price)} × {item.travelers}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-900">{formatPrice(item.price * item.travelers)}</span>
              <button onClick={() => removeFromCart(item.tripId)} className="text-rose-400 hover:text-rose-600 transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-slate-500">Итого к оплате</p>
          <p className="text-3xl font-bold text-teal-600">{formatPrice(totalPrice())}</p>
        </div>
        <button onClick={handleCheckout} className="btn-primary w-full md:w-auto">
          Оформить бронирование <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}
