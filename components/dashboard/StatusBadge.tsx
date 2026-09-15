import { getStatusBadgeClass } from '../../lib/property-status'

export function StatusBadge({ status, label }: { status: string; label: string }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusBadgeClass(status)}`}
    >
      {label}
    </span>
  )
}
