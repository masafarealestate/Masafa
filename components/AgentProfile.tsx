'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '../lib/i18n/LanguageProvider'
import { getLocalizedAgentFullName, getLocalizedAgentJobTitle } from '../lib/agent-i18n'
import { initials } from '../lib/format'
import type { PublicAgentWithCount } from '../lib/types'
import { PhoneIcon, WhatsAppIcon } from './icons'
import { PropertyCard, type PropertyWithImage } from './PropertyCard'
import { Reveal } from './Reveal'

export function AgentProfile({ agent, listings }: { agent: PublicAgentWithCount; listings: PropertyWithImage[] }) {
  const { lang, dict } = useLanguage()
  const [photoFailed, setPhotoFailed] = useState(false)
  const t = dict.agentsPage

  const name = getLocalizedAgentFullName(agent, lang)
  const jobTitle = getLocalizedAgentJobTitle(agent, lang)

  const whatsappDigits = agent.whatsapp?.replace(/\D/g, '') ?? ''
  const whatsappHref = whatsappDigits ? `https://wa.me/${whatsappDigits}` : null
  const callHref = agent.phone ? `tel:${agent.phone}` : null

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <nav aria-label={t.heading} className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <li>
            <Link href="/" className="transition-colors hover:text-brass">
              {dict.nav.home}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/agents" className="transition-colors hover:text-brass">
              {t.heading}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="max-w-[50vw] truncate font-medium text-ink">
            {name}
          </li>
        </ol>
      </nav>

      <Reveal>
        <div className="flex flex-col items-center gap-5 rounded-lg border border-stone bg-surface p-6 text-center sm:flex-row sm:text-start">
          {agent.photo_url && !photoFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={agent.photo_url}
              alt={name}
              className="h-24 w-24 shrink-0 rounded-full object-cover"
              onError={() => setPhotoFailed(true)}
            />
          ) : (
            <div
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white"
              style={{ background: 'var(--ink)' }}
              aria-hidden="true"
            >
              {initials(name)}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-ink">{name}</h1>
            {jobTitle && <p className="mt-1 text-muted">{jobTitle}</p>}
            {agent.language && <p className="mt-1 text-sm text-muted">{agent.language}</p>}
            <div className="mt-2 text-sm font-medium" style={{ color: 'var(--brass)' }}>
              {t.listings(agent.listingCount)}
            </div>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto">
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: '#25D366' }}
              >
                <WhatsAppIcon />
                {t.whatsapp}
              </a>
            )}
            {callHref && (
              <a
                href={callHref}
                className="flex items-center justify-center gap-2 rounded-md border border-stone px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
              >
                <PhoneIcon />
                {t.call}
              </a>
            )}
          </div>
        </div>
      </Reveal>

      <h2 className="mb-4 mt-10 text-xl font-bold text-ink">{t.profile.listingsHeading(listings.length)}</h2>

      {listings.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {listings.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-md border border-stone bg-surface p-16 text-center text-muted">
          <span>{t.profile.listingsEmpty}</span>
        </div>
      )}
    </div>
  )
}
