import type { Dictionary, Lang } from '../../../lib/i18n/dictionaries'
import type { PropertyFormState } from '../../../lib/property-wizard'

export type PropertyTypeOption = { id: string; slug: string; name_en: string; name_ar: string }

export function PropertyTypeStep({
  form,
  onChange,
  propertyTypes,
  lang,
  t,
}: {
  form: PropertyFormState
  onChange: (patch: Partial<PropertyFormState>) => void
  propertyTypes: PropertyTypeOption[]
  lang: Lang
  t: Dictionary['dashboard']['propertyWizard']
}) {
  return (
    <div>
      <h2 className="text-lg font-bold text-ink">{t.type.heading}</h2>
      <p className="mt-1 text-sm text-muted">{t.type.subheading}</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {propertyTypes.map((type) => {
          const label = lang === 'ar' ? type.name_ar : type.name_en
          const selected = form.propertyTypeId === type.id
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => onChange({ propertyTypeId: type.id })}
              className={`rounded-lg border-2 px-4 py-4 text-sm font-semibold transition-colors ${
                selected ? 'border-ink bg-ink text-white' : 'border-stone bg-surface text-ink hover:border-brass'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
