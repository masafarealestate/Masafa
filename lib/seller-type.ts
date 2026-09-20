import { SELLER_TYPES, type SellerType } from './property-wizard-options'

const SELLER_TYPE_BADGE_CLASS: Record<SellerType, string> = {
  owner: 'bg-blue-50 text-blue-700 border-blue-200',
  company: 'bg-purple-50 text-purple-700 border-purple-200',
  developer: 'bg-brass/15 text-brass border-brass/30',
  broker: 'bg-green-50 text-green-700 border-green-200',
}

export function getSellerTypeBadgeClass(type: string): string {
  return (SELLER_TYPES as readonly string[]).includes(type)
    ? SELLER_TYPE_BADGE_CLASS[type as SellerType]
    : 'bg-stone text-muted border-stone'
}
