'use client'

import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { TripGrid } from '@/components/TripGrid'
import { useBookingStore } from '@/store/useBookingStore'
import Link from 'next/link'

export default function FavoritesPage() {
  const favorites = useBookingStore((s) => s.favorites)
  const [trips, setTrips] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (favorites.length === 0) {
      setTrips([])
      setLoading(false)
      return
    }
    fetch('/api/trips/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: favorites }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTrips(data)
        setLoading(false)
      })
  }, [favorites])

  if (!loading && trips.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Избранное пусто</h1>
        <p className="text-slate-500 mb-6">Сохраняйте понравившиеся туры, нажимая на сердечко</p>
        <Link href="/catalog" className="btn-primary">Найти тур</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
        <Heart className="text-rose-500" fill="currentColor" />
        Избранное
      </h1>
      <p className="text-slate-500 mb-8">Туры, которые вы сохранили</p>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card h-80 animate-pulse bg-slate-100" />
          ))}
        </div>
      ) : (
        <TripGrid trips={trips} />
      )}
    </div>
  )
}
