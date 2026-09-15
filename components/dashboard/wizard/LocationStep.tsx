import { FieldSelect } from '../../FieldSelect'
import { BAHRAIN_GOVERNORATES, getAreasForGovernorate } from '../../../lib/bahrain-locations'
import type { Dictionary, Lang } from '../../../lib/i18n/dictionaries'
import type { PropertyFormState } from '../../../lib/property-wizard'
import { inputClass, labelClass } from './fieldStyles'

export function LocationStep({
  form,
  onChange,
  lang,
  t,
}: {
  form: PropertyFormState
  onChange: (patch: Partial<PropertyFormState>) => void
  lang: Lang
  t: Dictionary['dashboard']['propertyWizard']
}) {
  const areas = getAreasForGovernorate(form.governorateKey)

  return (
    <div>
      <h2 className="text-lg font-bold text-ink">{t.location.heading}</h2>
      <p className="mt-1 text-sm text-muted">{t.location.subheading}</p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          {t.location.countryLabel}
          <input type="text" value={t.location.countryValue} disabled className={`${inputClass} opacity-70`} />
        </label>

        <FieldSelect
          label={t.location.governorateLabel}
          value={form.governorateKey}
          onChange={(value) => onChange({ governorateKey: value, areaKey: '' })}
          options={[
            { value: '', label: t.location.governoratePlaceholder },
            ...BAHRAIN_GOVERNORATES.map((g) => ({ value: g.key, label: lang === 'ar' ? g.ar : g.en })),
          ]}
        />

        <FieldSelect
          label={t.location.areaLabel}
          value={form.areaKey}
          onChange={(value) => onChange({ areaKey: value })}
          options={[
            { value: '', label: t.location.areaPlaceholder },
            ...areas.map((a) => ({ value: a.key, label: lang === 'ar' ? a.ar : a.en })),
          ]}
        />

        <label className={labelClass}>
          {t.location.projectNameLabel}
          <input
            type="text"
            value={form.projectName}
            onChange={(e) => onChange({ projectName: e.target.value })}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          {t.location.buildingNameLabel}
          <input
            type="text"
            value={form.buildingName}
            onChange={(e) => onChange({ buildingName: e.target.value })}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          {t.location.unitNumberLabel}
          <input
            type="text"
            value={form.unitNumber}
            onChange={(e) => onChange({ unitNumber: e.target.value })}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          {t.location.floorLabel}
          <input type="text" value={form.floor} onChange={(e) => onChange({ floor: e.target.value })} className={inputClass} />
        </label>

        <label className={`${labelClass} sm:col-span-2`}>
          {t.location.addressLabel}
          <input type="text" value={form.address} onChange={(e) => onChange({ address: e.target.value })} className={inputClass} />
        </label>

        <label className={labelClass}>
          {t.location.latitudeLabel}
          <input
            type="number"
            inputMode="decimal"
            step="any"
            value={form.latitude}
            onChange={(e) => onChange({ latitude: e.target.value })}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          {t.location.longitudeLabel}
          <input
            type="number"
            inputMode="decimal"
            step="any"
            value={form.longitude}
            onChange={(e) => onChange({ longitude: e.target.value })}
            className={inputClass}
          />
        </label>
      </div>
    </div>
  )
}
