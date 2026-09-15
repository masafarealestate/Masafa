import type { Dictionary } from '../../../lib/i18n/dictionaries'
import type { PropertyFormState } from '../../../lib/property-wizard'
import { inputClass, labelClass, textareaClass } from './fieldStyles'

export function DescriptionStep({
  form,
  onChange,
  t,
}: {
  form: PropertyFormState
  onChange: (patch: Partial<PropertyFormState>) => void
  t: Dictionary['dashboard']['propertyWizard']
}) {
  return (
    <div>
      <h2 className="text-lg font-bold text-ink">{t.description.heading}</h2>
      <p className="mt-1 text-sm text-muted">{t.description.subheading}</p>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-4" dir="rtl">
          <label className={labelClass}>
            {t.description.titleArLabel}
            <input type="text" value={form.titleAr} onChange={(e) => onChange({ titleAr: e.target.value })} className={inputClass} />
          </label>
          <label className={labelClass}>
            {t.description.descriptionArLabel}
            <textarea
              rows={6}
              value={form.descriptionAr}
              onChange={(e) => onChange({ descriptionAr: e.target.value })}
              className={textareaClass}
            />
          </label>
        </div>

        <div className="flex flex-col gap-4" dir="ltr">
          <label className={labelClass}>
            {t.description.titleEnLabel}
            <input type="text" value={form.titleEn} onChange={(e) => onChange({ titleEn: e.target.value })} className={inputClass} />
          </label>
          <label className={labelClass}>
            {t.description.descriptionEnLabel}
            <textarea
              rows={6}
              value={form.descriptionEn}
              onChange={(e) => onChange({ descriptionEn: e.target.value })}
              className={textareaClass}
            />
          </label>
        </div>
      </div>
    </div>
  )
}
