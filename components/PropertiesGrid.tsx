'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLanguage } from '../lib/i18n/LanguageProvider'
import type { Amenity } from '../lib/types'
import { PropertyCard, type PropertyWithImage } from './PropertyCard'
import { PropertyFiltersSidebar } from './PropertyFiltersSidebar'

export function PropertiesGrid({
  properties,
  amenities,
}: {
  properties: PropertyWithImage[]
  amenities: Amenity[]
}) {
  const { dict } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <h1 className="mb-1 text-3xl font-bold text-ink">{dict.properties.heading}</h1>
      <p className="mb-5 text-muted">{dict.properties.count(properties.length)}</p>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="lg:sticky lg:top-24">
          <PropertyFiltersSidebar amenities={amenities} />
        </div>

        <div className="min-w-0 flex-1">
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-md border border-stone bg-surface p-16 text-center text-muted">
              <span>{dict.properties.empty}</span>
              <button
                type="button"
                onClick={() => router.push(pathname, { scroll: false })}
                className="rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: 'var(--ink)' }}
              >
                {dict.properties.filters.clearAll}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
