'use client'

import { useLanguage } from '../lib/i18n/LanguageProvider'
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from './icons'

// PLACEHOLDER CONTACT DETAILS — address/phone live in lib/i18n/dictionaries.ts under `contactPage`,
// and this WhatsApp number is a placeholder too. Youssef: replace all three with the real details.
const WHATSAPP_PLACEHOLDER_NUMBER = '97317000000'

export function ContactInfo() {
  const { dict } = useLanguage()
  const t = dict.contactPage
  const email = dict.footer.addressLine2
  const whatsappHref = `https://wa.me/${WHATSAPP_PLACEHOLDER_NUMBER}`

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border border-stone bg-surface p-5 shadow-card md:p-6">
        <h2 className="text-lg font-bold text-ink">{t.infoHeading}</h2>

        <dl className="mt-4 flex flex-col gap-4 text-sm">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-muted" aria-hidden="true">
              <MapPinIcon />
            </span>
            <div>
              <dt className="text-xs font-medium text-muted">{t.addressLabel}</dt>
              <dd className="text-ink">{t.address}</dd>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-muted" aria-hidden="true">
              <PhoneIcon />
            </span>
            <div>
              <dt className="text-xs font-medium text-muted">{t.phoneLabel}</dt>
              <dd className="text-ink">
                <a href={`tel:${t.phone}`} className="transition-colors hover:text-brass">
                  {t.phone}
                </a>
              </dd>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-muted" aria-hidden="true">
              <MailIcon />
            </span>
            <div>
              <dt className="text-xs font-medium text-muted">{t.emailLabel}</dt>
              <dd className="text-ink">
                <a href={`mailto:${email}`} className="transition-colors hover:text-brass">
                  {email}
                </a>
              </dd>
            </div>
          </div>
        </dl>
      </div>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ background: '#25D366' }}
      >
        <WhatsAppIcon />
        {t.whatsappButton}
      </a>
    </div>
  )
}
