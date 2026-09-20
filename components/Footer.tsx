'use client'

import Link from 'next/link'
import { useLanguage } from '../lib/i18n/LanguageProvider'
import { Logo } from './Logo'

export function Footer() {
  const { lang, dict } = useLanguage()

  const quickLinks = [
    { href: '/', label: dict.nav.home },
    { href: '/properties', label: dict.nav.buy },
    { href: '/properties', label: dict.nav.rent },
    { href: '/properties', label: dict.nav.commercial },
  ]

  return (
    <footer style={{ background: 'var(--ink-deep)' }}>
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="inline-flex rounded-md bg-white/95 px-4 py-2.5 shadow-card">
              <Logo variant="full" height={56} alt={lang === 'ar' ? 'مسافة' : 'Masafa'} />
            </div>
            <p className="mt-3 max-w-xs text-sm text-white/65">{dict.footer.blurb}</p>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">{dict.footer.quickLinksHeading}</div>
            <ul className="mt-3 flex flex-col gap-2">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-white/65 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">{dict.footer.companyHeading}</div>
            <ul className="mt-3 flex flex-col gap-2">
              {dict.footer.companyLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-white/65 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">{dict.footer.contactHeading}</div>
            <div className="mt-3 flex flex-col gap-2 text-sm text-white/65">
              <span>{dict.footer.addressLine1}</span>
              <span>{dict.footer.addressLine2}</span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          {dict.footer.rights(new Date().getFullYear())}
        </div>
      </div>
    </footer>
  )
}
