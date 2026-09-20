'use client'

import { FieldSelect } from '../FieldSelect'
import { SELLER_TYPES, type SellerType } from '../../lib/property-wizard-options'
import type { SellerFieldsValue } from '../../lib/seller-fields'
import { inputClass, labelClass, textareaClass } from './wizard/fieldStyles'

export type SellerFieldsLabels = {
  fullNameLabel: string
  phoneLabel: string
  phonePlaceholder: string
  whatsappLabel: string
  whatsappPlaceholder: string
  whatsappSameAsPhoneLabel: string
  emailLabel: string
  typeLabel: string
  typeOptions: Record<SellerType, string>
  notesLabel: string
}

/**
 * Shared field set for a seller record, used both by the dashboard's standalone
 * seller form and the property wizard's inline "add new seller" step, so the
 * two stay behaviorally identical (required fields, WhatsApp-sync checkbox).
 */
export function SellerFormFields({
  value,
  onChange,
  sameAsPhone,
  onSameAsPhoneChange,
  labels,
}: {
  value: SellerFieldsValue
  onChange: (patch: Partial<SellerFieldsValue>) => void
  sameAsPhone: boolean
  onSameAsPhoneChange: (checked: boolean) => void
  labels: SellerFieldsLabels
}) {
  function handlePhoneChange(next: string) {
    onChange(sameAsPhone ? { phone: next, whatsapp: next } : { phone: next })
  }

  function handleSameAsPhoneChange(checked: boolean) {
    onSameAsPhoneChange(checked)
    if (checked) onChange({ whatsapp: value.phone })
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <label className={labelClass}>
        {labels.fullNameLabel} <span className="text-red-500">*</span>
        <input
          type="text"
          value={value.full_name}
          onChange={(e) => onChange({ full_name: e.target.value })}
          className={inputClass}
          required
        />
      </label>

      <FieldSelect
        label={labels.typeLabel}
        value={value.type}
        onChange={(v) => onChange({ type: v as SellerType })}
        options={SELLER_TYPES.map((v) => ({ value: v, label: labels.typeOptions[v] }))}
      />

      <label className={labelClass}>
        {labels.phoneLabel} <span className="text-red-500">*</span>
        <input
          type="tel"
          value={value.phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          placeholder={labels.phonePlaceholder}
          className={inputClass}
          required
        />
      </label>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>
          {labels.whatsappLabel} <span className="text-red-500">*</span>
          {sameAsPhone ? (
            <input
              type="tel"
              value={value.phone}
              disabled
              placeholder={labels.phonePlaceholder}
              className={`${inputClass} cursor-not-allowed opacity-70`}
            />
          ) : (
            <input
              type="tel"
              value={value.whatsapp}
              onChange={(e) => onChange({ whatsapp: e.target.value })}
              placeholder={labels.whatsappPlaceholder}
              className={inputClass}
              required
            />
          )}
        </label>
        <label className="flex items-center gap-2 text-xs text-ink">
          <input
            type="checkbox"
            checked={sameAsPhone}
            onChange={(e) => handleSameAsPhoneChange(e.target.checked)}
            className="h-4 w-4 accent-[var(--brass)]"
          />
          {labels.whatsappSameAsPhoneLabel}
        </label>
      </div>

      <label className={`${labelClass} sm:col-span-2`}>
        {labels.emailLabel}
        <input type="email" value={value.email} onChange={(e) => onChange({ email: e.target.value })} className={inputClass} />
      </label>

      <label className={`${labelClass} sm:col-span-2`}>
        {labels.notesLabel}
        <textarea
          rows={3}
          value={value.internal_notes}
          onChange={(e) => onChange({ internal_notes: e.target.value })}
          className={textareaClass}
        />
      </label>
    </div>
  )
}
