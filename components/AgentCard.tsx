'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '../lib/i18n/LanguageProvider'
import { getLocalizedAgentFullName, getLocalizedAgentJobTitle } from '../lib/agent-i18n'
import { initials } from '../lib/format'
import type { PublicAgentWithCount } from '../lib/types'
import { PhoneIcon, WhatsAppIcon } from './icons'

export function AgentCard({ agent }: { agent: PublicAgentWithCount }) {
  const { lang, dict } = useLanguage()
  const [photoFailed, setPhotoFailed] = useState(false)
  const t = dict.agentsPage

  const name = getLocalizedAgentFullName(agent, lang)
  const jobTitle = getLocalizedAgentJobTitle(agent, lang)

  const whatsappDigits = agent.whatsapp?.replace(/\D/g, '') ?? ''
  const whatsappHref = whatsappDigits ? `https://wa.me/${whatsappDigits}` : null
  const callHref = agent.phone ? `tel:${agent.phone}` : null

  return (
    <div className="flex h-full flex-col items-center rounded-md border border-stone bg-surface p-5 text-center shadow-card transition-shadow hover:shadow-lg">
      <Link href={`/agents/${agent.id}`} className="flex flex-col items-center">
        {agent.photo_url && !photoFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={agent.photo_url}
            alt={name}
            className="h-20 w-20 rounded-full object-cover"
            onError={() => setPhotoFailed(true)}
          />
        ) : (
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full text-xl font-bold text-white"
            style={{ background: 'var(--ink)' }}
            aria-hidden="true"
          >
            {initials(name)}
          </div>
        )}
        <div className="mt-3 font-semibold text-ink">{name}</div>
        {jobTitle && <div className="mt-0.5 text-sm text-muted">{jobTitle}</div>}
        {agent.language && <div className="mt-1 text-xs text-muted">{agent.language}</div>}
        <div className="mt-2 text-xs font-medium" style={{ color: 'var(--brass)' }}>
          {t.listings(agent.listingCount)}
        </div>
      </Link>

      <div className="mt-4 flex w-full gap-2">
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: '#25D366' }}
          >
            <WhatsAppIcon />
            {t.whatsapp}
          </a>
        )}
        {callHref && (
          <a
            href={callHref}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-stone px-3 py-2 text-xs font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
          >
            <PhoneIcon />
            {t.call}
          </a>
        )}
      </div>
    </div>
  )
}
