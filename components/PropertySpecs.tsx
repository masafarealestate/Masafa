'use client'

import type { PropertyPublic } from '../lib/types'
import { useLanguage } from '../lib/i18n/LanguageProvider'
import { getLocalizedType, getLocalizedGovernorate } from '../lib/property-i18n'

function SpecBox({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-md border border-stone bg-surface p-4 text-center shadow-card">
      <div className="text-xl font-bold text-ink">{value}</div>
      <div className="mt-1 text-xs text-muted">{label}</div>
    </div>
  )
}

export function PropertySpecs({ property }: { property: PropertyPublic }) {
  const { lang, dict } = useLanguage()
  const isLand = property.type_slug === 'land'

  const specs = isLand
    ? [
        { value: `${property.size_sqm ?? 0} ${dict.properties.sqm}`, label: dict.propertyDetail.specs.plotAreaLabel },
        { value: getLocalizedType(property, lang), label: dict.propertyDetail.specs.typeLabel },
        {
          value: getLocalizedGovernorate(property, lang) ?? '—',
          label: dict.home.hero.governorateLabel,
        },
        { value: property.ref_number, label: dict.propertyDetail.specs.referenceLabel },
      ]
    : [
        { value: property.bedrooms ?? 0, label: dict.properties.beds },
        { value: property.bathrooms ?? 0, label: dict.properties.baths },
        { value: `${property.size_sqm ?? 0} ${dict.properties.sqm}`, label: dict.propertyDetail.specs.sizeLabel },
        { value: property.parking ?? 0, label: dict.propertyDetail.specs.parkingLabel },
      ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {specs.map((spec) => (
        <SpecBox key={spec.label} value={spec.value} label={spec.label} />
      ))}
    </div>
  )
}
