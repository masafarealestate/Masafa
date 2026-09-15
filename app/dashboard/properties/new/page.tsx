import { PropertyWizard } from '../../../../components/dashboard/wizard/PropertyWizard'
import { createClient } from '../../../../lib/supabase-server'

export default async function NewPropertyPage() {
  const supabase = await createClient()

  const [{ data: propertyTypes }, { data: agents }, { data: sellers }, { data: amenities }] = await Promise.all([
    supabase.from('property_types').select('id, slug, name_en, name_ar').eq('is_active', true).order('sort_order'),
    supabase
      .from('agents')
      .select('id, full_name, full_name_en, phone, whatsapp, photo_url, job_title')
      .eq('is_active', true)
      .order('full_name_en'),
    supabase.from('sellers').select('id, full_name').order('full_name'),
    supabase.from('amenities').select('id, name_en, name_ar').eq('is_active', true).order('name_en'),
  ])

  return (
    <PropertyWizard
      propertyTypes={propertyTypes ?? []}
      agents={agents ?? []}
      sellers={sellers ?? []}
      amenities={amenities ?? []}
    />
  )
}
