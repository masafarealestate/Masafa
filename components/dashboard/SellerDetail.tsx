'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useLanguage } from '../../lib/i18n/LanguageProvider'
import { formatStaffPropertyPrice, getStaffPropertyTitle, type StaffProperty } from '../../lib/dashboard-properties'
import type { StaffSeller } from '../../lib/dashboard-sellers'
import { deleteSeller } from '../../app/dashboard/sellers/actions'
import { ConfirmModal } from './ConfirmModal'
import { SellerTypeBadge } from './SellerTypeBadge'
import { StatusBadge } from './StatusBadge'

export function SellerDetail({ seller, properties }: { seller: StaffSeller; properties: StaffProperty[] }) {
  const { lang, dict } = useLanguage()
  const router = useRouter()
  const t = dict.dashboard.sellers
  const pt = dict.dashboard.properties
  const [pending, startTransition] = useTransition()
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const currencyLabel = dict.properties.currency

  function handleDelete() {
    setConfirmingDelete(false)
    startTransition(() => {
      deleteSeller(seller.id).then((result) => {
        if (result.error) {
          setError(t.feedback.deleteError)
        } else {
          router.push('/dashboard/sellers')
        }
      })
    })
  }

  const propertyLinkClass = 'font-medium text-ink hover:text-brass'

  return (
    <div>
      <Link href="/dashboard/sellers" className="text-sm font-semibold text-brass hover:opacity-80">
        {t.detail.backLink}
      </Link>

      {error && (
        <div role="status" className="mt-4 rounded-md border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-4 flex flex-col gap-4 rounded-lg border border-stone bg-surface p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-bold text-ink">{seller.full_name}</h1>
            <SellerTypeBadge type={seller.type} label={t.typeLabels[seller.type]} />
          </div>

          <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
            <div>
              <dt className="inline text-muted">{t.table.phone}: </dt>
              <dd className="inline text-ink">{seller.phone || '—'}</dd>
            </div>
            <div>
              <dt className="inline text-muted">{t.table.whatsapp}: </dt>
              <dd className="inline text-ink">{seller.whatsapp || '—'}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="inline text-muted">{t.table.email}: </dt>
              <dd className="inline text-ink">{seller.email || '—'}</dd>
            </div>
          </dl>

          {seller.internal_notes && (
            <div className="mt-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">{t.detail.notesHeading}</div>
              <p className="mt-1 whitespace-pre-line text-sm text-ink">{seller.internal_notes}</p>
            </div>
          )}
        </div>

        <div className="flex shrink-0 gap-2">
          <Link
            href={`/dashboard/sellers/${seller.id}/edit`}
            className="rounded-md border border-stone px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
          >
            {t.detail.editButton}
          </Link>
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            disabled={pending}
            className="rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t.detail.deleteButton}
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold text-ink">{t.detail.propertiesHeading(properties.length)}</h2>

        {properties.length === 0 ? (
          <div className="mt-3 rounded-lg border border-stone bg-surface p-10 text-center text-sm text-muted">{t.detail.propertiesEmpty}</div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="mt-3 hidden overflow-x-auto rounded-lg border border-stone bg-surface md:block">
              <table className="w-full min-w-[700px] text-start text-sm">
                <thead>
                  <tr className="border-b border-stone text-start text-xs font-semibold uppercase tracking-wide text-muted">
                    <th className="px-4 py-3 text-start">{pt.table.title}</th>
                    <th className="px-3 py-3 text-start">{pt.table.ref}</th>
                    <th className="px-3 py-3 text-start">{pt.table.purpose}</th>
                    <th className="px-3 py-3 text-start">{pt.table.price}</th>
                    <th className="px-3 py-3 text-start">{pt.table.status}</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((p) => (
                    <tr key={p.id} className="border-b border-stone last:border-0">
                      <td className="px-4 py-3">
                        <Link href={`/dashboard/properties/${p.id}/edit`} className={propertyLinkClass}>
                          {getStaffPropertyTitle(p, lang)}
                        </Link>
                      </td>
                      <td className="px-3 py-3 text-muted">{p.ref_number}</td>
                      <td className="px-3 py-3 text-ink">{p.purpose === 'rent' ? dict.properties.forRent : dict.properties.forSale}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-ink">{formatStaffPropertyPrice(p, lang, currencyLabel)}</td>
                      <td className="px-3 py-3">
                        <StatusBadge status={p.status} label={pt.statusLabels[p.status as keyof typeof pt.statusLabels] ?? p.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="mt-3 flex flex-col gap-3 md:hidden">
              {properties.map((p) => (
                <Link key={p.id} href={`/dashboard/properties/${p.id}/edit`} className="block rounded-lg border border-stone bg-surface p-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-ink">{getStaffPropertyTitle(p, lang)}</span>
                    <StatusBadge status={p.status} label={pt.statusLabels[p.status as keyof typeof pt.statusLabels] ?? p.status} />
                  </div>
                  <div className="mt-1 text-xs text-muted">{p.ref_number}</div>
                  <div className="mt-1 text-sm text-ink">
                    {p.purpose === 'rent' ? dict.properties.forRent : dict.properties.forSale} · {formatStaffPropertyPrice(p, lang, currencyLabel)}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      {confirmingDelete && (
        <ConfirmModal
          title={t.confirmDelete.title}
          body={properties.length > 0 ? t.confirmDelete.bodyWithProperties(properties.length) : t.confirmDelete.bodySafe}
          confirmLabel={t.confirmDelete.confirm}
          cancelLabel={t.confirmDelete.cancel}
          pending={pending}
          onConfirm={handleDelete}
          onCancel={() => setConfirmingDelete(false)}
        />
      )}
    </div>
  )
}
