export type PropertyPublic = {
  id: string
  ref_number: string
  purpose: 'sale' | 'rent'
  type_ar: string
  type_en: string
  type_slug: string
  governorate: string | null
  governorate_en: string | null
  area: string | null
  area_en: string | null
  city: string | null
  city_en: string | null
  size_sqm: number | null
  bedrooms: number | null
  bathrooms: number | null
  parking: number | null
  sale_price: number | null
  monthly_rent: number | null
  currency: string
  title_ar: string | null
  title_en: string | null
  description_ar: string | null
  description_en: string | null
  status: string
  is_featured: boolean
  agent_name: string | null
  agent_name_en: string | null
  agent_photo: string | null
  agent_phone: string | null
  agent_whatsapp: string | null
  agent_title: string | null
  seller_display_name: string | null
  views_count?: number | null
  furnished?: boolean | null
}

export type PropertyMedia = {
  id: string
  property_id: string
  url: string
  is_primary: boolean
  sort_order: number | null
}

export type Amenity = {
  id: string
  name_en: string
  name_ar: string
}
