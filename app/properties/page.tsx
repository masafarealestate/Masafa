import { getFilteredProperties, getAllAmenities } from '../../lib/properties'
import { parsePropertyFilters } from '../../lib/property-filters'
import { Header } from '../../components/Header'
import { PropertiesGrid } from '../../components/PropertiesGrid'

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const rawParams = await searchParams
  const filters = parsePropertyFilters(rawParams)
  const [properties, amenities] = await Promise.all([getFilteredProperties(filters), getAllAmenities()])

  return (
    <main className="min-h-screen bg-sand">
      <Header />
      <PropertiesGrid properties={properties} amenities={amenities} />
    </main>
  )
}
