'use client'

import { useLanguage } from '../lib/i18n/LanguageProvider'
import { Reveal } from './Reveal'

// PLACEHOLDER CONTENT — the EN/AR copy lives in lib/i18n/dictionaries.ts under `aboutPage.story.body`.
// Youssef: replace both language strings there with Masafa's real company story/mission.
export function AboutStory() {
  const { dict } = useLanguage()
  const t = dict.aboutPage.story

  return (
    <section className="mx-auto max-w-3xl px-4 py-14 md:px-8 md:py-20">
      <Reveal>
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{t.heading}</h2>
        <p className="mt-4 leading-relaxed text-muted">{t.body}</p>
      </Reveal>
    </section>
  )
}
