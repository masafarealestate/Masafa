import { OverviewStats } from '../../components/dashboard/OverviewStats'
import { getDashboardStats } from '../../lib/dashboard'
import { createClient } from '../../lib/supabase-server'

export default async function DashboardOverviewPage() {
  const supabase = await createClient()
  const stats = await getDashboardStats(supabase)

  return <OverviewStats stats={stats} />
}
