'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [trips, setTrips] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/organizer/trips').then((r) => r.json()).then(setTrips)
    fetch('/api/admin/users').then((r) => r.json()).then(setUsers)
  }, [])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/trips/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setTrips(trips.map((t) => (t.id === id ? { ...t, status } : t)))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Админ-панель</h1>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Туры</h2>
        <div className="card overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Название</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Страна</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Цена</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Статус</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trips.map((trip) => (
                <tr key={trip.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    <Link href={`/trip/${trip.slug}`} className="hover:text-teal-600">{trip.title}</Link>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{trip.country}</td>
                  <td className="px-4 py-3 text-slate-700">{trip.price.toLocaleString('ru-RU')} ₽</td>
                  <td className="px-4 py-3"><span className="badge bg-slate-100 text-slate-700">{trip.status}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {trip.status !== 'PUBLISHED' && (
                        <button onClick={() => updateStatus(trip.id, 'PUBLISHED')} className="text-sm text-green-600 hover:underline">Опубликовать</button>
                      )}
                      {trip.status !== 'CANCELLED' && (
                        <button onClick={() => updateStatus(trip.id, 'CANCELLED')} className="text-sm text-rose-600 hover:underline">Скрыть</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Пользователи</h2>
        <div className="card overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Имя</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Email</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Роль</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">{user.name}</td>
                  <td className="px-4 py-3 text-slate-500">{user.email}</td>
                  <td className="px-4 py-3"><span className="badge bg-teal-50 text-teal-700">{user.role}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
