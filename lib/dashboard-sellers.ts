import type { SupabaseClient } from '@supabase/supabase-js'
import type { SellerType } from './property-wizard-options'
import type { StaffProperty } from './dashboard-properties'

export type StaffSeller = {
  id: string
  full_name: string
  phone: string | null
  whatsapp: string | null
  email: string | null
  type: SellerType
  internal_notes: string | null
  created_by: string | null
  created_at: string | null
  updated_at: string | null
}

export type StaffSellerRow = StaffSeller & { propertyCount: number }

export async function getStaffSellers(supabase: SupabaseClient): Promise<StaffSellerRow[]> {
  const { data: sellers, error } = await supabase.from('sellers').select('*').order('created_at', { ascending: false })

  if (error) {
    console.error('getStaffSellers error:', error.message)
    return []
  }

  const rows = (sellers ?? []) as StaffSeller[]
  if (rows.length === 0) return []

  const { data: properties, error: propsError } = await supabase
    .from('properties')
    .select('seller_id')
    .in(
      'seller_id',
      rows.map((s) => s.id)
    )

  if (propsError) console.error('getStaffSellers properties error:', propsError.message)

  const counts = new Map<string, number>()
  for (const row of properties ?? []) {
    const id = row.seller_id as string | null
    if (!id) continue
    counts.set(id, (counts.get(id) ?? 0) + 1)
  }

  return rows.map((s) => ({ ...s, propertyCount: counts.get(s.id) ?? 0 }))
}

export async function getStaffSeller(supabase: SupabaseClient, id: string): Promise<StaffSeller | null> {
  const { data, error } = await supabase.from('sellers').select('*').eq('id', id).maybeSingle()
  if (error) console.error('getStaffSeller error:', error.message)
  return (data as StaffSeller | null) ?? null
}

export async function getSellerProperties(supabase: SupabaseClient, sellerId: string): Promise<StaffProperty[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('seller_id', sellerId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getSellerProperties error:', error.message)
    return []
  }

  return (data ?? []) as StaffProperty[]
}
