import type { SupabaseClient } from '@supabase/supabase-js'

export type DashboardStats = {
  total: number
  active: number
  pending: number
  drafts: number
}

const ACTIVE_STATUSES = ['published', 'active']
const PENDING_STATUSES = ['pending', 'pending_review', 'under_review', 'in_review']
const DRAFT_STATUSES = ['draft']

/**
 * Buckets properties by `status` case-insensitively into active/pending/draft
 * instead of matching one exact string — the schema's exact status labels
 * aren't confirmed from application code, so this stays correct even if the
 * real values are e.g. "active" instead of "published".
 */
export async function getDashboardStats(supabase: SupabaseClient): Promise<DashboardStats> {
  const { data: rows, error } = await supabase.from('properties').select('status')

  if (error) {
    console.error('getDashboardStats error:', error.message)
    return { total: 0, active: 0, pending: 0, drafts: 0 }
  }

  const counts = new Map<string, number>()
  for (const row of rows ?? []) {
    const key = String(row.status ?? '').toLowerCase()
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }

  const sum = (keys: string[]) => keys.reduce((n, key) => n + (counts.get(key) ?? 0), 0)

  return {
    total: rows?.length ?? 0,
    active: sum(ACTIVE_STATUSES),
    pending: sum(PENDING_STATUSES),
    drafts: sum(DRAFT_STATUSES),
  }
}
