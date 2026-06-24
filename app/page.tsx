import Link from 'next/link'
import Image from 'next/image'
import { Plane, Search, MapPin, Star, Users, Compass, Globe2, Calendar, Snowflake, Flower2, Sun, Leaf } from 'lucide-react'
import { TripGrid } from '@/components/TripGrid'
import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'

export default async function HomePage() {
  const categories = await prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } })
  const featuredTrips = await prisma.trip.findMany({
    where: { status: 'PUBLISHED', isFeatured: true },
    include: {
      category: true,
      images: { orderBy: { sortOrder: 'asc' } },
    },
    orderBy: { rating: 'desc' },
    take: 6,
  })

  const stats = [
    { icon: Globe2, label: 'Стран', value: '50+' },
    { icon: Compass, label: 'Туров', value: '200+' },
    { icon: Users, label: 'Путешественников', value: '15K+' },
    { icon: Star, label: 'Средний рейтинг', value: '4.9' },
  ]

  return (
    <>
      <section className="relative bg-hero-gradient text-white overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80"
            alt="Travel"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Plane size={16} />
              <span className="text-sm font-medium">Путешествия мечты начинаются здесь</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Открывайте мир<br />вместе с TravelPlan
            </h1>
            <p className="text-lg md:text-xl text-teal-50 mb-8">
              Эксклюзивные туры в самые красивые места планеты. Проверенные маршруты, опытные гиды и забота о каждой детали.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/catalog" className="btn-accent">
                <Search size={18} />
                Найти тур
              </Link>
              <Link href="/create-trip" className="btn-outline bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white">
                <Plane size={18} />
                Создать тур
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-10 h-10 text-teal-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-4">Типы путешествий</h2>
          <p className="text-slate-500 text-center mb-10 max-w-2xl mx-auto">
            Выберите формат отдыха, который подходит именно вам
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalog?category=${cat.slug}`}
                className="group p-6 rounded-2xl bg-white border border-slate-100 hover:border-teal-300 hover:shadow-lg transition-all text-center"
              >
                <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-100 transition-colors">
                  <Compass className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-teal-600 mb-1">{cat.name}</h3>
                <p className="text-sm text-slate-500">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-4">Путешествия по сезонам</h2>
          <p className="text-slate-500 text-center mb-10 max-w-2xl mx-auto">
            Выбирайте тур в зависимости от времени года
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Зимние туры', slug: 'winter', icon: Snowflake, color: 'bg-sky-50 text-sky-600 group-hover:bg-sky-100' },
              { name: 'Весенние туры', slug: 'spring', icon: Flower2, color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100' },
              { name: 'Летние туры', slug: 'summer', icon: Sun, color: 'bg-amber-50 text-amber-600 group-hover:bg-amber-100' },
              { name: 'Осенние туры', slug: 'autumn', icon: Leaf, color: 'bg-orange-50 text-orange-600 group-hover:bg-orange-100' },
            ].map((season) => (
              <Link
                key={season.slug}
                href={`/catalog?season=${season.slug}`}
                className="group p-6 rounded-2xl bg-white border border-slate-100 hover:border-teal-300 hover:shadow-lg transition-all text-center"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors ${season.color}`}>
                  <season.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-teal-600">{season.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Популярные туры</h2>
              <p className="text-slate-500 mt-1">Самые востребованные направления</p>
            </div>
            <Link href="/catalog" className="text-teal-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              Все туры →
            </Link>
          </div>
          <TripGrid trips={featuredTrips} />
        </div>
      </section>

      <section className="py-16 bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Готовы к новому приключению?</h2>
          <p className="text-teal-50 mb-8 text-lg">
            Присоединяйтесь к тысячам путешественников, которые уже нашли свой идеальный тур
          </p>
          <Link href="/catalog" className="btn-accent bg-white text-teal-700 hover:bg-slate-100">
            Начать путешествие
          </Link>
        </div>
      </section>
    </>
  )
}
