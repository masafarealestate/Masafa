'use client'

import { useLanguage } from '../lib/i18n/LanguageProvider'
import { Reveal } from './Reveal'

export function StatsStrip() {
  const { lang, dict } = useLanguage()
  const locale = lang === 'ar' ? 'ar-BH' : 'en-BH'
  const format = (n: number) => new Intl.NumberFormat(locale).format(n)

  const stats = [
    { value: 420, suffix: '+', label: dict.home.stats.propertiesLabel },
    { value: 18, suffix: '', label: dict.home.stats.agentsLabel },
    { value: 24, suffix: '', label: dict.home.stats.areasLabel },
    { value: 1900, suffix: '+', label: dict.home.stats.clientsLabel },
  ]

  return (
    <section className="border-b border-stone bg-surface">
      <Reveal className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4 md:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-bold text-ink sm:text-3xl">
              {format(stat.value)}
              {stat.suffix}
            </div>
            <div className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
