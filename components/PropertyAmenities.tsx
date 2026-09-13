'use client'

import type { Amenity } from '../lib/types'
import { useLanguage } from '../lib/i18n/LanguageProvider'

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="8" cy="8" r="8" fill="var(--brass)" />
      <path d="M4.5 8.2 6.8 10.5 11.5 5.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PropertyAmenities({ amenities }: { amenities: Amenity[] }) {
  const { lang, dict } = useLanguage()

  if (amenities.length === 0) return null

  return (
    <section>
      <h2 className="text-xl font-bold text-ink">{dict.propertyDetail.amenities.heading}</h2>
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
        {amenities.map((amenity) => (
          <div key={amenity.id} className="flex items-center gap-2 text-sm text-ink">
            <CheckIcon />
            <span>{lang === 'ar' ? amenity.name_ar ?? amenity.name_en : amenity.name_en ?? amenity.name_ar}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
