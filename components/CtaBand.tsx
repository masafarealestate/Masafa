'use client'

import Link from 'next/link'
import { useLanguage } from '../lib/i18n/LanguageProvider'
import { Reveal } from './Reveal'

export function CtaBand() {
  const { dict } = useLanguage()

  return (
    <section style={{ background: 'var(--ink)' }}>
      <Reveal className="mx-auto max-w-6xl px-4 py-14 text-center md:px-8 md:py-16">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">{dict.home.cta.heading}</h2>
        <p className="mx-auto mt-2 max-w-xl text-white/75">{dict.home.cta.subheading}</p>
        <Link
          href="/properties"
          className="mt-6 inline-block rounded-sm px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: 'var(--brass)' }}
        >
          {dict.home.cta.button}
        </Link>
      </Reveal>
    </section>
  )
}
