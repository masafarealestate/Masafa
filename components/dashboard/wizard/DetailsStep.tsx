import { FieldSelect } from '../../FieldSelect'
import type { Dictionary } from '../../../lib/i18n/dictionaries'
import type { PropertyFormState } from '../../../lib/property-wizard'
import { CONDITION_OPTIONS, FURNISHING_OPTIONS } from '../../../lib/property-wizard-options'
import { inputClass, labelClass } from './fieldStyles'

export function DetailsStep({
  form,
  onChange,
  t,
}: {
  form: PropertyFormState
  onChange: (patch: Partial<PropertyFormState>) => void
  t: Dictionary['dashboard']['propertyWizard']
}) {
  const numberField = (label: string, key: keyof PropertyFormState) => (
    <label className={labelClass}>
      {label}
      <input
        type="number"
        inputMode="numeric"
        min={0}
        value={form[key] as string}
        onChange={(e) => onChange({ [key]: e.target.value } as Partial<PropertyFormState>)}
        className={inputClass}
      />
    </label>
  )

  return (
    <div>
      <h2 className="text-lg font-bold text-ink">{t.details.heading}</h2>
      <p className="mt-1 text-sm text-muted">{t.details.subheading}</p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {numberField(t.details.sizeSqmLabel, 'sizeSqm')}
        {numberField(t.details.landAreaSqmLabel, 'landAreaSqm')}
        {numberField(t.details.bedroomsLabel, 'bedrooms')}
        {numberField(t.details.bathroomsLabel, 'bathrooms')}
        {numberField(t.details.parkingLabel, 'parking')}
        {numberField(t.details.floorsCountLabel, 'floorsCount')}
        {numberField(t.details.yearBuiltLabel, 'yearBuilt')}

        <FieldSelect
          label={t.details.conditionLabel}
          value={form.condition}
          onChange={(value) => onChange({ condition: value as PropertyFormState['condition'] })}
          options={[
            { value: '', label: t.details.conditionPlaceholder },
            ...CONDITION_OPTIONS.map((value) => ({ value, label: t.details.conditionOptions[value] })),
          ]}
        />

        <FieldSelect
          label={t.details.furnishingLabel}
          value={form.furnishing}
          onChange={(value) => onChange({ furnishing: value as PropertyFormState['furnishing'] })}
          options={[
            { value: '', label: t.details.furnishingPlaceholder },
            ...FURNISHING_OPTIONS.map((value) => ({ value, label: t.details.furnishingOptions[value] })),
          ]}
        />
      </div>
    </div>
  )
}
