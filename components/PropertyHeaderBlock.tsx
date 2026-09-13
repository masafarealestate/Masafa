'use client'

import type { PropertyPublic } from '../lib/types'
import { useLanguage } from '../lib/i18n/LanguageProvider'
import { getLocalizedArea, getLocalizedCity, getLocalizedTitle, formatPropertyPrice } from '../lib/property-i18n'

export function PropertyHeaderBlock({ property }: { property: PropertyPublic }) {
  const { lang, dict } = useLanguage()
  const title = getLocalizedTitle(property, lang)
  const isRent = property.purpose === 'rent'
  const area = getLocalizedArea(property, lang)
  const city = getLocalizedCity(property, lang)

  return (
    <div>
      <span
        className="inline-block rounded-sm px-3 py-1 text-xs font-semibold text-white"
        style={{ background: isRent ? 'var(--brass)' : 'var(--ink)' }}
      >
        {isRent ? dict.properties.forRent : dict.properties.forSale}
      </span>

      <h1 className="mt-3 text-2xl font-bold text-ink sm:text-3xl">{title}</h1>

      {(area || city) && (
        <p className="mt-1.5 text-sm text-muted">{[area, city].filter(Boolean).join(lang === 'ar' ? '، ' : ', ')}</p>
      )}

      <div className="mt-4 text-3xl font-bold text-ink">
        {formatPropertyPrice(property, lang, dict.properties.currency, dict.properties.perMonth)}
      </div>
    </div>
  )
}
