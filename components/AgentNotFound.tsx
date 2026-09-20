'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '../lib/i18n/LanguageProvider'

export function AgentNotFound() {
  const { dict } = useLanguage()
  const t = dict.agentsPage.notFound

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center md:px-8">
      <Image src="/masafa-mark.png" alt="" width={56} height={56} style={{ opacity: 0.5 }} aria-hidden="true" />
      <h1 className="mt-6 text-2xl font-bold text-ink">{t.heading}</h1>
      <p className="mt-2 max-w-md text-muted">{t.body}</p>
      <Link
        href="/agents"
        className="mt-6 inline-flex items-center gap-1.5 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ background: 'var(--ink)' }}
      >
        {t.backLink}
      </Link>
    </div>
  )
}
