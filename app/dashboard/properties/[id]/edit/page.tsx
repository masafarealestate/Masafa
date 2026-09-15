import { EditPlaceholder } from '../../../../../components/dashboard/EditPlaceholder'
import { PropertyWizard } from '../../../../../components/dashboard/wizard/PropertyWizard'
import type { StaffProperty } from '../../../../../lib/dashboard-properties'
import { buildFormFromExistingProperty } from '../../../../../lib/property-wizard'
import { createClient } from '../../../../../lib/supabase-server'

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: property }, { data: amenityRows }, { data: media }, { data: propertyTypes }, { data: agents }, { data: sellers }, { data: amenities }] =
    await Promise.all([
      supabase.from('properties').select('*').eq('id', id).maybeSingle(),
      supabase.from('property_amenities').select('amenity_id').eq('property_id', id),
      supabase.from('property_media').select('url, type, is_primary, sort_order').eq('property_id', id),
      supabase.from('property_types').select('id, slug, name_en, name_ar').eq('is_active', true).order('sort_order'),
      supabase
        .from('agents')
        .select('id, full_name, full_name_en, phone, whatsapp, photo_url, job_title')
        .eq('is_active', true)
        .order('full_name_en'),
      supabase.from('sellers').select('id, full_name').order('full_name'),
      supabase.from('amenities').select('id, name_en, name_ar').eq('is_active', true).order('name_en'),
    ])

  if (!property) {
    return <EditPlaceholder />
  }

  const amenityIds = (amenityRows ?? []).map((row) => row.amenity_id as string)
  const initialForm = buildFormFromExistingProperty(property as StaffProperty, amenityIds, media ?? [])

  return (
    <PropertyWizard
      mode="edit"
      propertyId={id}
      initialForm={initialForm}
      propertyTypes={propertyTypes ?? []}
      agents={agents ?? []}
      sellers={sellers ?? []}
      amenities={amenities ?? []}
    />
  )
}
