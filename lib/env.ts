// .env.local defines the anon key as `NEXT_PUBLIC_SUPABASE_ANON_Key` (mixed case), not the
// conventional `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Node's process.env is case-insensitive on
// Windows, so server code reading `_ANON_KEY` worked by accident — but Next.js inlines
// NEXT_PUBLIC_* vars into browser bundles by exact literal name, so client code needs the
// literal (mis-cased) name too. Supporting both here avoids touching .env.local.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!

export const SUPABASE_ANON_KEY = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_Key)!
