'use client'

import Link from 'next/link'
import { useLanguage } from '../../lib/i18n/LanguageProvider'

export function SellerNotFound() {
  const { dict } = useLanguage()
  const t = dict.dashboard.sellers.notFound

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-stone bg-surface p-16 text-center">
      <h1 className="text-xl font-bold text-ink">{t.heading}</h1>
      <p className="max-w-md text-sm text-muted">{t.body}</p>
      <Link href="/dashboard/sellers" className="mt-2 text-sm font-semibold text-brass hover:opacity-80">
        {t.backLink}
      </Link>
    </div>
  )
}
