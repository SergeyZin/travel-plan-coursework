import Link from 'next/link'
import { Plane, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TravelPlan</span>
            </Link>
            <p className="text-slate-400 text-sm">
              Планируйте путешествия мечты с TravelPlan. Эксклюзивные туры, проверенные маршруты и незабываемые впечатления.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">О нас</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              TravelPlan — современная платформа для поиска и бронирования туров. Мы собираем лучшие предложения от организаторов по всему миру: пляжный отдых, экскурсии, горнолыжные курорты, семейные и романтические путешествия. Выбирайте направление, сезон и тип отдыха — а мы позаботимся обо всём остальном.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-teal-400 transition-colors">Главная</Link></li>
              <li><Link href="/catalog" className="hover:text-teal-400 transition-colors">Все туры</Link></li>
              <li><Link href="/favorites" className="hover:text-teal-400 transition-colors">Избранное</Link></li>
              <li><Link href="/create-trip" className="hover:text-teal-400 transition-colors">Создать тур</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Mail size={16} /> info@travelplan.ru</li>
              <li className="flex items-center gap-2"><Phone size={16} /> +7 (800) 555-35-35</li>
              <li className="flex items-center gap-2"><MapPin size={16} /> Москва, Россия</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
          © 2026 TravelPlan. Путешествия мечты начинаются здесь.
        </div>
      </div>
    </footer>
  )
}
