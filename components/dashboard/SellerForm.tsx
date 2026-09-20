'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useLanguage } from '../../lib/i18n/LanguageProvider'
import type { StaffSeller } from '../../lib/dashboard-sellers'
import { createSeller, updateSeller, type SellerFormInput } from '../../app/dashboard/sellers/actions'
import { SellerFormFields } from './SellerFormFields'

export function SellerForm({ seller }: { seller?: StaffSeller }) {
  const { dict } = useLanguage()
  const t = dict.dashboard.sellers.form
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState<SellerFormInput>({
    full_name: seller?.full_name ?? '',
    phone: seller?.phone ?? '',
    whatsapp: seller?.whatsapp ?? '',
    email: seller?.email ?? '',
    type: seller?.type ?? 'owner',
    internal_notes: seller?.internal_notes ?? '',
  })
  // For a new seller, default to synced (the common case). When editing, infer it from the existing data.
  const [sameAsPhone, setSameAsPhone] = useState(() => (seller ? (seller.phone ?? '') === (seller.whatsapp ?? '') : true))

  function patch(next: Partial<SellerFormInput>) {
    setForm((f) => ({ ...f, ...next }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.full_name.trim()) {
      setError(t.errors.nameRequired)
      return
    }
    if (!form.phone.trim()) {
      setError(t.errors.phoneRequired)
      return
    }
    if (!form.whatsapp.trim()) {
      setError(t.errors.whatsappRequired)
      return
    }
    setError(null)
    startTransition(() => {
      const action = seller ? updateSeller(seller.id, form) : createSeller(form)
      action.then((result) => {
        if (result.error === 'validation') {
          setError(t.errors.nameRequired)
        } else if (result.error) {
          setError(t.errors.saveFailed)
        } else {
          router.push(`/dashboard/sellers/${seller ? seller.id : result.id}`)
        }
      })
    })
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-ink">{seller ? t.editHeading : t.addHeading}</h1>
      <p className="mt-1 text-sm text-muted">{t.subheading}</p>

      <form onSubmit={handleSubmit} className="mt-6 rounded-lg border border-stone bg-surface p-5">
        {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">{error}</div>}

        <SellerFormFields value={form} onChange={patch} sameAsPhone={sameAsPhone} onSameAsPhoneChange={setSameAsPhone} labels={t} />

        <div className="mt-6 flex items-center justify-end gap-3">
          <Link
            href={seller ? `/dashboard/sellers/${seller.id}` : '/dashboard/sellers'}
            className="rounded-md border border-stone px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
          >
            {t.cancel}
          </Link>
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-ink px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? t.saving : t.save}
          </button>
        </div>
      </form>
    </div>
  )
}
