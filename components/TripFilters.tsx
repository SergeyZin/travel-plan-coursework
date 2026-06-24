'use client'

import { Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

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

interface TripFiltersProps {
  categories: any[]
  countries: string[]
  initial?: Filters
  onChange: (filters: Filters) => void
}

export function TripFilters({ categories, countries, initial, onChange }: TripFiltersProps) {
  const [filters, setFilters] = useState<Filters>({
    search: initial?.search || '',
    category: initial?.category || '',
    country: initial?.country || '',
    season: initial?.season || '',
    duration: initial?.duration || '',
    difficulty: initial?.difficulty || '',
    priceMax: initial?.priceMax || '',
    sort: initial?.sort || 'rating',
  })

  const update = (key: keyof Filters, value: string) => {
    const next = { ...filters, [key]: value }
    setFilters(next)
    onChange(next)
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
      <div className="flex items-center gap-2 text-slate-900 font-semibold mb-2">
        <SlidersHorizontal size={18} className="text-teal-600" />
        <h3>Фильтры</h3>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Поиск туров..."
          value={filters.search}
          onChange={(e) => update('search', e.target.value)}
          className="input pl-10"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Тип тура</label>
        <select value={filters.category} onChange={(e) => update('category', e.target.value)} className="input">
          <option value="">Все типы</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Страна</label>
        <select value={filters.country} onChange={(e) => update('country', e.target.value)} className="input">
          <option value="">Все страны</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Сезон</label>
        <select value={filters.season} onChange={(e) => update('season', e.target.value)} className="input">
          <option value="">Любой сезон</option>
          <option value="winter">Зима</option>
          <option value="spring">Весна</option>
          <option value="summer">Лето</option>
          <option value="autumn">Осень</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Длительность</label>
        <select value={filters.duration} onChange={(e) => update('duration', e.target.value)} className="input">
          <option value="">Любая</option>
          <option value="1-3">1–3 дня</option>
          <option value="4-7">4–7 дней</option>
          <option value="8-14">1–2 недели</option>
          <option value="15+">Больше 2 недель</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Сложность</label>
        <select value={filters.difficulty} onChange={(e) => update('difficulty', e.target.value)} className="input">
          <option value="">Любая</option>
          <option value="easy">Лёгкая</option>
          <option value="medium">Средняя</option>
          <option value="hard">Сложная</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Макс. цена</label>
        <select value={filters.priceMax} onChange={(e) => update('priceMax', e.target.value)} className="input">
          <option value="">Любая</option>
          <option value="30000">до 30 000 ₽</option>
          <option value="60000">до 60 000 ₽</option>
          <option value="100000">до 100 000 ₽</option>
          <option value="200000">до 200 000 ₽</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Сортировка</label>
        <select value={filters.sort} onChange={(e) => update('sort', e.target.value)} className="input">
          <option value="rating">По рейтингу</option>
          <option value="price-asc">Сначала дешевле</option>
          <option value="price-desc">Сначала дороже</option>
          <option value="duration">По длительности</option>
          <option value="popular">По популярности</option>
        </select>
      </div>
    </div>
  )
}
