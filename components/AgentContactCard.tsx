'use client'

import { useState } from 'react'
import type { PropertyPublic } from '../lib/types'
import { useLanguage } from '../lib/i18n/LanguageProvider'
import { getLocalizedAgentName, getLocalizedTitle } from '../lib/property-i18n'
import { initials } from '../lib/format'

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.9-1.25-4.79-4.17-4.93-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.21.72-.84.91-1.13.19-.29.38-.24.64-.15.26.1 1.66.78 1.94.92.29.15.48.22.55.34.07.13.07.73-.17 1.41Z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.4 2.7 3.6 4.9 6.3 6.3l2.1-2.1c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.6c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-2.1 2.1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function AgentContactCard({ property }: { property: PropertyPublic }) {
  const { lang, dict } = useLanguage()
  const [photoFailed, setPhotoFailed] = useState(false)

  const agentName = getLocalizedAgentName(property, lang)
  const propertyTitle = getLocalizedTitle(property, lang)

  const whatsappDigits = property.agent_whatsapp?.replace(/\D/g, '') ?? ''
  const whatsappMessage = dict.propertyDetail.agentCard.whatsappMessage(propertyTitle, property.ref_number)
  const whatsappHref = whatsappDigits ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(whatsappMessage)}` : null

  const callHref = property.agent_phone ? `tel:${property.agent_phone}` : null

  const inquirySubject = dict.propertyDetail.agentCard.inquirySubject(propertyTitle, property.ref_number)
  const inquiryHref = `mailto:${dict.footer.addressLine2}?subject=${encodeURIComponent(inquirySubject)}`

  return (
    <div className="rounded-lg border border-stone bg-surface p-5 shadow-card">
      <h2 className="text-sm font-semibold text-muted">{dict.propertyDetail.agentCard.contactHeading}</h2>

      <div className="mt-3 flex items-center gap-3">
        {property.agent_photo && !photoFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={property.agent_photo}
            alt={agentName ?? ''}
            className="h-14 w-14 shrink-0 rounded-full object-cover"
            onError={() => setPhotoFailed(true)}
          />
        ) : (
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-base font-bold text-white"
            style={{ background: 'var(--ink)' }}
            aria-hidden="true"
          >
            {initials(agentName ?? '')}
          </div>
        )}
        <div className="min-w-0">
          <div className="truncate font-semibold text-ink">{agentName ?? '—'}</div>
          {property.agent_title && <div className="truncate text-xs text-muted">{property.agent_title}</div>}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: '#25D366' }}
          >
            <WhatsAppIcon />
            {dict.propertyDetail.agentCard.whatsapp}
          </a>
        )}

        {callHref && (
          <a
            href={callHref}
            className="flex items-center justify-center gap-2 rounded-md border border-stone px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
          >
            <PhoneIcon />
            {dict.propertyDetail.agentCard.call}
          </a>
        )}

        <a
          href={inquiryHref}
          className="flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: 'var(--ink)' }}
        >
          <MailIcon />
          {dict.propertyDetail.agentCard.inquiry}
        </a>
      </div>

      <div className="mt-4 space-y-1 border-t border-stone pt-3 text-xs text-muted">
        {property.seller_display_name && (
          <div>
            {dict.propertyDetail.agentCard.seller}: {property.seller_display_name}
          </div>
        )}
        <div>
          {dict.propertyDetail.agentCard.reference}: {property.ref_number}
        </div>
        {typeof property.views_count === 'number' && property.views_count > 0 && (
          <div>{dict.propertyDetail.agentCard.views(property.views_count)}</div>
        )}
      </div>
    </div>
  )
}
