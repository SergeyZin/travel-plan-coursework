'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { TripGrid } from '@/components/TripGrid'
import { TripFilters } from '@/components/TripFilters'
import { Compass } from 'lucide-react'

interface Filters {
  search: string
  category: string
  country: string
  season: string
  duration: string
  difficulty: string
  priceMax: string
  sort: string
}

export default function CatalogContent() {
  const searchParams = useSearchParams()
  const [trips, setTrips] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [countries, setCountries] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const initialCategory = searchParams.get('category') || ''
  const initialSeason = searchParams.get('season') || ''

  const fetchTrips = async (filters: Filters) => {
    setLoading(true)
    const params = new URLSearchParams()
    if (filters.search) params.set('search', filters.search)
    if (filters.category) params.set('category', filters.category)
    if (filters.country) params.set('country', filters.country)
    if (filters.season) params.set('season', filters.season)
    if (filters.duration) params.set('duration', filters.duration)
    if (filters.difficulty) params.set('difficulty', filters.difficulty)
    if (filters.priceMax) params.set('priceMax', filters.priceMax)
    if (filters.sort) params.set('sort', filters.sort)

    const res = await fetch(`/api/trips?${params.toString()}`)
    const data = await res.json()
    setTrips(data)
    setLoading(false)
  }

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then(setCategories)
    fetch('/api/trips/countries')
      .then((res) => res.json())
      .then(setCountries)
    fetchTrips({
      search: '',
      category: initialCategory,
      country: '',
      season: initialSeason,
      duration: '',
      difficulty: '',
      priceMax: '',
      sort: 'rating',
    })
  }, [initialCategory, initialSeason])

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          <Compass className="text-teal-600" />
          Каталог туров
        </h1>
        <p className="text-slate-500">Найдите путешествие своей мечты</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <TripFilters
            categories={categories}
            countries={countries}
            initial={{
              search: '',
              category: initialCategory,
              country: '',
              season: initialSeason,
              duration: '',
              difficulty: '',
              priceMax: '',
              sort: 'rating',
            }}
            onChange={fetchTrips}
          />
        </div>
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card h-80 animate-pulse bg-slate-100" />
              ))}
            </div>
          ) : (
            <TripGrid trips={trips} />
          )}
        </div>
      </div>
    </>
  )
}
