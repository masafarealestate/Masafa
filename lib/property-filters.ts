export type Purpose = 'sale' | 'rent' | 'commercial'
export type FurnishedState = 'furnished' | 'unfurnished'

export type PropertyFilters = {
  purpose: Purpose | null
  governorate: string | null
  area: string | null
  type: string | null
  minPrice: number | null
  maxPrice: number | null
  beds: number | null
  baths: number | null
  furnished: FurnishedState | null
  amenities: string[]
}

/** type_slug values grouped under the "Commercial" purpose category. */
export const COMMERCIAL_TYPE_SLUGS = ['office', 'shop', 'warehouse', 'commercial', 'building']

export type RawSearchParams = URLSearchParams | Record<string, string | string[] | undefined>

function toURLSearchParams(input: RawSearchParams): URLSearchParams {
  if (input instanceof URLSearchParams) return input
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) continue
    if (Array.isArray(value)) value.forEach((v) => params.append(key, v))
    else params.append(key, value)
  }
  return params
}

function parseNumber(value: string | null): number | null {
  if (!value) return null
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

export function parsePropertyFilters(input: RawSearchParams): PropertyFilters {
  const params = toURLSearchParams(input)
  const purpose = params.get('purpose')
  const furnished = params.get('furnished')

  return {
    purpose: purpose === 'sale' || purpose === 'rent' || purpose === 'commercial' ? purpose : null,
    governorate: params.get('governorate') || null,
    area: params.get('area') || null,
    type: params.get('type') || null,
    minPrice: parseNumber(params.get('minPrice')),
    maxPrice: parseNumber(params.get('maxPrice')),
    beds: parseNumber(params.get('beds')),
    baths: parseNumber(params.get('baths')),
    furnished: furnished === 'furnished' || furnished === 'unfurnished' ? furnished : null,
    amenities: params
      .getAll('amenities')
      .flatMap((v) => v.split(','))
      .filter(Boolean),
  }
}

export function areFiltersEmpty(filters: PropertyFilters): boolean {
  return (
    !filters.purpose &&
    !filters.governorate &&
    !filters.area &&
    !filters.type &&
    filters.minPrice == null &&
    filters.maxPrice == null &&
    filters.beds == null &&
    filters.baths == null &&
    !filters.furnished &&
    filters.amenities.length === 0
  )
}
