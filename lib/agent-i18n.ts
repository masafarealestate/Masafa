import type { PublicAgent } from './types'

type Lang = 'en' | 'ar'

export function getLocalizedAgentFullName(agent: PublicAgent, lang: Lang): string {
  return lang === 'en' ? agent.full_name_en || agent.full_name : agent.full_name
}

/**
 * `job_title` is currently only stored in one language. Wrapped here so that once a
 * `job_title_en` column exists everywhere, only this function needs to change.
 */
export function getLocalizedAgentJobTitle(agent: PublicAgent, lang: Lang): string | null {
  const localized = lang === 'en' ? agent.job_title_en ?? agent.job_title : agent.job_title
  return localized && localized.trim().length > 0 ? localized : null
}
