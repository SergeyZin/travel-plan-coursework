'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { slugify } from '@/lib/slugify'
import { PlusCircle } from 'lucide-react'

export default function CreateTripPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const [form, setForm] = useState({
    title: '',
    shortDescription: '',
    description: '',
    categoryId: '',
    country: '',
    city: '',
    durationDays: 7,
    price: 50000,
    oldPrice: 0,
    groupSize: 10,
    difficulty: 'easy',
    includes: '',
    excludes: '',
    startDate: '',
  })

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then(setCategories)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const payload = {
      ...form,
      slug: slugify(form.title),
      oldPrice: form.oldPrice > 0 ? form.oldPrice : null,
    }

    const res = await fetch('/api/trips/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || 'Ошибка создания')
      return
    }

    router.push(`/trip/${data.slug}`)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
        <PlusCircle className="text-teal-600" />
        Создать тур
      </h1>
      <p className="text-slate-500 mb-6">Заполните информацию о новом туристическом маршруте</p>

      {error && <p className="text-rose-500 mb-4 bg-rose-50 p-3 rounded-lg">{error}</p>}

      <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Название тура</label>
          <input type="text" name="title" required value={form.title} onChange={handleChange} className="input" placeholder="Например: Недельный тур в Турцию" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Краткое описание</label>
          <input type="text" name="shortDescription" required value={form.shortDescription} onChange={handleChange} className="input" placeholder="Одно-два предложения о туре" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Полное описание</label>
          <textarea name="description" required rows={5} value={form.description} onChange={handleChange} className="input" placeholder="Подробное описание тура, маршрута, впечатлений..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Тип тура</label>
            <select name="categoryId" required value={form.categoryId} onChange={handleChange} className="input">
              <option value="">Выберите</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Сложность</label>
            <select name="difficulty" value={form.difficulty} onChange={handleChange} className="input">
              <option value="easy">Лёгкая</option>
              <option value="medium">Средняя</option>
              <option value="hard">Сложная</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Страна</label>
            <input type="text" name="country" required value={form.country} onChange={handleChange} className="input" placeholder="Турция" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Город</label>
            <input type="text" name="city" value={form.city} onChange={handleChange} className="input" placeholder="Анталья" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Длительность (дней)</label>
            <input type="number" name="durationDays" min={1} value={form.durationDays} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Размер группы</label>
            <input type="number" name="groupSize" min={1} value={form.groupSize} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Дата начала</label>
            <input type="date" name="startDate" required value={form.startDate} onChange={handleChange} className="input" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Цена (₽)</label>
            <input type="number" name="price" min={0} value={form.price} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Старая цена (₽, необязательно)</label>
            <input type="number" name="oldPrice" min={0} value={form.oldPrice} onChange={handleChange} className="input" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Включено в стоимость (каждый пункт с новой строки)</label>
          <textarea name="includes" rows={4} value={form.includes} onChange={handleChange} className="input" placeholder="Проживание в отеле 4*&#10;Завтраки&#10;Трансфер из аэропорта" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Не включено (каждый пункт с новой строки)</label>
          <textarea name="excludes" rows={4} value={form.excludes} onChange={handleChange} className="input" placeholder="Авиабилеты&#10;Виза&#10;Личные расходы" />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Создание...' : 'Создать тур'}
        </button>
      </form>
    </div>
  )
}
