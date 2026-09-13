'use client'

import { useState } from 'react'
import type { PropertyPublic } from '../lib/types'
import { useLanguage } from '../lib/i18n/LanguageProvider'
import type { Lang } from '../lib/i18n/dictionaries'

export function PropertyDescriptionTabs({ property }: { property: PropertyPublic }) {
  const { lang, dict } = useLanguage()
  const [activeTab, setActiveTab] = useState<Lang>(lang)

  const text = activeTab === 'en' ? property.description_en : property.description_ar

  return (
    <section>
      <h2 className="text-xl font-bold text-ink">{dict.propertyDetail.description.heading}</h2>

      <div className="mt-3 flex gap-2 border-b border-stone">
        {(['en', 'ar'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className="-mb-px border-b-2 px-3 py-2 text-sm font-semibold transition-colors"
            style={{
              borderColor: activeTab === tab ? 'var(--brass)' : 'transparent',
              color: activeTab === tab ? 'var(--ink)' : 'var(--muted)',
            }}
            aria-current={activeTab === tab ? 'true' : undefined}
          >
            {tab === 'en' ? dict.propertyDetail.description.tabEnglish : dict.propertyDetail.description.tabArabic}
          </button>
        ))}
      </div>

      <p
        className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink"
        dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
      >
        {text || dict.propertyDetail.description.empty}
      </p>
    </section>
  )
}
