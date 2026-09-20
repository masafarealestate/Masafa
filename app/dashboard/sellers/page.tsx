import { SellersTable } from '../../../components/dashboard/SellersTable'
import { getStaffSellers } from '../../../lib/dashboard-sellers'
import { createClient } from '../../../lib/supabase-server'

export default async function DashboardSellersPage() {
  const supabase = await createClient()
  const sellers = await getStaffSellers(supabase)

  return <SellersTable sellers={sellers} />
}
