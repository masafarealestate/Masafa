import { supabase } from './supabase'
import { attachPrimaryImages } from './properties'
import type { PropertyPublic, PublicAgent, PublicAgentWithCount } from './types'
import type { PropertyWithImage } from '../components/PropertyCard'

const ACTIVE_LISTING_STATUSES = ['published', 'active']

const BASE_AGENT_COLUMNS = 'id, full_name, full_name_en, job_title, phone, whatsapp, photo_url, is_active'
const EXTENDED_AGENT_COLUMNS = 'id, full_name, full_name_en, job_title, job_title_en, language, phone, whatsapp, photo_url, is_active'

/** `job_title_en` / `language` aren't confirmed columns on every deployment of `agents` — retry with the guaranteed set if the extended select errors. */
async function fetchActiveAgentRows(): Promise<PublicAgent[]> {
  const extended = await supabase.from('agents').select(EXTENDED_AGENT_COLUMNS).eq('is_active', true).order('full_name_en')

  if (!extended.error) {
    return (extended.data ?? []) as unknown as PublicAgent[]
  }

  console.error('getActiveAgents extended-columns error (retrying with base columns):', extended.error.message)
  const base = await supabase.from('agents').select(BASE_AGENT_COLUMNS).eq('is_active', true).order('full_name_en')

  if (base.error) {
    console.error('getActiveAgents error:', base.error.message)
    return []
  }

  return (base.data ?? []) as unknown as PublicAgent[]
}

/**
 * `properties_public` may or may not carry an explicit `status` column depending on how the
 * view filters rows — retry without that clause (trusting the view is already public/active-only)
 * rather than failing the whole count, same pattern as the `furnished` fallback in properties.ts.
 */
async function countAgentListings(agentId: string): Promise<number> {
  let { count, error } = await supabase
    .from('properties_public')
    .select('agent_id', { count: 'exact', head: true })
    .eq('agent_id', agentId)
    .in('status', ACTIVE_LISTING_STATUSES)

  if (error) {
    console.error('countAgentListings status-filter error (retrying without it):', error.message)
    ;({ count, error } = await supabase
      .from('properties_public')
      .select('agent_id', { count: 'exact', head: true })
      .eq('agent_id', agentId))
  }

  if (error) {
    console.error('countAgentListings error:', error.message)
    return 0
  }

  return count ?? 0
}

async function attachListingCounts(agents: PublicAgent[]): Promise<PublicAgentWithCount[]> {
  if (agents.length === 0) return []

  return Promise.all(agents.map(async (agent) => ({ ...agent, listingCount: await countAgentListings(agent.id) })))
}

export async function getActiveAgents(): Promise<PublicAgentWithCount[]> {
  const agents = await fetchActiveAgentRows()
  return attachListingCounts(agents)
}

export async function getActiveAgentById(id: string): Promise<PublicAgentWithCount | null> {
  const extended = await supabase.from('agents').select(EXTENDED_AGENT_COLUMNS).eq('id', id).eq('is_active', true).maybeSingle()

  let agent: PublicAgent | null = null
  if (!extended.error) {
    agent = (extended.data as unknown as PublicAgent | null) ?? null
  } else {
    console.error('getActiveAgentById extended-columns error (retrying with base columns):', extended.error.message)
    const base = await supabase.from('agents').select(BASE_AGENT_COLUMNS).eq('id', id).eq('is_active', true).maybeSingle()
    if (base.error) {
      console.error('getActiveAgentById error:', base.error.message)
      return null
    }
    agent = (base.data as unknown as PublicAgent | null) ?? null
  }

  if (!agent) return null
  return { ...agent, listingCount: await countAgentListings(agent.id) }
}

export async function getAgentListings(agentId: string): Promise<PropertyWithImage[]> {
  let { data, error } = await supabase
    .from('properties_public')
    .select('*')
    .eq('agent_id', agentId)
    .in('status', ACTIVE_LISTING_STATUSES)

  if (error) {
    console.error('getAgentListings status-filter error (retrying without it):', error.message)
    ;({ data, error } = await supabase.from('properties_public').select('*').eq('agent_id', agentId))
  }

  if (error) {
    console.error('getAgentListings error:', error.message)
    return []
  }

  return attachPrimaryImages((data ?? []) as PropertyPublic[])
}
