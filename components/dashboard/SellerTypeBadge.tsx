import { getSellerTypeBadgeClass } from '../../lib/seller-type'

export function SellerTypeBadge({ type, label }: { type: string; label: string }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${getSellerTypeBadgeClass(type)}`}
    >
      {label}
    </span>
  )
}
