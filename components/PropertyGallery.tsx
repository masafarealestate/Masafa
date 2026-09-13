'use client'

import { useState } from 'react'
import type { PropertyPublic } from '../lib/types'
import { useLanguage } from '../lib/i18n/LanguageProvider'
import { getLocalizedTitle } from '../lib/property-i18n'
import { PropertyImage } from './PropertyImage'

export function PropertyGallery({ images, property }: { images: string[]; property: PropertyPublic }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const { lang, dict } = useLanguage()
  const title = getLocalizedTitle(property, lang)

  const hasImages = images.length > 0
  const activeSrc = hasImages ? images[activeIndex] : null
  const thumbnailIndices = images.map((_, i) => i).filter((i) => i !== activeIndex).slice(0, 3)

  return (
    <div className="grid gap-3">
      <div className="overflow-hidden rounded-lg border border-stone shadow-card">
        <PropertyImage src={activeSrc} alt={title} className="aspect-[16/10] w-full object-cover" />
      </div>

      {thumbnailIndices.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {thumbnailIndices.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={dict.propertyDetail.gallery.thumbnailLabel(i + 1, images.length)}
              className="overflow-hidden rounded-md border border-stone shadow-card transition-opacity hover:opacity-90"
            >
              <PropertyImage src={images[i]} alt={title} className="aspect-[4/3] w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
