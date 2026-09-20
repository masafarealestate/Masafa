import { SellerForm } from '../../../../../components/dashboard/SellerForm'
import { SellerNotFound } from '../../../../../components/dashboard/SellerNotFound'
import { getStaffSeller } from '../../../../../lib/dashboard-sellers'
import { createClient } from '../../../../../lib/supabase-server'

export default async function EditSellerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const seller = await getStaffSeller(supabase, id)

  if (!seller) {
    return <SellerNotFound />
  }

  return <SellerForm seller={seller} />
}
