import { FieldSelect } from '../../FieldSelect'
import { SellerFormFields } from '../SellerFormFields'
import type { Dictionary } from '../../../lib/i18n/dictionaries'
import type { PropertyFormState } from '../../../lib/property-wizard'

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
        <div className="mt-5">
          <SellerFormFields
            value={form.newSeller}
            onChange={(patch) => onChange({ newSeller: { ...form.newSeller, ...patch } })}
            sameAsPhone={form.newSellerWhatsappSameAsPhone}
            onSameAsPhoneChange={(checked) => onChange({ newSellerWhatsappSameAsPhone: checked })}
            labels={t.seller}
          />
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
