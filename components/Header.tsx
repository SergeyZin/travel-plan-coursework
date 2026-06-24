'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Plane, User, LogOut, Menu, X, ShoppingCart, Heart, PlusCircle } from 'lucide-react'
import { useBookingStore } from '@/store/useBookingStore'

interface UserData {
  name: string
  role: string
}

export function Header() {
  const [user, setUser] = useState<UserData | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const cartCount = useBookingStore((s) => s.totalItems())
  const favCount = useBookingStore((s) => s.favorites.length)

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null))
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    window.location.href = '/'
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">TravelPlan</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">
              Главная
            </Link>
            <Link href="/catalog" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">
              Туры
            </Link>
            {(user?.role === 'ORGANIZER' || user?.role === 'ADMIN') && (
              <Link href="/create-trip" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">
                Создать тур
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/favorites" className="relative text-slate-600 hover:text-rose-500 transition-colors">
              <Heart size={22} />
              {favCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                  {favCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative text-slate-600 hover:text-teal-600 transition-colors">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="flex items-center gap-2 text-slate-600 hover:text-teal-600 font-medium">
                  <User size={18} />
                  {user.name}
                </Link>
                <button onClick={handleLogout} className="text-slate-400 hover:text-rose-500 transition-colors">
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-slate-600 hover:text-teal-600 font-medium">
                  Войти
                </Link>
                <Link href="/register" className="btn-primary text-sm py-2">
                  Регистрация
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3">
          <Link href="/" className="block text-slate-600 font-medium" onClick={() => setMobileOpen(false)}>Главная</Link>
          <Link href="/catalog" className="block text-slate-600 font-medium" onClick={() => setMobileOpen(false)}>Туры</Link>
          <Link href="/favorites" className="block text-slate-600 font-medium" onClick={() => setMobileOpen(false)}>Избранное</Link>
          <Link href="/cart" className="block text-slate-600 font-medium" onClick={() => setMobileOpen(false)}>Корзина</Link>
          {(user?.role === 'ORGANIZER' || user?.role === 'ADMIN') && <Link href="/create-trip" className="block text-slate-600 font-medium" onClick={() => setMobileOpen(false)}>Создать тур</Link>}
          {user ? (
            <Link href="/profile" className="block text-slate-600 font-medium" onClick={() => setMobileOpen(false)}>Профиль</Link>
          ) : (
            <>
              <Link href="/login" className="block text-slate-600 font-medium" onClick={() => setMobileOpen(false)}>Войти</Link>
              <Link href="/register" className="block text-slate-600 font-medium" onClick={() => setMobileOpen(false)}>Регистрация</Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
