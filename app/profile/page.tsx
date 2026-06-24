'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { User, Ticket, PlusCircle, LogOut, Settings, Calendar } from 'lucide-react'
import { formatPrice, formatDate, formatTravelers } from '@/lib/utils'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [trips, setTrips] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const meRes = await fetch('/api/auth/me')
      if (!meRes.ok) {
        window.location.href = '/login'
        return
      }
      const userData = await meRes.json()
      setUser(userData)

      const bookingsRes = await fetch('/api/bookings')
      const bookingsData = await bookingsRes.json()
      setBookings(bookingsData)

      if (userData.role === 'ORGANIZER' || userData.role === 'ADMIN') {
        const tripsRes = await fetch('/api/organizer/trips')
        if (tripsRes.ok) {
          setTrips(await tripsRes.json())
        }
      }

      setLoading(false)
    }
    fetchData()
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/'
  }

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-12 text-center text-slate-400">Загрузка...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center">
            <User className="w-8 h-8 text-teal-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
            <p className="text-slate-500">{user.email} • {user.role === 'ORGANIZER' ? 'Организатор' : user.role === 'ADMIN' ? 'Администратор' : 'Путешественник'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {(user.role === 'ORGANIZER' || user.role === 'ADMIN') && (
            <Link href="/create-trip" className="btn-outline">
              <PlusCircle size={18} /> Создать тур
            </Link>
          )}
          {user.role === 'ADMIN' && (
            <Link href="/admin" className="btn-outline">
              <Settings size={18} /> Админка
            </Link>
          )}
          <button onClick={handleLogout} className="btn-outline text-rose-600 border-rose-200 hover:border-rose-400 hover:bg-rose-50">
            <LogOut size={18} /> Выйти
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Ticket size={22} className="text-teal-600" /> Мои бронирования
          </h2>
          {bookings.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-slate-500 mb-4">У вас пока нет бронирований</p>
              <Link href="/catalog" className="btn-primary">Найти тур</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking: any) => (
                <div key={booking.id} className="card p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900">{booking.trip?.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(booking.startDate)}</span>
                        <span>{formatTravelers(booking.travelers)}</span>
                      </div>
                      <span className="inline-block mt-2 badge bg-teal-50 text-teal-700">
                        {booking.status === 'CONFIRMED' ? 'Подтверждено' : booking.status === 'PENDING' ? 'В обработке' : 'Отменено'}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-teal-600">{formatPrice(booking.totalAmount)}</p>
                      <p className="text-xs text-slate-400 mt-1">{booking.bookingCode}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {(user.role === 'ORGANIZER' || user.role === 'ADMIN') && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <PlusCircle size={22} className="text-teal-600" /> Мои туры
            </h2>
            <div className="space-y-3">
              {trips.map((trip: any) => (
                <Link key={trip.id} href={`/trip/${trip.slug}`} className="card p-4 block hover:border-teal-300 transition-colors">
                  <h3 className="font-bold text-slate-900">{trip.title}</h3>
                  <p className="text-sm text-slate-500">{trip.country} • {trip.status}</p>
                </Link>
              ))}
              {trips.length === 0 && (
                <p className="text-slate-400 text-sm">Пока нет созданных туров</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
