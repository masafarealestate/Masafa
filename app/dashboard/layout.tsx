import { redirect } from 'next/navigation'
import { DashboardShell } from '../../components/dashboard/DashboardShell'
import { createClient } from '../../lib/supabase-server'
import { logout } from './actions'

// proxy.ts already gates /dashboard, but Server Functions on this route are
// only guaranteed to run behind proxy if its matcher stays correct — so this
// layout re-checks auth + role itself as the real enforcement boundary.
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle()
  const isStaff = profile?.role === 'admin' || profile?.role === 'agent'

  if (!isStaff) {
    redirect('/?notice=staff-only')
  }

  const displayName =
    typeof user.user_metadata?.full_name === 'string' && user.user_metadata.full_name.trim().length > 0
      ? user.user_metadata.full_name
      : user.email ?? ''

  return (
    <DashboardShell userDisplayName={displayName} userEmail={user.email ?? ''} logoutAction={logout}>
      {children}
    </DashboardShell>
  )
}
