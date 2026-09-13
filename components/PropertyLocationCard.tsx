'use client'

import type { PropertyPublic } from '../lib/types'
import { useLanguage } from '../lib/i18n/LanguageProvider'
import { getLocalizedArea, getLocalizedCity } from '../lib/property-i18n'

export function PropertyLocationCard({ property }: { property: PropertyPublic }) {
  const { lang, dict } = useLanguage()
  const areaLabel = [getLocalizedArea(property, lang), getLocalizedCity(property, lang)]
    .filter(Boolean)
    .join(lang === 'ar' ? '، ' : ', ')

  return (
    <section>
      <h2 className="text-xl font-bold text-ink">{dict.propertyDetail.location.heading}</h2>
      <div
        className="mt-3 flex flex-col items-center justify-center gap-2 rounded-lg border border-stone p-12 text-center"
        style={{
          background:
            'repeating-linear-gradient(45deg, var(--sand), var(--sand) 10px, var(--stone) 10px, var(--stone) 11px)',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z"
            fill="var(--ink)"
          />
          <circle cx="12" cy="9.5" r="2.5" fill="var(--sand)" />
        </svg>
        {areaLabel && <div className="font-semibold text-ink">{areaLabel}</div>}
        <div className="text-xs text-muted">{dict.propertyDetail.location.mapComingSoon}</div>
      </div>
    </section>
  )
}
