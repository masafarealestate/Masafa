'use client'

import Link from 'next/link'
import { useLanguage } from '../lib/i18n/LanguageProvider'
import { PropertyCard, type PropertyWithImage } from './PropertyCard'
import { Reveal } from './Reveal'

export function FeaturedProperties({ properties }: { properties: PropertyWithImage[] }) {
  const { dir, dict } = useLanguage()

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
      <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">{dict.home.featured.heading}</h2>
          <p className="mt-2 max-w-xl text-muted">{dict.home.featured.subheading}</p>
        </div>
        <Link
          href="/properties"
          className="inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-semibold text-ink transition-colors hover:text-brass sm:self-auto"
        >
          {dict.home.featured.viewAll}
          <span aria-hidden="true">{dir === 'rtl' ? '←' : '→'}</span>
        </Link>
      </Reveal>

      {properties.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, i) => (
            <Reveal key={property.id} delay={Math.min(i, 5) * 80}>
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-md border border-stone bg-surface p-16 text-center text-muted">
          {dict.home.featured.empty}
        </div>
      )}
    </section>
  )
}
