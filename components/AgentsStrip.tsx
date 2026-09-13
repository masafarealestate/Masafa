'use client'

import { useLanguage } from '../lib/i18n/LanguageProvider'
import { initials } from '../lib/format'
import { Reveal } from './Reveal'

const AGENTS = [
  { name: 'Laila Haddad', listings: 24 },
  { name: 'Omar Nasser', listings: 31 },
  { name: 'Rana Qasem', listings: 18 },
  { name: 'Yousef Btoush', listings: 27 },
]

export function AgentsStrip() {
  const { dict } = useLanguage()

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
      <Reveal>
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{dict.home.agentsSection.heading}</h2>
        <p className="mt-2 max-w-xl text-muted">{dict.home.agentsSection.subheading}</p>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {AGENTS.map((agent, i) => (
          <Reveal key={agent.name} delay={i * 80}>
            <div className="flex h-full flex-col items-center rounded-md border border-stone bg-surface p-5 text-center shadow-card">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-white"
                style={{ background: 'var(--ink)' }}
                aria-hidden="true"
              >
                {initials(agent.name)}
              </div>
              <div className="mt-3 font-semibold text-ink">{agent.name}</div>
              <div className="mt-1 text-sm text-muted">{dict.home.agentsSection.roles[i]}</div>
              <div className="mt-2 text-xs font-medium" style={{ color: 'var(--brass)' }}>
                {dict.home.agentsSection.listings(agent.listings)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
