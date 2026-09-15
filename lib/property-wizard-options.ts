export const SELLER_TYPES = ['owner', 'company', 'developer', 'broker'] as const
export type SellerType = (typeof SELLER_TYPES)[number]

export const FURNISHING_OPTIONS = ['furnished', 'unfurnished', 'semi_furnished'] as const
export type FurnishingOption = (typeof FURNISHING_OPTIONS)[number]

export const CONDITION_OPTIONS = ['new', 'excellent', 'good', 'needs_renovation'] as const
export type ConditionOption = (typeof CONDITION_OPTIONS)[number]

export const PAYMENT_METHOD_OPTIONS = ['cash', 'cheque', 'bank_transfer'] as const
export type PaymentMethodOption = (typeof PAYMENT_METHOD_OPTIONS)[number]
