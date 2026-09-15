import { FieldSelect } from '../../FieldSelect'
import type { Dictionary } from '../../../lib/i18n/dictionaries'
import type { PropertyFormState } from '../../../lib/property-wizard'
import { PAYMENT_METHOD_OPTIONS } from '../../../lib/property-wizard-options'
import { inputClass, labelClass, textareaClass } from './fieldStyles'

export function PriceStep({
  form,
  onChange,
  t,
}: {
  form: PropertyFormState
  onChange: (patch: Partial<PropertyFormState>) => void
  t: Dictionary['dashboard']['propertyWizard']
}) {
  const isRent = form.purpose === 'rent'

  return (
    <div>
      <h2 className="text-lg font-bold text-ink">{t.price.heading}</h2>
      <p className="mt-1 text-sm text-muted">{t.price.subheading}</p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          {t.price.currencyLabel}
          <input type="text" value="BHD" disabled className={`${inputClass} opacity-70`} />
        </label>

        {!isRent ? (
          <>
            <label className={labelClass}>
              {t.price.salePriceLabel}
              <input
                type="number"
                inputMode="decimal"
                min={0}
                value={form.salePrice}
                onChange={(e) => onChange({ salePrice: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              {t.price.priceNotesLabel}
              <textarea
                rows={2}
                value={form.priceNotes}
                onChange={(e) => onChange({ priceNotes: e.target.value })}
                className={textareaClass}
              />
            </label>
          </>
        ) : (
          <>
            <label className={labelClass}>
              {t.price.monthlyRentLabel}
              <input
                type="number"
                inputMode="decimal"
                min={0}
                value={form.monthlyRent}
                onChange={(e) => onChange({ monthlyRent: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              {t.price.weeklyRentLabel}
              <input
                type="number"
                inputMode="decimal"
                min={0}
                value={form.weeklyRent}
                onChange={(e) => onChange({ weeklyRent: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              {t.price.depositLabel}
              <input
                type="number"
                inputMode="decimal"
                min={0}
                value={form.deposit}
                onChange={(e) => onChange({ deposit: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              {t.price.commissionLabel}
              <input
                type="number"
                inputMode="decimal"
                min={0}
                value={form.commission}
                onChange={(e) => onChange({ commission: e.target.value })}
                className={inputClass}
              />
            </label>

            <FieldSelect
              label={t.price.paymentMethodLabel}
              value={form.paymentMethod}
              onChange={(value) => onChange({ paymentMethod: value as PropertyFormState['paymentMethod'] })}
              options={[
                { value: '', label: t.price.paymentMethodPlaceholder },
                ...PAYMENT_METHOD_OPTIONS.map((value) => ({ value, label: t.price.paymentMethodOptions[value] })),
              ]}
            />

            <div className="sm:col-span-2">
              <p className="text-xs font-medium text-muted">{t.price.utilitiesLabel}</p>
              <div className="mt-2 flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={form.utilitiesElectricity}
                    onChange={(e) => onChange({ utilitiesElectricity: e.target.checked })}
                    className="h-4 w-4 accent-[var(--brass)]"
                  />
                  {t.price.electricityLabel}
                </label>
                <label className="flex items-center gap-2 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={form.utilitiesWater}
                    onChange={(e) => onChange({ utilitiesWater: e.target.checked })}
                    className="h-4 w-4 accent-[var(--brass)]"
                  />
                  {t.price.waterLabel}
                </label>
                <label className="flex items-center gap-2 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={form.utilitiesInternet}
                    onChange={(e) => onChange({ utilitiesInternet: e.target.checked })}
                    className="h-4 w-4 accent-[var(--brass)]"
                  />
                  {t.price.internetLabel}
                </label>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
