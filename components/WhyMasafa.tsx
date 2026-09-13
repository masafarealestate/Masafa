'use client'

import { useLanguage } from '../lib/i18n/LanguageProvider'
import { Reveal } from './Reveal'

const ICON_PATHS = [
  // map pin
  'M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11Zm0-8.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
  // shield check
  'M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3Zm-1.1 11.5 4.4-4.4-1.4-1.4-3 3-1.3-1.3-1.4 1.4 2.7 2.7Z',
  // document
  'M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.5V8h4.5M9 12h6M9 15.5h6M9 8.5h2',
]

export function WhyMasafa() {
  const { dict } = useLanguage()

  return (
    <section className="border-y border-stone bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
        <Reveal>
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">{dict.home.why.heading}</h2>
          <p className="mt-2 max-w-xl text-muted">{dict.home.why.subheading}</p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {dict.home.why.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="h-full rounded-md border border-stone bg-sand p-6">
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="var(--brass)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={ICON_PATHS[i]} />
                </svg>
                <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
