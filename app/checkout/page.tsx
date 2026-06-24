'use client'

import Link from 'next/link'
import { SafeImage } from '@/components/SafeImage'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useBookingStore } from '@/store/useBookingStore'
import { formatPrice, formatDate } from '@/lib/utils'
import { Trash2, ShoppingCart, ArrowRight, User, Lock, Calendar, Users, CreditCard } from 'lucide-react'

interface UserData {
  id: string
  name: string
  email: string
  role: string
}

export default function CheckoutPage() {
  const { cart, removeFromCart, totalPrice, clearCart, addToCart } = useBookingStore()
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setUser(data)
        if (data) {
          setContactName(data.name || '')
          setContactEmail(data.email || '')
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-slate-500">Загрузка...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <Lock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Требуется вход</h1>
        <p className="text-slate-500 mb-6">Чтобы оформить бронирование, войдите в аккаунт или зарегистрируйтесь</p>
        <div className="flex justify-center gap-4">
          <Link href={`/login?redirect=${encodeURIComponent('/checkout')}`} className="btn-primary">
            Войти
          </Link>
          <Link href="/register" className="px-6 py-3 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
            Регистрация
          </Link>
        </div>
      </div>
    )
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

  const updateTravelers = (tripId: string, travelers: number) => {
    const item = cart.find((i) => i.tripId === tripId)
    if (!item) return
    if (travelers < 1) return
    addToCart({ ...item, travelers })
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, contactName, contactEmail, contactPhone, notes }),
      })

      if (res.ok) {
        const data = await res.json()
        clearCart()
        router.push(`/order-success?code=${data[0]?.bookingCode || ''}`)
      } else {
        const error = await res.json()
        alert(error.error || 'Ошибка оформления заказа')
      }
    } catch {
      alert('Ошибка соединения с сервером')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Оформление бронирования</h1>
      <p className="text-slate-500 mb-8">Проверьте данные и подтвердите заказ</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <User size={20} className="text-teal-600" />
              Контактные данные
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Имя</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Имя контактного лица"
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="input"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Телефон</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+7 (999) 000-00-00"
                  className="input"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Комментарий к заказу</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Особые пожелания, вопросы организатору..."
                  rows={3}
                  className="input resize-none"
                />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-teal-600" />
              Выбранные туры
            </h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.tripId} className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="relative w-full sm:w-28 h-28 rounded-lg overflow-hidden flex-shrink-0">
                    <SafeImage src={item.image || '/images/placeholder.jpg'} alt={item.tripTitle} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <Link href={`/trip/${item.tripSlug}`} className="font-bold text-slate-900 hover:text-teal-600 transition-colors">
                      {item.tripTitle}
                    </Link>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                      <Calendar size={14} /> {formatDate(item.startDate)}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-sm text-slate-600 flex items-center gap-1">
                        <Users size={14} /> Путешественников:
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateTravelers(item.tripId, item.travelers - 1)}
                          className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-teal-600 flex items-center justify-center text-slate-700"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">{item.travelers}</span>
                        <button
                          onClick={() => updateTravelers(item.tripId, item.travelers + 1)}
                          className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-teal-600 flex items-center justify-center text-slate-700"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2">
                    <span className="font-bold text-slate-900">{formatPrice(item.price * item.travelers)}</span>
                    <button
                      onClick={() => removeFromCart(item.tripId)}
                      className="text-rose-400 hover:text-rose-600 transition-colors"
                      title="Удалить"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-teal-600" />
              Итого
            </h2>
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.tripId} className="flex justify-between text-sm">
                  <span className="text-slate-600">{item.tripTitle}</span>
                  <span className="font-medium">{formatPrice(item.price * item.travelers)}</span>
                </div>
              ))}
              <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                <span className="text-slate-700">К оплате</span>
                <span className="text-2xl font-bold text-teal-600">{formatPrice(totalPrice())}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Оформление...' : 'Подтвердить бронирование'}
              {!submitting && <ArrowRight size={18} />}
            </button>

            <p className="text-xs text-slate-400 mt-4 text-center">
              Нажимая кнопку, вы соглашаетесь с условиями бронирования
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
