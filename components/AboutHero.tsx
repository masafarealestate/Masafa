'use client'

import { useLanguage } from '../lib/i18n/LanguageProvider'
import { Reveal } from './Reveal'

export function AboutHero() {
  const { dict } = useLanguage()
  const t = dict.aboutPage.hero

  return (
    <section className="relative isolate" style={{ background: 'linear-gradient(160deg, var(--ink-deep), var(--ink))' }}>
      <Reveal className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:py-20 md:px-8 md:py-24">
        <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">{t.heading}</h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">{t.subheading}</p>
      </Reveal>
    </section>
  )
}
