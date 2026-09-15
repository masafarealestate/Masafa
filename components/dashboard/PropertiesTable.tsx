'use client'

import { useRouter } from 'next/navigation'
import { useMemo, useState, useTransition } from 'react'
import { PropertyImage } from '../PropertyImage'
import { useLanguage } from '../../lib/i18n/LanguageProvider'
import {
  formatStaffPropertyPrice,
  getStaffAgentName,
  getStaffPropertyArea,
  getStaffPropertyTitle,
  getStaffSellerName,
  type StaffPropertyRow,
} from '../../lib/dashboard-properties'
import { PROPERTY_STATUSES } from '../../lib/property-status'
import { deleteProperty, duplicateProperty, hideProperty, publishProperty } from '../../app/dashboard/properties/actions'
import { ConfirmModal } from './ConfirmModal'
import { PropertyRowActions } from './PropertyRowActions'
import { StatusBadge } from './StatusBadge'

function formatDate(value: string | null, lang: 'en' | 'ar'): string {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-BH' : 'en-BH', { dateStyle: 'medium' }).format(date)
}

export function PropertiesTable({ properties }: { properties: StaffPropertyRow[] }) {
  const { lang, dict } = useLanguage()
  const router = useRouter()
  const t = dict.dashboard.properties
  const [, startTransition] = useTransition()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<StaffPropertyRow | null>(null)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return properties.filter((p) => {
      if (statusFilter !== 'all' && p.status !== statusFilter) return false
      if (!query) return true
      const title = getStaffPropertyTitle(p, lang).toLowerCase()
      return title.includes(query) || p.ref_number.toLowerCase().includes(query)
    })
  }, [properties, statusFilter, search, lang])

  const tabs = [
    { key: 'all', label: t.filterAll, count: properties.length },
    ...PROPERTY_STATUSES.map((status) => ({
      key: status,
      label: t.statusLabels[status],
      count: properties.filter((p) => p.status === status).length,
    })),
  ]

  function runAction(id: string, action: () => Promise<{ error: string | null }>, successText: string, errorText: string) {
    setPendingId(id)
    startTransition(() => {
      action()
        .then(({ error }) => {
          setFeedback(error ? { type: 'error', text: errorText } : { type: 'success', text: successText })
          if (!error) router.refresh()
        })
        .finally(() => setPendingId(null))
    })
  }

  function handlePublish(id: string) {
    runAction(id, () => publishProperty(id), t.feedback.publishSuccess, t.feedback.updateError)
  }

  function handleHide(id: string) {
    runAction(id, () => hideProperty(id), t.feedback.hideSuccess, t.feedback.updateError)
  }

  function handleDuplicate(id: string) {
    runAction(id, () => duplicateProperty(id), t.feedback.duplicateSuccess, t.feedback.duplicateError)
  }

  function confirmDelete() {
    if (!deleteTarget) return
    const id = deleteTarget.id
    setDeleteTarget(null)
    runAction(id, () => deleteProperty(id), t.feedback.deleteSuccess, t.feedback.deleteError)
  }

  const currencyLabel = dict.properties.currency
  const inputClass =
    'h-11 w-full rounded-md border border-stone bg-surface px-3 text-sm text-ink placeholder:text-muted transition-colors hover:border-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)] sm:w-72'

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">{t.heading}</h1>
      <p className="mt-1 text-sm text-muted">{t.subheading}</p>

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
            onClick={() => setStatusFilter(tab.key)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              statusFilter === tab.key
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
            <table className="w-full min-w-[1100px] text-start text-sm">
              <thead>
                <tr className="border-b border-stone text-start text-xs font-semibold uppercase tracking-wide text-muted">
                  <th className="px-4 py-3 text-start">{t.table.title}</th>
                  <th className="px-3 py-3 text-start">{t.table.ref}</th>
                  <th className="px-3 py-3 text-start">{t.table.purpose}</th>
                  <th className="px-3 py-3 text-start">{t.table.price}</th>
                  <th className="px-3 py-3 text-start">{t.table.area}</th>
                  <th className="px-3 py-3 text-start">{t.table.seller}</th>
                  <th className="px-3 py-3 text-start">{t.table.agent}</th>
                  <th className="px-3 py-3 text-start">{t.table.status}</th>
                  <th className="px-3 py-3 text-start">{t.table.views}</th>
                  <th className="px-3 py-3 text-start">{t.table.created}</th>
                  <th className="px-4 py-3 text-start">{t.table.actions}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const title = getStaffPropertyTitle(p, lang)
                  return (
                    <tr key={p.id} className="border-b border-stone last:border-0">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <PropertyImage
                            src={p.image}
                            alt={title}
                            className="h-12 w-16 shrink-0 rounded-md object-cover"
                          />
                          <span className="max-w-[180px] truncate font-medium text-ink">{title}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-muted">{p.ref_number}</td>
                      <td className="px-3 py-3 text-ink">{p.purpose === 'rent' ? dict.properties.forRent : dict.properties.forSale}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-ink">{formatStaffPropertyPrice(p, lang, currencyLabel)}</td>
                      <td className="px-3 py-3 text-ink">{getStaffPropertyArea(p, lang) ?? '—'}</td>
                      <td className="px-3 py-3 text-ink">{getStaffSellerName(p) ?? '—'}</td>
                      <td className="px-3 py-3 text-ink">{getStaffAgentName(p, lang) ?? '—'}</td>
                      <td className="px-3 py-3">
                        <StatusBadge status={p.status} label={t.statusLabels[p.status as keyof typeof t.statusLabels] ?? p.status} />
                      </td>
                      <td className="px-3 py-3 text-ink">{p.views_count ?? 0}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-muted">{formatDate(p.created_at, lang)}</td>
                      <td className="px-4 py-3">
                        <PropertyRowActions
                          id={p.id}
                          status={p.status}
                          labels={t.actions}
                          pending={pendingId === p.id}
                          onPublish={() => handlePublish(p.id)}
                          onHide={() => handleHide(p.id)}
                          onDuplicate={() => handleDuplicate(p.id)}
                          onDeleteRequest={() => setDeleteTarget(p)}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="mt-6 flex flex-col gap-4 md:hidden">
            {filtered.map((p) => {
              const title = getStaffPropertyTitle(p, lang)
              return (
                <div key={p.id} className="rounded-lg border border-stone bg-surface p-4">
                  <div className="flex gap-3">
                    <PropertyImage src={p.image} alt={title} className="h-16 w-20 shrink-0 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <span className="truncate font-semibold text-ink">{title}</span>
                        <StatusBadge status={p.status} label={t.statusLabels[p.status as keyof typeof t.statusLabels] ?? p.status} />
                      </div>
                      <div className="mt-1 text-xs text-muted">{p.ref_number}</div>
                      <div className="mt-1 text-sm font-medium text-ink">{formatStaffPropertyPrice(p, lang, currencyLabel)}</div>
                    </div>
                  </div>

                  <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-muted">
                    <div>
                      <dt className="inline">{t.table.purpose}: </dt>
                      <dd className="inline text-ink">{p.purpose === 'rent' ? dict.properties.forRent : dict.properties.forSale}</dd>
                    </div>
                    <div>
                      <dt className="inline">{t.table.area}: </dt>
                      <dd className="inline text-ink">{getStaffPropertyArea(p, lang) ?? '—'}</dd>
                    </div>
                    <div>
                      <dt className="inline">{t.table.seller}: </dt>
                      <dd className="inline text-ink">{getStaffSellerName(p) ?? '—'}</dd>
                    </div>
                    <div>
                      <dt className="inline">{t.table.agent}: </dt>
                      <dd className="inline text-ink">{getStaffAgentName(p, lang) ?? '—'}</dd>
                    </div>
                    <div>
                      <dt className="inline">{t.table.views}: </dt>
                      <dd className="inline text-ink">{p.views_count ?? 0}</dd>
                    </div>
                    <div>
                      <dt className="inline">{t.table.created}: </dt>
                      <dd className="inline text-ink">{formatDate(p.created_at, lang)}</dd>
                    </div>
                  </dl>

                  <div className="mt-3">
                    <PropertyRowActions
                      id={p.id}
                      status={p.status}
                      labels={t.actions}
                      pending={pendingId === p.id}
                      onPublish={() => handlePublish(p.id)}
                      onHide={() => handleHide(p.id)}
                      onDuplicate={() => handleDuplicate(p.id)}
                      onDeleteRequest={() => setDeleteTarget(p)}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {deleteTarget && (
        <ConfirmModal
          title={t.confirmDelete.title}
          body={t.confirmDelete.body}
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
