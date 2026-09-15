import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './lib/env'

// Next.js 16 renamed the `middleware` file convention to `proxy` — same
// mechanics (runs before rendering, Node.js runtime by default), new name.
// See node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )

  // Calling getUser() (not getSession()) forces a round-trip to Supabase Auth,
  // which is what actually triggers the token refresh + cookie rewrite above.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isDashboardRoute = pathname === '/dashboard' || pathname.startsWith('/dashboard/')
  const isLoginRoute = pathname === '/login'

  if (isDashboardRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.search = `redirectTo=${encodeURIComponent(pathname)}`
    return NextResponse.redirect(url)
  }

  if (isDashboardRoute && user) {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle()
    const isStaff = profile?.role === 'admin' || profile?.role === 'agent'

    if (!isStaff) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      url.search = 'notice=staff-only'
      return NextResponse.redirect(url)
    }
  }

  if (isLoginRoute && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}
