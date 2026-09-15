'use client'

import Link from 'next/link'
import type { Dictionary } from '../../lib/i18n/dictionaries'

export function PropertyRowActions({
  id,
  status,
  labels,
  pending,
  onPublish,
  onHide,
  onDuplicate,
  onDeleteRequest,
}: {
  id: string
  status: string
  labels: Dictionary['dashboard']['properties']['actions']
  pending: boolean
  onPublish: () => void
  onHide: () => void
  onDuplicate: () => void
  onDeleteRequest: () => void
}) {
  const buttonClass =
    'rounded-md border border-stone px-2.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-brass hover:text-brass disabled:cursor-not-allowed disabled:opacity-50'

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <Link href={`/dashboard/properties/${id}/edit`} className={buttonClass}>
        {labels.edit}
      </Link>

      <a href={`/properties/${id}`} target="_blank" rel="noopener noreferrer" className={buttonClass}>
        {labels.preview}
      </a>

      <button type="button" onClick={onDuplicate} disabled={pending} className={buttonClass}>
        {labels.duplicate}
      </button>

      {status !== 'published' && status !== 'active' && (
        <button type="button" onClick={onPublish} disabled={pending} className={buttonClass}>
          {labels.publish}
        </button>
      )}

      {status !== 'hidden' && (
        <button type="button" onClick={onHide} disabled={pending} className={buttonClass}>
          {labels.hide}
        </button>
      )}

      <button
        type="button"
        onClick={onDeleteRequest}
        disabled={pending}
        className="rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {labels.delete}
      </button>
    </div>
  )
}
