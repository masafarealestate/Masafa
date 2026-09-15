import type { Dictionary, Lang } from '../../../lib/i18n/dictionaries'
import type { PropertyFormState } from '../../../lib/property-wizard'
import type { Amenity } from '../../../lib/types'

export function AmenitiesStep({
  form,
  onChange,
  amenities,
  lang,
  t,
}: {
  form: PropertyFormState
  onChange: (patch: Partial<PropertyFormState>) => void
  amenities: Amenity[]
  lang: Lang
  t: Dictionary['dashboard']['propertyWizard']
}) {
  function toggle(id: string) {
    const next = form.amenityIds.includes(id) ? form.amenityIds.filter((a) => a !== id) : [...form.amenityIds, id]
    onChange({ amenityIds: next })
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-ink">{t.amenities.heading}</h2>
      <p className="mt-1 text-sm text-muted">{t.amenities.subheading}</p>

      {amenities.length === 0 ? (
        <p className="mt-6 text-sm text-muted">{t.amenities.empty}</p>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {amenities.map((amenity) => {
            const checked = form.amenityIds.includes(amenity.id)
            return (
              <label
                key={amenity.id}
                className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 text-sm transition-colors ${
                  checked ? 'border-ink bg-ink text-white' : 'border-stone bg-surface text-ink hover:border-brass'
                }`}
              >
                <input type="checkbox" checked={checked} onChange={() => toggle(amenity.id)} className="h-4 w-4 accent-[var(--brass)]" />
                {lang === 'ar' ? amenity.name_ar : amenity.name_en}
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}
