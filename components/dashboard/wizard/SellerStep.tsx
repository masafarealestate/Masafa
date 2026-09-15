import { FieldSelect } from '../../FieldSelect'
import type { Dictionary } from '../../../lib/i18n/dictionaries'
import type { PropertyFormState } from '../../../lib/property-wizard'
import { SELLER_TYPES } from '../../../lib/property-wizard-options'
import { inputClass, labelClass, textareaClass } from './fieldStyles'

export type SellerOption = { id: string; full_name: string }

export function SellerStep({
  form,
  onChange,
  sellers,
  t,
}: {
  form: PropertyFormState
  onChange: (patch: Partial<PropertyFormState>) => void
  sellers: SellerOption[]
  t: Dictionary['dashboard']['propertyWizard']
}) {
  const tabClass = (active: boolean) =>
    `rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${
      active ? 'border-ink bg-ink text-white' : 'border-stone bg-surface text-ink hover:border-brass'
    }`

  return (
    <div>
      <h2 className="text-lg font-bold text-ink">{t.seller.heading}</h2>
      <p className="mt-1 text-sm text-muted">{t.seller.subheading}</p>

      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => onChange({ sellerMode: 'existing' })} className={tabClass(form.sellerMode === 'existing')}>
          {t.seller.existingTab}
        </button>
        <button type="button" onClick={() => onChange({ sellerMode: 'new' })} className={tabClass(form.sellerMode === 'new')}>
          {t.seller.newTab}
        </button>
      </div>

      {form.sellerMode === 'existing' ? (
        <div className="mt-5 max-w-sm">
          <FieldSelect
            label={t.seller.selectLabel}
            value={form.sellerId}
            onChange={(value) => onChange({ sellerId: value })}
            options={[{ value: '', label: t.seller.selectPlaceholder }, ...sellers.map((s) => ({ value: s.id, label: s.full_name }))]}
          />
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            {t.seller.fullNameLabel}
            <input
              type="text"
              value={form.newSeller.full_name}
              onChange={(e) => onChange({ newSeller: { ...form.newSeller, full_name: e.target.value } })}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            {t.seller.phoneLabel}
            <input
              type="tel"
              value={form.newSeller.phone}
              onChange={(e) => onChange({ newSeller: { ...form.newSeller, phone: e.target.value } })}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            {t.seller.whatsappLabel}
            <input
              type="tel"
              value={form.newSeller.whatsapp}
              onChange={(e) => onChange({ newSeller: { ...form.newSeller, whatsapp: e.target.value } })}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            {t.seller.emailLabel}
            <input
              type="email"
              value={form.newSeller.email}
              onChange={(e) => onChange({ newSeller: { ...form.newSeller, email: e.target.value } })}
              className={inputClass}
            />
          </label>
          <FieldSelect
            label={t.seller.typeLabel}
            value={form.newSeller.type}
            onChange={(value) => onChange({ newSeller: { ...form.newSeller, type: value as PropertyFormState['newSeller']['type'] } })}
            options={SELLER_TYPES.map((value) => ({ value, label: t.seller.typeOptions[value] }))}
          />
          <label className={`${labelClass} sm:col-span-2`}>
            {t.seller.notesLabel}
            <textarea
              rows={2}
              value={form.newSeller.internal_notes}
              onChange={(e) => onChange({ newSeller: { ...form.newSeller, internal_notes: e.target.value } })}
              className={textareaClass}
            />
          </label>
        </div>
      )}

      <label className="mt-5 flex w-fit items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          checked={form.showSellerOnWebsite}
          onChange={(e) => onChange({ showSellerOnWebsite: e.target.checked })}
          className="h-4 w-4 accent-[var(--brass)]"
        />
        {t.seller.showOnWebsiteLabel}
      </label>
    </div>
  )
}
