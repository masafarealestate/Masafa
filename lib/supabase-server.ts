import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './env'

/**
 * Server-side Supabase client for Server Components, Server Actions, and Route
 * Handlers. Reads the session from request cookies (set by `proxy.ts` /
 * @supabase/ssr's browser client) so RLS policies see the real logged-in user.
 *
 * Must be created fresh per request — never module-level cached.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Called from a Server Component render, where cookies can't be written.
          // Session refresh is still handled by proxy.ts on the next request.
        }
      },
    },
  })
}
