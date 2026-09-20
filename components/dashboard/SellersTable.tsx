'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState, useTransition } from 'react'
import { useLanguage } from '../../lib/i18n/LanguageProvider'
import { SELLER_TYPES } from '../../lib/property-wizard-options'
import type { StaffSellerRow } from '../../lib/dashboard-sellers'
import { deleteSeller } from '../../app/dashboard/sellers/actions'
import { ConfirmModal } from './ConfirmModal'
import { SellerTypeBadge } from './SellerTypeBadge'

export function SellersTable({ sellers }: { sellers: StaffSellerRow[] }) {
  const { dict } = useLanguage()
  const router = useRouter()
  const t = dict.dashboard.sellers
  const [, startTransition] = useTransition()

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<StaffSellerRow | null>(null)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return sellers.filter((s) => {
      if (typeFilter !== 'all' && s.type !== typeFilter) return false
      if (!query) return true
      return (
        s.full_name.toLowerCase().includes(query) ||
        (s.phone ?? '').toLowerCase().includes(query) ||
        (s.whatsapp ?? '').toLowerCase().includes(query)
      )
    })
  }, [sellers, typeFilter, search])

  const tabs = [
    { key: 'all', label: t.filterAll, count: sellers.length },
    ...SELLER_TYPES.map((type) => ({
      key: type,
      label: t.typeLabels[type],
      count: sellers.filter((s) => s.type === type).length,
    })),
  ]

  function confirmDelete() {
    if (!deleteTarget) return
    const id = deleteTarget.id
    setDeleteTarget(null)
    setPendingId(id)
    startTransition(() => {
      deleteSeller(id)
        .then(({ error }) => {
          setFeedback(error ? { type: 'error', text: t.feedback.deleteError } : { type: 'success', text: t.feedback.deleteSuccess })
          if (!error) router.refresh()
        })
        .finally(() => setPendingId(null))
    })
  }

  const inputClass =
    'h-11 w-full rounded-md border border-stone bg-surface px-3 text-sm text-ink placeholder:text-muted transition-colors hover:border-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)] sm:w-72'

  const rowActionClass =
    'rounded-md border border-stone px-2.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-brass hover:text-brass'

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">{t.heading}</h1>
          <p className="mt-1 text-sm text-muted">{t.subheading}</p>
        </div>
        <Link
          href="/dashboard/sellers/new"
          className="inline-flex w-fit items-center justify-center rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          {t.addButton}
        </Link>
      </div>

      {feedback && (
        <div
          role="status"
          className={`mt-4 flex items-center justify-between gap-4 rounded-md border px-3.5 py-2.5 text-sm ${
            feedback.type === 'success'
              ? 'border-green-200 bg-green-50 text-green-700'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          <span>{feedback.text}</span>
          <button type="button" onClick={() => setFeedback(null)} aria-label="Dismiss" className="shrink-0 opacity-70 hover:opacity-100">
            ✕
          </button>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.searchPlaceholder}
          className={inputClass}
        />
        <p className="text-sm text-muted">{t.resultCount(filtered.length)}</p>
      </div>

      <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setTypeFilter(tab.key)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              typeFilter === tab.key
                ? 'border-ink bg-ink text-white'
                : 'border-stone bg-surface text-muted hover:border-brass hover:text-brass'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-2 rounded-lg border border-stone bg-surface p-16 text-center text-muted">
          <span>{t.empty}</span>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="mt-6 hidden overflow-x-auto rounded-lg border border-stone bg-surface md:block">
            <table className="w-full min-w-[900px] text-start text-sm">
              <thead>
                <tr className="border-b border-stone text-start text-xs font-semibold uppercase tracking-wide text-muted">
                  <th className="px-4 py-3 text-start">{t.table.name}</th>
                  <th className="px-3 py-3 text-start">{t.table.type}</th>
                  <th className="px-3 py-3 text-start">{t.table.phone}</th>
                  <th className="px-3 py-3 text-start">{t.table.whatsapp}</th>
                  <th className="px-3 py-3 text-start">{t.table.email}</th>
                  <th className="px-3 py-3 text-start">{t.table.properties}</th>
                  <th className="px-4 py-3 text-start">{t.table.actions}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b border-stone last:border-0">
                    <td className="px-4 py-3">
                      <Link href={`/dashboard/sellers/${s.id}`} className="font-medium text-ink hover:text-brass">
                        {s.full_name}
                      </Link>
                    </td>
                    <td className="px-3 py-3">
                      <SellerTypeBadge type={s.type} label={t.typeLabels[s.type]} />
                    </td>
                    <td className="px-3 py-3 text-ink">{s.phone || '—'}</td>
                    <td className="px-3 py-3 text-ink">{s.whatsapp || '—'}</td>
                    <td className="px-3 py-3 text-ink">{s.email || '—'}</td>
                    <td className="px-3 py-3 text-ink">{s.propertyCount}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Link href={`/dashboard/sellers/${s.id}`} className={rowActionClass}>
                          {t.actions.view}
                        </Link>
                        <Link href={`/dashboard/sellers/${s.id}/edit`} className={rowActionClass}>
                          {t.actions.edit}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(s)}
                          disabled={pendingId === s.id}
                          className="rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {t.actions.delete}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="mt-6 flex flex-col gap-4 md:hidden">
            {filtered.map((s) => (
              <div key={s.id} className="rounded-lg border border-stone bg-surface p-4">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/dashboard/sellers/${s.id}`} className="font-semibold text-ink hover:text-brass">
                    {s.full_name}
                  </Link>
                  <SellerTypeBadge type={s.type} label={t.typeLabels[s.type]} />
                </div>

                <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-muted">
                  <div>
                    <dt className="inline">{t.table.phone}: </dt>
                    <dd className="inline text-ink">{s.phone || '—'}</dd>
                  </div>
                  <div>
                    <dt className="inline">{t.table.whatsapp}: </dt>
                    <dd className="inline text-ink">{s.whatsapp || '—'}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="inline">{t.table.email}: </dt>
                    <dd className="inline text-ink">{s.email || '—'}</dd>
                  </div>
                  <div>
                    <dt className="inline">{t.table.properties}: </dt>
                    <dd className="inline text-ink">{s.propertyCount}</dd>
                  </div>
                </dl>

                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <Link href={`/dashboard/sellers/${s.id}`} className={rowActionClass}>
                    {t.actions.view}
                  </Link>
                  <Link href={`/dashboard/sellers/${s.id}/edit`} className={rowActionClass}>
                    {t.actions.edit}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(s)}
                    disabled={pendingId === s.id}
                    className="rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {t.actions.delete}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {deleteTarget && (
        <ConfirmModal
          title={t.confirmDelete.title}
          body={deleteTarget.propertyCount > 0 ? t.confirmDelete.bodyWithProperties(deleteTarget.propertyCount) : t.confirmDelete.bodySafe}
          confirmLabel={t.confirmDelete.confirm}
          cancelLabel={t.confirmDelete.cancel}
          pending={pendingId === deleteTarget.id}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}
