export const PROPERTY_STATUSES = [
  'draft',
  'pending_review',
  'published',
  'active',
  'reserved',
  'sold',
  'rented',
  'expired',
  'hidden',
  'rejected',
] as const

export type PropertyStatus = (typeof PROPERTY_STATUSES)[number]

const STATUS_BADGE_CLASS: Record<PropertyStatus, string> = {
  draft: 'bg-gray-100 text-gray-600 border-gray-200',
  pending_review: 'bg-amber-50 text-amber-700 border-amber-200',
  published: 'bg-green-50 text-green-700 border-green-200',
  active: 'bg-green-50 text-green-700 border-green-200',
  reserved: 'bg-amber-50 text-amber-700 border-amber-200',
  sold: 'bg-brass/15 text-brass border-brass/30',
  rented: 'bg-brass/15 text-brass border-brass/30',
  expired: 'bg-stone text-muted border-stone',
  hidden: 'bg-stone text-muted border-stone',
  rejected: 'bg-red-50 text-red-700 border-red-200',
}

export function isPropertyStatus(value: string): value is PropertyStatus {
  return (PROPERTY_STATUSES as readonly string[]).includes(value)
}

export function getStatusBadgeClass(status: string): string {
  return isPropertyStatus(status) ? STATUS_BADGE_CLASS[status] : 'bg-stone text-muted border-stone'
}
