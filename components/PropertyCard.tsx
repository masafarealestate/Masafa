'use client'

import Link from 'next/link'
import type { PropertyPublic } from '../lib/types'
import { useLanguage } from '../lib/i18n/LanguageProvider'
import {
  getLocalizedArea,
  getLocalizedCity,
  getLocalizedAgentName,
  getLocalizedTitle,
  getLocalizedType,
  formatPropertyPrice,
} from '../lib/property-i18n'
import { PropertyImage } from './PropertyImage'

export type PropertyWithImage = PropertyPublic & { image: string | null }

export function PropertyCard({ property }: { property: PropertyWithImage }) {
  const { lang, dict } = useLanguage()

  const title = getLocalizedTitle(property, lang)
  const type = getLocalizedType(property, lang)
  const isRent = property.purpose === 'rent'
  const area = getLocalizedArea(property, lang)
  const city = getLocalizedCity(property, lang)
  const agentName = getLocalizedAgentName(property, lang)

  return (
    <Link
      href={`/properties/${property.id}`}
      className="block overflow-hidden rounded-md border border-stone bg-surface shadow-card transition-shadow hover:shadow-lg"
    >
      <article>
        <div className="relative aspect-[4/3] bg-ink-deep">
          <PropertyImage src={property.image} alt={title} className="h-full w-full object-cover" />
          <span
            className="absolute top-3 end-3 rounded-sm px-3 py-1 text-xs font-semibold text-white"
            style={{ background: isRent ? 'var(--brass)' : 'var(--ink)' }}
          >
            {isRent ? dict.properties.forRent : dict.properties.forSale}
          </span>
        </div>

        <div className="p-4">
          <div className="mb-2 text-xl font-bold text-ink">
            {formatPropertyPrice(property, lang, dict.properties.currency, dict.properties.perMonth)}
          </div>
          <div className="mb-1.5 text-base font-semibold text-ink">{title}</div>
          <div className="mb-3 text-sm text-muted">
            {[area, city].filter(Boolean).join(lang === 'ar' ? '، ' : ', ')} · {type}
          </div>

          <div className="flex gap-4 border-t border-stone pt-3 text-sm text-ink">
            {property.type_slug !== 'land' && (
              <>
                <span>
                  {property.bedrooms ?? 0} {dict.properties.beds}
                </span>
                <span>
                  {property.bathrooms ?? 0} {dict.properties.baths}
                </span>
              </>
            )}
            <span>
              {property.size_sqm ?? 0} {dict.properties.sqm}
            </span>
          </div>

          <div className="mt-3 text-xs text-muted">
            {dict.properties.agent}: {agentName ?? '—'} · {property.ref_number}
          </div>
        </div>
      </article>
    </Link>
  )
}
