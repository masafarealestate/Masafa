import { supabase } from './supabase'
import type { Amenity, PropertyPublic } from './types'
import type { PropertyWithImage } from '../components/PropertyCard'
import { BAHRAIN_GOVERNORATES, getAreasForGovernorate } from './bahrain-locations'
import { COMMERCIAL_TYPE_SLUGS, type PropertyFilters } from './property-filters'

async function attachPrimaryImages(properties: PropertyPublic[]): Promise<PropertyWithImage[]> {
  if (properties.length === 0) return []

  const ids = properties.map((p) => p.id)
  const { data: media } = await supabase
    .from('property_media')
    .select('property_id, url')
    .in('property_id', ids)
    .eq('is_primary', true)

  const imgMap = new Map((media ?? []).map((m) => [m.property_id, m.url]))
  return properties.map((p) => ({ ...p, image: imgMap.get(p.id) ?? null }))
}

export async function getProperties(options: { limit?: number } = {}): Promise<PropertyWithImage[]> {
  let query = supabase.from('properties_public').select('*').order('is_featured', { ascending: false })
  if (options.limit) query = query.limit(options.limit)

  const { data: properties, error } = await query

  if (error) {
    console.error('error:', error.message)
    return []
  }

  return attachPrimaryImages((properties ?? []) as PropertyPublic[])
}

/** Builds the `sale_price`/`monthly_rent` OR-with-bounds clause used when purpose isn't known. */
function priceOrExpression(min: number | null, max: number | null): string {
  const boundsFor = (column: string) => {
    const parts: string[] = []
    if (min != null) parts.push(`${column}.gte.${min}`)
    if (max != null) parts.push(`${column}.lte.${max}`)
    return parts.length > 1 ? `and(${parts.join(',')})` : parts[0]
  }
  return `${boundsFor('sale_price')},${boundsFor('monthly_rent')}`
}

function buildFilteredQuery(filters: PropertyFilters, matchingAmenityIds: string[] | null, includeFurnished: boolean) {
  let query = supabase.from('properties_public').select('*').order('is_featured', { ascending: false })

  if (filters.purpose === 'sale' || filters.purpose === 'rent') {
    query = query.eq('purpose', filters.purpose)
  } else if (filters.purpose === 'commercial') {
    query = query.in('type_slug', COMMERCIAL_TYPE_SLUGS)
  }

  if (filters.type) query = query.eq('type_slug', filters.type)

  if (filters.governorate) {
    const gov = BAHRAIN_GOVERNORATES.find((g) => g.key === filters.governorate)
    if (gov) query = query.or(`governorate.eq.${gov.ar},governorate_en.eq.${gov.en}`)
  }

  if (filters.area) {
    const area = getAreasForGovernorate('').find((a) => a.key === filters.area)
    if (area) query = query.or(`area.eq.${area.ar},area_en.eq.${area.en}`)
  }

  if (filters.purpose === 'sale') {
    if (filters.minPrice != null) query = query.gte('sale_price', filters.minPrice)
    if (filters.maxPrice != null) query = query.lte('sale_price', filters.maxPrice)
  } else if (filters.purpose === 'rent') {
    if (filters.minPrice != null) query = query.gte('monthly_rent', filters.minPrice)
    if (filters.maxPrice != null) query = query.lte('monthly_rent', filters.maxPrice)
  } else if (filters.minPrice != null || filters.maxPrice != null) {
    query = query.or(priceOrExpression(filters.minPrice, filters.maxPrice))
  }

  if (filters.beds != null) query = query.gte('bedrooms', filters.beds)
  if (filters.baths != null) query = query.gte('bathrooms', filters.baths)

  if (includeFurnished && filters.furnished) {
    query = query.eq('furnished', filters.furnished === 'furnished')
  }

  if (matchingAmenityIds) query = query.in('id', matchingAmenityIds)

  return query
}

export async function getFilteredProperties(filters: PropertyFilters): Promise<PropertyWithImage[]> {
  let matchingAmenityIds: string[] | null = null

  if (filters.amenities.length > 0) {
    const { data: rows, error } = await supabase
      .from('property_amenities')
      .select('property_id, amenity_id')
      .in('amenity_id', filters.amenities)

    if (error) {
      console.error('error:', error.message)
      return []
    }

    const counts = new Map<string, number>()
    for (const row of rows ?? []) {
      counts.set(row.property_id, (counts.get(row.property_id) ?? 0) + 1)
    }
    matchingAmenityIds = [...counts.entries()]
      .filter(([, count]) => count === filters.amenities.length)
      .map(([propertyId]) => propertyId)

    if (matchingAmenityIds.length === 0) return []
  }

  let { data: properties, error } = await buildFilteredQuery(filters, matchingAmenityIds, true)

  // The `furnished` column may not exist on every deployment of this view — retry once
  // without that filter rather than failing the whole search.
  if (error && filters.furnished) {
    console.error('error (retrying without furnished filter):', error.message)
    ;({ data: properties, error } = await buildFilteredQuery(filters, matchingAmenityIds, false))
  }

  if (error) {
    console.error('error:', error.message)
    return []
  }

  return attachPrimaryImages((properties ?? []) as PropertyPublic[])
}

export async function getAllAmenities(): Promise<Amenity[]> {
  const { data, error } = await supabase.from('amenities').select('id, name_en, name_ar').order('name_en')

  if (error) {
    console.error('error:', error.message)
    return []
  }

  return data ?? []
}

type AmenityJoinRow = { amenities: Amenity | Amenity[] | null }

function flattenAmenities(rows: AmenityJoinRow[] | null): Amenity[] {
  const result: Amenity[] = []
  for (const row of rows ?? []) {
    if (!row.amenities) continue
    if (Array.isArray(row.amenities)) result.push(...row.amenities)
    else result.push(row.amenities)
  }
  return result
}

export async function getPropertyById(id: string): Promise<{
  property: PropertyPublic | null
  images: string[]
  amenities: Amenity[]
}> {
  const { data: property, error } = await supabase.from('properties_public').select('*').eq('id', id).maybeSingle()

  if (error) {
    console.error('error:', error.message)
    return { property: null, images: [], amenities: [] }
  }
  if (!property) {
    return { property: null, images: [], amenities: [] }
  }

  const [{ data: media, error: mediaError }, { data: amenityRows, error: amenityError }] = await Promise.all([
    supabase
      .from('property_media')
      .select('url')
      .eq('property_id', id)
      .order('is_primary', { ascending: false })
      .order('sort_order', { ascending: true }),
    supabase.from('property_amenities').select('amenities(id, name_en, name_ar)').eq('property_id', id),
  ])

  if (mediaError) console.error('error:', mediaError.message)
  if (amenityError) console.error('error:', amenityError.message)

  const images = (media ?? []).map((m) => m.url).filter((url): url is string => Boolean(url))

  return {
    property: property as PropertyPublic,
    images,
    amenities: flattenAmenities(amenityRows as AmenityJoinRow[] | null),
  }
}
