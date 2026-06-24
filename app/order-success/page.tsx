'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, FileText, ArrowRight } from 'lucide-react'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  return (
    <div className="card w-full max-w-lg p-8 text-center">
      <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-teal-600" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Бронирование подтверждено!</h1>
      <p className="text-slate-500 mb-6">
        Спасибо за заказ. Все детали отправлены на ваш email.
      </p>

      {code && (
        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-slate-500 mb-1">Номер бронирования</p>
          <p className="text-2xl font-bold text-slate-900 tracking-wider">{code}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/profile" className="btn-primary justify-center">
          <FileText size={18} />
          Мои бронирования
        </Link>
        <Link href="/catalog" className="px-6 py-3 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
          К каталогу
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 bg-slate-50">
      <Suspense fallback={
        <div className="card w-full max-w-lg p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-slate-500">Загрузка...</p>
        </div>
      }>
        <OrderSuccessContent />
      </Suspense>
    </div>
  )
}
