'use client'

import Link from 'next/link'
import type { PropertyPublic } from '../lib/types'
import { useLanguage } from '../lib/i18n/LanguageProvider'
import { getLocalizedTitle } from '../lib/property-i18n'

export function PropertyBreadcrumb({ property }: { property: PropertyPublic }) {
  const { lang, dict } = useLanguage()
  const title = getLocalizedTitle(property, lang)

  return (
    <nav aria-label={dict.propertyDetail.breadcrumb.properties} className="mx-auto max-w-6xl px-4 pt-6 md:px-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <li>
          <Link href="/" className="transition-colors hover:text-brass">
            {dict.nav.home}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href="/properties" className="transition-colors hover:text-brass">
            {dict.propertyDetail.breadcrumb.properties}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="max-w-[50vw] truncate font-medium text-ink">
          {title}
        </li>
      </ol>
    </nav>
  )
}
