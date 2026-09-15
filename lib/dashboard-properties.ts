import type { SupabaseClient } from '@supabase/supabase-js'

type Lang = 'en' | 'ar'

/**
 * Shape of a row from the base `properties` table (staff-only, all statuses —
 * unlike `properties_public`, which only exposes published listings). Core
 * listing fields mirror `properties_public`'s naming. The agent/seller display
 * fields are a best guess at the same naming `properties_public` exposes;
 * if the base table stores them differently, `getStaffAgentName` /
 * `getStaffSellerName` below are the only place that needs updating.
 */
export type StaffProperty = {
  id: string
  ref_number: string
  purpose: 'sale' | 'rent'
  status: string
  title_en: string | null
  title_ar: string | null
  area: string | null
  area_en: string | null
  sale_price: number | null
  monthly_rent: number | null
  currency: string | null
  views_count: number | null
  created_at: string | null
  agent_id: string | null
  seller_id: string | null
  [key: string]: unknown
}

export type StaffPropertyRow = StaffProperty & { image: string | null }

export async function getStaffProperties(supabase: SupabaseClient): Promise<StaffPropertyRow[]> {
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getStaffProperties error:', error.message)
    return []
  }

  const rows = (properties ?? []) as StaffProperty[]
  if (rows.length === 0) return []

  const ids = rows.map((p) => p.id)
  const { data: media, error: mediaError } = await supabase
    .from('property_media')
    .select('property_id, url')
    .in('property_id', ids)
    .eq('is_primary', true)

  if (mediaError) console.error('getStaffProperties media error:', mediaError.message)

  const imgMap = new Map((media ?? []).map((m) => [m.property_id as string, m.url as string]))
  return rows.map((p) => ({ ...p, image: imgMap.get(p.id) ?? null }))
}

function pickLocalized(en: unknown, ar: unknown, lang: Lang): string | null {
  const enStr = typeof en === 'string' && en.length > 0 ? en : null
  const arStr = typeof ar === 'string' && ar.length > 0 ? ar : null
  return lang === 'en' ? enStr ?? arStr : arStr ?? enStr
}

export function getStaffPropertyTitle(row: StaffProperty, lang: Lang): string {
  return pickLocalized(row.title_en, row.title_ar, lang) ?? row.ref_number
}

export function getStaffPropertyArea(row: StaffProperty, lang: Lang): string | null {
  return pickLocalized(row.area_en, row.area, lang)
}

export function getStaffAgentName(row: StaffProperty, lang: Lang): string | null {
  return pickLocalized(row.agent_name_en, row.agent_name, lang)
}

export function getStaffSellerName(row: StaffProperty): string | null {
  const value = row.seller_display_name
  return typeof value === 'string' && value.length > 0 ? value : null
}

export function formatStaffPropertyPrice(row: StaffProperty, lang: Lang, currencyLabel: string): string {
  const amount = row.purpose === 'rent' ? row.monthly_rent ?? 0 : row.sale_price ?? 0
  const formatted = new Intl.NumberFormat(lang === 'ar' ? 'ar-BH' : 'en-BH', {
    maximumFractionDigits: 0,
  }).format(amount)
  return lang === 'ar' ? `${formatted} ${currencyLabel}` : `${currencyLabel} ${formatted}`
}
