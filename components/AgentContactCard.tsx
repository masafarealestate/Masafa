'use client'

import { useState } from 'react'
import type { PropertyPublic } from '../lib/types'
import { useLanguage } from '../lib/i18n/LanguageProvider'
import { getLocalizedAgentName, getLocalizedTitle } from '../lib/property-i18n'
import { initials } from '../lib/format'
import { MailIcon, PhoneIcon, WhatsAppIcon } from './icons'

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
