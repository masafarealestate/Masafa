'use client'

import { useLanguage } from '../lib/i18n/LanguageProvider'
import { ContactForm } from './ContactForm'
import { ContactInfo } from './ContactInfo'
import { Reveal } from './Reveal'

export function ContactSection() {
  const { dict } = useLanguage()
  const t = dict.contactPage

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-16">
      <Reveal>
        <h1 className="text-3xl font-bold text-ink">{t.heading}</h1>
        <p className="mt-2 max-w-2xl text-muted">{t.subheading}</p>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ContactInfo />
        </div>
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
