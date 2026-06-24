'use client'

import Link from 'next/link'
import { SafeImage } from './SafeImage'
import { MapPin, Clock, Star, Heart, Users } from 'lucide-react'
import { formatDate, formatPrice, formatDays } from '@/lib/utils'
import { useBookingStore } from '@/store/useBookingStore'

interface TripCardProps {
  trip: any
}

export function TripCard({ trip }: TripCardProps) {
  const mainImage = trip.images?.find((img: any) => img.isMain) || trip.images?.[0]
  const toggleFavorite = useBookingStore((s) => s.toggleFavorite)
  const isFavorite = useBookingStore((s) => s.favorites.includes(trip.id))
  const hasDiscount = trip.oldPrice && trip.oldPrice > trip.price

  return (
    <div className="card card-hover group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <SafeImage
          src={mainImage?.url || '/images/placeholder.jpg'}
          alt={mainImage?.altText || trip.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <button
          onClick={(e) => {
            e.preventDefault()
            toggleFavorite(trip.id)
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isFavorite ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-600 hover:bg-white'
          }`}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          <span className="badge bg-teal-600 text-white">{trip.category?.name}</span>
          {trip.isFeatured && <span className="badge bg-amber-500 text-white">Топ</span>}
          {hasDiscount && <span className="badge bg-rose-500 text-white">Скидка</span>}
        </div>
      </div>

      <Link href={`/trip/${trip.slug}`} className="block p-5">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <MapPin size={14} className="text-teal-600" />
          <span>{trip.country}{trip.city ? `, ${trip.city}` : ''}</span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
          {trip.title}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-4">{trip.shortDescription}</p>

        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock size={14} className="text-teal-600" />
            {formatDays(trip.durationDays)}
          </span>
          <span className="flex items-center gap-1">
            <Users size={14} className="text-teal-600" />
            до {trip.groupSize}
          </span>
          {trip.rating > 0 && (
            <span className="flex items-center gap-1">
              <Star size={14} className="text-amber-500" fill="currentColor" />
              {trip.rating.toFixed(1)}
            </span>
          )}
        </div>

        <div className="flex items-end justify-between pt-3 border-t border-slate-100">
          <div>
            {hasDiscount && (
              <span className="text-sm text-slate-400 line-through mr-2">{formatPrice(trip.oldPrice)}</span>
            )}
            <span className="text-xl font-bold text-teal-600">{formatPrice(trip.price)}</span>
          </div>
          <span className="text-sm text-slate-500">за человека</span>
        </div>
      </Link>
    </div>
  )
}
