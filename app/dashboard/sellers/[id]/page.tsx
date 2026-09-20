import { SellerDetail } from '../../../../components/dashboard/SellerDetail'
import { SellerNotFound } from '../../../../components/dashboard/SellerNotFound'
import { getSellerProperties, getStaffSeller } from '../../../../lib/dashboard-sellers'
import { createClient } from '../../../../lib/supabase-server'

export default async function SellerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [seller, properties] = await Promise.all([getStaffSeller(supabase, id), getSellerProperties(supabase, id)])

  if (!seller) {
    return <SellerNotFound />
  }

  return <SellerDetail seller={seller} properties={properties} />
}
