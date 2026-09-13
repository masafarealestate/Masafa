'use client'

import { useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useLanguage } from '../lib/i18n/LanguageProvider'
import { PROPERTY_TYPE_SLUGS } from '../lib/i18n/dictionaries'
import { BAHRAIN_GOVERNORATES, getAreasForGovernorate } from '../lib/bahrain-locations'
import type { Amenity } from '../lib/types'
import type { FurnishedState, Purpose } from '../lib/property-filters'
import { FieldSelect } from './FieldSelect'

const COUNT_OPTIONS = [1, 2, 3, 4, 5]

function PillGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const selected = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={selected}
            className="rounded-sm px-3 py-1.5 text-xs font-semibold transition-colors"
            style={selected ? { background: 'var(--ink)', color: '#fff' } : { background: 'var(--sand)', color: 'var(--ink)' }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="dropdown-chevron shrink-0">
      <path d="m5 7.5 5 5 5-5" stroke="var(--muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PropertyFiltersSidebar({ amenities }: { amenities: Amenity[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { lang, dict } = useLanguage()

  const purpose = (searchParams.get('purpose') as Purpose | null) ?? ''
  const governorate = searchParams.get('governorate') ?? ''
  const area = searchParams.get('area') ?? ''
  const type = searchParams.get('type') ?? ''
  const minPrice = searchParams.get('minPrice') ?? ''
  const maxPrice = searchParams.get('maxPrice') ?? ''
  const beds = searchParams.get('beds') ?? ''
  const baths = searchParams.get('baths') ?? ''
  const furnished = (searchParams.get('furnished') as FurnishedState | null) ?? ''
  const selectedAmenities = (searchParams.get('amenities') ?? '').split(',').filter(Boolean)

  // Local typing buffer that resets whenever the URL's committed value changes
  // (e.g. "Clear all filters"), without re-fighting the user on every keystroke.
  const [prevMinPrice, setPrevMinPrice] = useState(minPrice)
  const [minPriceInput, setMinPriceInput] = useState(minPrice)
  if (minPrice !== prevMinPrice) {
    setPrevMinPrice(minPrice)
    setMinPriceInput(minPrice)
  }

  const [prevMaxPrice, setPrevMaxPrice] = useState(maxPrice)
  const [maxPriceInput, setMaxPriceInput] = useState(maxPrice)
  if (maxPrice !== prevMaxPrice) {
    setPrevMaxPrice(maxPrice)
    setMaxPriceInput(maxPrice)
  }

  function updateParams(updates: Record<string, string | null>) {
    const next = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(updates)) {
      if (value) next.set(key, value)
      else next.delete(key)
    }
    const query = next.toString()
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  function handleAmenityToggle(id: string) {
    const next = selectedAmenities.includes(id)
      ? selectedAmenities.filter((a) => a !== id)
      : [...selectedAmenities, id]
    updateParams({ amenities: next.length > 0 ? next.join(',') : null })
  }

  const purposeOptions: { value: Purpose | ''; label: string }[] = [
    { value: '', label: dict.properties.filters.purposeAll },
    { value: 'sale', label: dict.nav.buy },
    { value: 'rent', label: dict.nav.rent },
    { value: 'commercial', label: dict.nav.commercial },
  ]

  const typeOptions = [
    { value: '', label: dict.home.hero.typeAny },
    ...PROPERTY_TYPE_SLUGS.map((slug, i) => ({ value: slug, label: dict.home.hero.typeOptions[i] })),
  ]

  const governorateOptions = [
    { value: '', label: dict.home.hero.allGovernorates },
    ...BAHRAIN_GOVERNORATES.map((g) => ({ value: g.key, label: lang === 'ar' ? g.ar : g.en })),
  ]

  const areaOptions = [
    { value: '', label: dict.home.hero.allAreas },
    ...getAreasForGovernorate(governorate).map((a) => ({ value: a.key, label: lang === 'ar' ? a.ar : a.en })),
  ]

  const bedroomOptions = [
    { value: '', label: dict.home.hero.bedroomsAny },
    ...COUNT_OPTIONS.map((n) => ({ value: String(n), label: `${n}${n === 5 ? '+' : ''}` })),
  ]

  const bathroomOptions = [
    { value: '', label: dict.properties.filters.bathroomsAny },
    ...COUNT_OPTIONS.map((n) => ({ value: String(n), label: `${n}${n === 5 ? '+' : ''}` })),
  ]

  const furnishedOptions: { value: FurnishedState | ''; label: string }[] = [
    { value: '', label: dict.properties.filters.furnishedAny },
    { value: 'furnished', label: dict.properties.filters.furnished },
    { value: 'unfurnished', label: dict.properties.filters.unfurnished },
  ]

  const fields = (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted">{dict.properties.filters.purposeLabel}</span>
        <PillGroup options={purposeOptions} value={purpose} onChange={(v) => updateParams({ purpose: v || null })} />
      </div>

      <FieldSelect
        label={dict.home.hero.typeLabel}
        value={type}
        onChange={(v) => updateParams({ type: v || null })}
        options={typeOptions}
      />

      <FieldSelect
        label={dict.home.hero.governorateLabel}
        value={governorate}
        onChange={(v) => updateParams({ governorate: v || null, area: null })}
        options={governorateOptions}
      />

      <FieldSelect
        label={dict.home.hero.areaLabel}
        value={area}
        onChange={(v) => updateParams({ area: v || null })}
        options={areaOptions}
      />

      <div className="grid grid-cols-2 gap-2">
        <label className="flex flex-col gap-1 text-xs font-medium text-muted">
          {dict.properties.filters.minPriceLabel}
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={minPriceInput}
            onChange={(e) => setMinPriceInput(e.target.value)}
            onBlur={() => updateParams({ minPrice: minPriceInput || null })}
            onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
            className="h-11 rounded-md border border-stone bg-surface px-3 text-sm text-ink placeholder:text-muted transition-colors hover:border-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)]"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-muted">
          {dict.home.hero.maxPriceLabel}
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={maxPriceInput}
            onChange={(e) => setMaxPriceInput(e.target.value)}
            onBlur={() => updateParams({ maxPrice: maxPriceInput || null })}
            onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
            className="h-11 rounded-md border border-stone bg-surface px-3 text-sm text-ink placeholder:text-muted transition-colors hover:border-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)]"
          />
        </label>
      </div>

      <FieldSelect
        label={dict.home.hero.bedroomsLabel}
        value={beds}
        onChange={(v) => updateParams({ beds: v || null })}
        options={bedroomOptions}
      />

      <FieldSelect
        label={dict.properties.filters.bathroomsLabel}
        value={baths}
        onChange={(v) => updateParams({ baths: v || null })}
        options={bathroomOptions}
      />

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted">{dict.properties.filters.furnishedLabel}</span>
        <PillGroup options={furnishedOptions} value={furnished} onChange={(v) => updateParams({ furnished: v || null })} />
      </div>

      {amenities.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted">{dict.properties.filters.amenitiesHeading}</span>
          <div className="flex flex-col gap-1.5">
            {amenities.map((amenity) => (
              <label key={amenity.id} className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity.id)}
                  onChange={() => handleAmenityToggle(amenity.id)}
                  className="h-4 w-4 shrink-0 rounded-sm border-stone accent-[var(--brass)]"
                />
                {lang === 'ar' ? amenity.name_ar ?? amenity.name_en : amenity.name_en ?? amenity.name_ar}
              </label>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => router.push(pathname, { scroll: false })}
        className="rounded-md border border-stone px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
      >
        {dict.properties.filters.clearAll}
      </button>
    </div>
  )

  return (
    <>
      <details className="rounded-lg border border-stone bg-surface lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
          {dict.properties.filters.heading}
          <ChevronIcon />
        </summary>
        <div className="border-t border-stone p-4">{fields}</div>
      </details>

      <aside className="hidden shrink-0 basis-64 rounded-lg border border-stone bg-surface p-4 lg:block">
        <h2 className="mb-4 text-sm font-semibold text-ink">{dict.properties.filters.heading}</h2>
        {fields}
      </aside>
    </>
  )
}
