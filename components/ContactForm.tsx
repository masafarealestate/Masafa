'use client'

import { useState, useTransition } from 'react'
import { useLanguage } from '../lib/i18n/LanguageProvider'
import { submitContactForm, type ContactFormInput } from '../app/contact/actions'

const inputClass =
  'h-11 w-full rounded-md border border-stone bg-surface px-3 text-sm text-ink placeholder:text-muted transition-colors hover:border-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)]'
const textareaClass =
  'w-full rounded-md border border-stone bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted transition-colors hover:border-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)]'
const labelClass = 'flex flex-col gap-1.5 text-xs font-medium text-muted'

const emptyForm: ContactFormInput = { name: '', phone: '', email: '', message: '' }

export function ContactForm() {
  const { dict } = useLanguage()
  const t = dict.contactPage.form
  const [form, setForm] = useState<ContactFormInput>(emptyForm)
  const [pending, startTransition] = useTransition()
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  function patch(next: Partial<ContactFormInput>) {
    setForm((f) => ({ ...f, ...next }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const hasContact = Boolean(form.phone.trim() || form.email.trim())
    if (!form.name.trim() || !form.message.trim() || !hasContact) {
      setFeedback({ type: 'error', text: t.validation })
      return
    }
    setFeedback(null)
    startTransition(() => {
      submitContactForm(form).then((result) => {
        if (result.error) {
          setFeedback({ type: 'error', text: result.error === 'validation' ? t.validation : t.error })
        } else {
          setFeedback({ type: 'success', text: t.success })
          setForm(emptyForm)
        }
      })
    })
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-stone bg-surface p-5 shadow-card md:p-6">
      {feedback && (
        <div
          role="status"
          className={`mb-4 rounded-md border px-3.5 py-2.5 text-sm ${
            feedback.type === 'success' ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {feedback.text}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className={`${labelClass} sm:col-span-2`}>
          {t.nameLabel} <span className="text-red-500">*</span>
          <input type="text" value={form.name} onChange={(e) => patch({ name: e.target.value })} className={inputClass} required />
        </label>

        <label className={labelClass}>
          {t.phoneLabel}
          <input type="tel" value={form.phone} onChange={(e) => patch({ phone: e.target.value })} className={inputClass} />
        </label>

        <label className={labelClass}>
          {t.emailLabel}
          <input type="email" value={form.email} onChange={(e) => patch({ email: e.target.value })} className={inputClass} />
        </label>

        <label className={`${labelClass} sm:col-span-2`}>
          {t.messageLabel} <span className="text-red-500">*</span>
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => patch({ message: e.target.value })}
            placeholder={t.messagePlaceholder}
            className={textareaClass}
            required
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-5 w-full rounded-md px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        style={{ background: 'var(--ink)' }}
      >
        {pending ? t.submitting : t.submit}
      </button>
    </form>
  )
}
