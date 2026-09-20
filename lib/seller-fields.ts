import type { SellerType } from './property-wizard-options'

/** Canonical seller input shape, shared by the dashboard seller form and the property wizard's inline "add new seller" step. */
export type SellerFieldsValue = {
  full_name: string
  phone: string
  whatsapp: string
  email: string
  type: SellerType
  internal_notes: string
}

export function emptySellerFieldsValue(): SellerFieldsValue {
  return { full_name: '', phone: '', whatsapp: '', email: '', type: 'owner', internal_notes: '' }
}

export function isSellerFieldsValid(value: SellerFieldsValue): boolean {
  return Boolean(value.full_name.trim() && value.phone.trim() && value.whatsapp.trim())
}
