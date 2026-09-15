import { resolveBahrainLocation, type PropertyFormState } from './property-wizard'
import type { PropertyPublic } from './types'

export type PreviewPropertyType = { id: string; slug: string; name_en: string; name_ar: string }
export type PreviewAgent = {
  id: string
  full_name: string
  full_name_en: string
  phone?: string | null
  whatsapp?: string | null
  photo_url?: string | null
  job_title?: string | null
}
export type PreviewSeller = { id: string; full_name: string }

/** Adapts wizard state into a `PropertyPublic` shape so Step 11 can reuse the real public detail-page components. */
export function buildPreviewProperty(
  form: PropertyFormState,
  propertyTypes: PreviewPropertyType[],
  agents: PreviewAgent[],
  sellers: PreviewSeller[]
): PropertyPublic {
  const type = propertyTypes.find((p) => p.id === form.propertyTypeId)
  const agent = agents.find((a) => a.id === form.agentId)
  const existingSeller = form.sellerMode === 'existing' ? sellers.find((s) => s.id === form.sellerId) : undefined
  const sellerName = form.sellerMode === 'new' ? form.newSeller.full_name || null : existingSeller?.full_name ?? null
  const location = resolveBahrainLocation(form.governorateKey, form.areaKey)

  return {
    id: 'preview',
    ref_number: 'PREVIEW',
    purpose: form.purpose ?? 'sale',
    type_ar: type?.name_ar ?? '',
    type_en: type?.name_en ?? '',
    type_slug: type?.slug ?? '',
    governorate: location.governorate,
    governorate_en: location.governorate_en,
    area: location.area,
    area_en: location.area_en,
    city: location.city,
    city_en: location.city_en,
    size_sqm: form.sizeSqm ? Number(form.sizeSqm) : null,
    bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
    bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
    parking: form.parking ? Number(form.parking) : null,
    sale_price: form.purpose !== 'rent' && form.salePrice ? Number(form.salePrice) : null,
    monthly_rent: form.purpose === 'rent' && form.monthlyRent ? Number(form.monthlyRent) : null,
    currency: 'BHD',
    title_ar: form.titleAr || null,
    title_en: form.titleEn || null,
    description_ar: form.descriptionAr || null,
    description_en: form.descriptionEn || null,
    status: 'draft',
    is_featured: false,
    agent_name: agent?.full_name ?? null,
    agent_name_en: agent?.full_name_en ?? null,
    agent_photo: agent?.photo_url ?? null,
    agent_phone: agent?.phone ?? null,
    agent_whatsapp: agent?.whatsapp ?? null,
    agent_title: agent?.job_title ?? null,
    seller_display_name: form.showSellerOnWebsite ? sellerName : null,
    views_count: 0,
    furnished: form.furnishing === 'furnished',
  }
}

/** Photo URLs in public-detail-page order: primary first, then the rest in their saved order. */
export function getPreviewImages(form: PropertyFormState): string[] {
  const photos = form.media.filter((m) => m.type === 'photo')
  const primary = photos.find((p) => p.isPrimary)
  const rest = photos.filter((p) => p !== primary)
  return [primary, ...rest].filter((p): p is NonNullable<typeof p> => Boolean(p)).map((p) => p.url)
}
