import type { Dictionary } from '../../../lib/i18n/dictionaries'
import type { PropertyFormState } from '../../../lib/property-wizard'

export function PurposeStep({
  form,
  onChange,
  t,
}: {
  form: PropertyFormState
  onChange: (patch: Partial<PropertyFormState>) => void
  t: Dictionary['dashboard']['propertyWizard']
}) {
  const options: { value: 'sale' | 'rent'; label: string }[] = [
    { value: 'sale', label: t.purpose.sale },
    { value: 'rent', label: t.purpose.rent },
  ]

  return (
    <div>
      <h2 className="text-lg font-bold text-ink">{t.purpose.heading}</h2>
      <p className="mt-1 text-sm text-muted">{t.purpose.subheading}</p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange({ purpose: opt.value })}
            className={`rounded-lg border-2 p-6 text-center text-base font-semibold transition-colors ${
              form.purpose === opt.value
                ? 'border-ink bg-ink text-white'
                : 'border-stone bg-surface text-ink hover:border-brass'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
