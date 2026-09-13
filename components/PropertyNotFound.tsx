'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '../lib/i18n/LanguageProvider'

export function PropertyNotFound() {
  const { dict } = useLanguage()

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center md:px-8">
      <Image src="/masafa-mark.png" alt="" width={56} height={56} style={{ opacity: 0.5 }} aria-hidden="true" />
      <h1 className="mt-6 text-2xl font-bold text-ink">{dict.propertyDetail.notFound.heading}</h1>
      <p className="mt-2 max-w-md text-muted">{dict.propertyDetail.notFound.body}</p>
      <Link
        href="/properties"
        className="mt-6 inline-flex items-center gap-1.5 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ background: 'var(--ink)' }}
      >
        {dict.propertyDetail.notFound.backButton}
      </Link>
    </div>
  )
}
