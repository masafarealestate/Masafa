'use client'

import { useLanguage } from '../lib/i18n/LanguageProvider'
import type { PublicAgentWithCount } from '../lib/types'
import { AgentCard } from './AgentCard'
import { Reveal } from './Reveal'

export function AgentsGrid({ agents }: { agents: PublicAgentWithCount[] }) {
  const { dict } = useLanguage()
  const t = dict.agentsPage

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <Reveal>
        <h1 className="mb-1 text-3xl font-bold text-ink">{t.heading}</h1>
        <p className="mb-6 max-w-2xl text-muted">{t.subheading}</p>
      </Reveal>

      {agents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {agents.map((agent, i) => (
            <Reveal key={agent.id} delay={Math.min(i, 6) * 60}>
              <AgentCard agent={agent} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-md border border-stone bg-surface p-16 text-center text-muted">
          <span>{t.empty}</span>
        </div>
      )}
    </div>
  )
}
