import { BAHRAIN_GOVERNORATES, getAreasForGovernorate } from './bahrain-locations'
import type { ConditionOption, FurnishingOption, PaymentMethodOption, SellerType } from './property-wizard-options'
import type { StaffProperty } from './dashboard-properties'

export type NewSellerInput = {
  full_name: string
  phone: string
  whatsapp: string
  email: string
  type: SellerType
  internal_notes: string
}

export type MediaType = 'photo' | 'youtube' | 'virtual_tour' | 'tour_360'

/** `path` is the Storage object path (null for link-only rows like YouTube), used to delete the file on removal. */
export type MediaItem = {
  path: string | null
  url: string
  type: MediaType
  isPrimary: boolean
}

export type PropertyFormState = {
  purpose: 'sale' | 'rent' | null
  propertyTypeId: string | null
  sellerMode: 'existing' | 'new'
  sellerId: string
  newSeller: NewSellerInput
  showSellerOnWebsite: boolean
  agentId: string | null
  governorateKey: string
  areaKey: string
  projectName: string
  buildingName: string
  unitNumber: string
  floor: string
  address: string
  latitude: string
  longitude: string
  sizeSqm: string
  landAreaSqm: string
  bedrooms: string
  bathrooms: string
  parking: string
  floorsCount: string
  yearBuilt: string
  condition: ConditionOption | ''
  furnishing: FurnishingOption | ''
  salePrice: string
  priceNotes: string
  monthlyRent: string
  weeklyRent: string
  deposit: string
  commission: string
  utilitiesElectricity: boolean
  utilitiesWater: boolean
  utilitiesInternet: boolean
  paymentMethod: PaymentMethodOption | ''
  amenityIds: string[]
  media: MediaItem[]
  youtubeUrl: string
  tourUrl: string
  tourType: 'virtual_tour' | 'tour_360'
  titleAr: string
  descriptionAr: string
  titleEn: string
  descriptionEn: string
}

export function createEmptyPropertyForm(): PropertyFormState {
  return {
    purpose: null,
    propertyTypeId: null,
    sellerMode: 'existing',
    sellerId: '',
    newSeller: { full_name: '', phone: '', whatsapp: '', email: '', type: 'owner', internal_notes: '' },
    showSellerOnWebsite: false,
    agentId: null,
    governorateKey: '',
    areaKey: '',
    projectName: '',
    buildingName: '',
    unitNumber: '',
    floor: '',
    address: '',
    latitude: '',
    longitude: '',
    sizeSqm: '',
    landAreaSqm: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    floorsCount: '',
    yearBuilt: '',
    condition: '',
    furnishing: '',
    salePrice: '',
    priceNotes: '',
    monthlyRent: '',
    weeklyRent: '',
    deposit: '',
    commission: '',
    utilitiesElectricity: false,
    utilitiesWater: false,
    utilitiesInternet: false,
    paymentMethod: '',
    amenityIds: [],
    media: [],
    youtubeUrl: '',
    tourUrl: '',
    tourType: 'virtual_tour',
    titleAr: '',
    descriptionAr: '',
    titleEn: '',
    descriptionEn: '',
  }
}

const STORAGE_PUBLIC_PREFIX = '/storage/v1/object/public/properties/'

/** Recovers the Storage object path from a public URL, so pre-existing photos can still be deleted in edit mode. */
export function extractStoragePathFromUrl(url: string): string | null {
  const index = url.indexOf(STORAGE_PUBLIC_PREFIX)
  return index === -1 ? null : url.slice(index + STORAGE_PUBLIC_PREFIX.length)
}

function toNumber(value: string): number | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  const n = Number(trimmed)
  return Number.isFinite(n) ? n : null
}

/** Bahrain has no separate "city" entity in our data — the selected area doubles as the city. */
export function resolveBahrainLocation(governorateKey: string, areaKey: string) {
  const governorate = BAHRAIN_GOVERNORATES.find((g) => g.key === governorateKey) ?? null
  const area = governorate ? getAreasForGovernorate(governorate.key).find((a) => a.key === areaKey) ?? null : null

  return {
    governorate: governorate?.ar ?? null,
    governorate_en: governorate?.en ?? null,
    area: area?.ar ?? null,
    area_en: area?.en ?? null,
    city: area?.ar ?? null,
    city_en: area?.en ?? null,
  }
}

/** Reverses `resolveBahrainLocation` — matches stored EN labels back to governorate/area keys, for edit prefill. */
export function findBahrainLocationKeys(governorateEn: string | null, areaEn: string | null): { governorateKey: string; areaKey: string } {
  if (!governorateEn) return { governorateKey: '', areaKey: '' }
  const governorate = BAHRAIN_GOVERNORATES.find((g) => g.en.toLowerCase() === governorateEn.toLowerCase())
  if (!governorate) return { governorateKey: '', areaKey: '' }
  const area = areaEn ? governorate.areas.find((a) => a.en.toLowerCase() === areaEn.toLowerCase()) : undefined
  return { governorateKey: governorate.key, areaKey: area?.key ?? '' }
}

type PropertyPayloadStatus = 'draft' | 'pending_review' | 'published'

/**
 * Maps wizard state to a `properties` row payload for insert or update.
 * `ref_number` is never included — the DB trigger fills it on insert, and it must stay
 * unchanged on update. `published_at` is only ever set (never cleared) when publishing.
 */
export function buildPropertyPayload(
  form: PropertyFormState,
  status: PropertyPayloadStatus,
  sellerId: string | null,
  options: { createdBy?: string } = {}
) {
  const location = resolveBahrainLocation(form.governorateKey, form.areaKey)
  const isRent = form.purpose === 'rent'

  return {
    status,
    purpose: form.purpose,
    currency: 'BHD',
    ...(options.createdBy ? { created_by: options.createdBy } : {}),
    ...(status === 'published' ? { published_at: new Date().toISOString() } : {}),
    property_type_id: form.propertyTypeId,
    seller_id: sellerId,
    show_seller_on_website: form.showSellerOnWebsite,
    agent_id: form.agentId,
    ...location,
    project_name: form.projectName || null,
    building_name: form.buildingName || null,
    unit_number: form.unitNumber || null,
    floor: form.floor || null,
    address: form.address || null,
    latitude: toNumber(form.latitude),
    longitude: toNumber(form.longitude),
    size_sqm: toNumber(form.sizeSqm),
    land_area_sqm: toNumber(form.landAreaSqm),
    bedrooms: toNumber(form.bedrooms),
    bathrooms: toNumber(form.bathrooms),
    parking: toNumber(form.parking),
    floors_count: toNumber(form.floorsCount),
    year_built: toNumber(form.yearBuilt),
    condition: form.condition || null,
    furnishing: form.furnishing || null,
    sale_price: !isRent ? toNumber(form.salePrice) : null,
    price_notes: !isRent ? form.priceNotes || null : null,
    monthly_rent: isRent ? toNumber(form.monthlyRent) : null,
    weekly_rent: isRent ? toNumber(form.weeklyRent) : null,
    deposit: isRent ? toNumber(form.deposit) : null,
    commission: isRent ? toNumber(form.commission) : null,
    utilities_electricity: isRent ? form.utilitiesElectricity : null,
    utilities_water: isRent ? form.utilitiesWater : null,
    utilities_internet: isRent ? form.utilitiesInternet : null,
    payment_method: isRent ? form.paymentMethod || null : null,
    title_ar: form.titleAr || null,
    description_ar: form.descriptionAr || null,
    title_en: form.titleEn || null,
    description_en: form.descriptionEn || null,
  }
}

/** Builds `property_media` insert rows from the wizard's media list plus the optional video/tour link fields. */
export function buildMediaInsertRows(propertyId: string, form: PropertyFormState) {
  const rows = form.media.map((item, index) => ({
    property_id: propertyId,
    url: item.url,
    type: item.type,
    is_primary: item.isPrimary,
    sort_order: index,
  }))

  if (form.youtubeUrl.trim()) {
    rows.push({ property_id: propertyId, url: form.youtubeUrl.trim(), type: 'youtube', is_primary: false, sort_order: rows.length })
  }
  if (form.tourUrl.trim()) {
    rows.push({ property_id: propertyId, url: form.tourUrl.trim(), type: form.tourType, is_primary: false, sort_order: rows.length })
  }

  return rows
}

/** Builds a prefilled wizard state from an existing property row + its amenities/media, for edit mode. */
export function buildFormFromExistingProperty(
  property: StaffProperty,
  amenityIds: string[],
  media: { url: string; type: string; is_primary: boolean; sort_order: number | null }[]
): PropertyFormState {
  const base = createEmptyPropertyForm()
  const { governorateKey, areaKey } = findBahrainLocationKeys(
    (property.governorate_en as string | null) ?? null,
    (property.area_en as string | null) ?? null
  )

  const toStr = (value: unknown): string => (value === null || value === undefined ? '' : String(value))
  const sortedMedia = [...media].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))

  return {
    ...base,
    purpose: (property.purpose as 'sale' | 'rent') ?? null,
    propertyTypeId: (property.property_type_id as string | null) ?? null,
    sellerMode: 'existing',
    sellerId: (property.seller_id as string | null) ?? '',
    showSellerOnWebsite: Boolean(property.show_seller_on_website),
    agentId: property.agent_id ?? null,
    governorateKey,
    areaKey,
    projectName: toStr(property.project_name),
    buildingName: toStr(property.building_name),
    unitNumber: toStr(property.unit_number),
    floor: toStr(property.floor),
    address: toStr(property.address),
    latitude: toStr(property.latitude),
    longitude: toStr(property.longitude),
    sizeSqm: toStr(property.size_sqm),
    landAreaSqm: toStr(property.land_area_sqm),
    bedrooms: toStr(property.bedrooms),
    bathrooms: toStr(property.bathrooms),
    parking: toStr(property.parking),
    floorsCount: toStr(property.floors_count),
    yearBuilt: toStr(property.year_built),
    condition: (property.condition as PropertyFormState['condition']) ?? '',
    furnishing: (property.furnishing as PropertyFormState['furnishing']) ?? '',
    salePrice: toStr(property.sale_price),
    priceNotes: toStr(property.price_notes),
    monthlyRent: toStr(property.monthly_rent),
    weeklyRent: toStr(property.weekly_rent),
    deposit: toStr(property.deposit),
    commission: toStr(property.commission),
    utilitiesElectricity: Boolean(property.utilities_electricity),
    utilitiesWater: Boolean(property.utilities_water),
    utilitiesInternet: Boolean(property.utilities_internet),
    paymentMethod: (property.payment_method as PropertyFormState['paymentMethod']) ?? '',
    amenityIds,
    media: sortedMedia
      .filter((m) => m.type === 'photo')
      .map((m) => ({ path: extractStoragePathFromUrl(m.url), url: m.url, type: 'photo' as const, isPrimary: m.is_primary })),
    youtubeUrl: sortedMedia.find((m) => m.type === 'youtube')?.url ?? '',
    tourUrl: sortedMedia.find((m) => m.type === 'virtual_tour' || m.type === 'tour_360')?.url ?? '',
    tourType: (sortedMedia.find((m) => m.type === 'virtual_tour' || m.type === 'tour_360')?.type as 'virtual_tour' | 'tour_360') ?? 'virtual_tour',
    titleAr: toStr(property.title_ar),
    descriptionAr: toStr(property.description_ar),
    titleEn: toStr(property.title_en),
    descriptionEn: toStr(property.description_en),
  }
}
