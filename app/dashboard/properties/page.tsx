import { PropertiesTable } from '../../../components/dashboard/PropertiesTable'
import { getStaffProperties } from '../../../lib/dashboard-properties'
import { createClient } from '../../../lib/supabase-server'

export default async function DashboardPropertiesPage() {
  const supabase = await createClient()
  const properties = await getStaffProperties(supabase)

  return <PropertiesTable properties={properties} />
}
