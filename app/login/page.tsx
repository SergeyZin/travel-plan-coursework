'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Plane } from 'lucide-react'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/profile'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || 'Ошибка входа')
      return
    }

    router.push(redirect)
    router.refresh()
  }

  return (
    <div className="card w-full max-w-md p-8">
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Plane className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">С возвращением!</h1>
        <p className="text-slate-500 text-sm mt-1">Войдите в свой аккаунт TravelPlan</p>
      </div>
      {error && <p className="text-rose-500 text-sm mb-4 text-center bg-rose-50 py-2 rounded-lg">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Пароль</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="••••••••" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Нет аккаунта? <Link href="/register" className="text-teal-600 font-semibold hover:underline">Зарегистрироваться</Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 bg-slate-50">
      <Suspense fallback={
        <div className="card w-full max-w-md p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-slate-500">Загрузка...</p>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  )
}
