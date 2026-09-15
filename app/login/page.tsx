'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { Logo } from '../../components/Logo'
import { useLanguage } from '../../lib/i18n/LanguageProvider'
import { supabase } from '../../lib/supabase'

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const { lang, dict, toggleLang } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const inputClass =
    'h-12 rounded-md border border-stone bg-surface px-3 text-sm text-ink placeholder:text-muted transition-colors hover:border-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)]'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError(dict.auth.login.genericError)
      setSubmitting(false)
      return
    }

    const redirectTo = searchParams.get('redirectTo')
    router.push(redirectTo && redirectTo.startsWith('/dashboard') ? redirectTo : '/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-sand px-4 py-12">
      <button
        type="button"
        onClick={toggleLang}
        aria-label="Toggle language"
        className="absolute end-4 top-4 rounded-sm border border-stone px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
      >
        EN / عربي
      </button>

      <Link href="/" className="mb-8 inline-flex items-center gap-2.5">
        <Logo variant="mark" height={44} alt={lang === 'ar' ? 'مسافة' : 'Masafa'} priority />
        <span className="text-xl font-bold tracking-tight text-ink">{lang === 'ar' ? 'مسافة' : 'Masafa'}</span>
      </Link>

      <div className="w-full max-w-sm rounded-lg border border-stone bg-surface p-8 shadow-card">
        <h1 className="text-xl font-bold text-ink">{dict.auth.login.heading}</h1>
        <p className="mt-1.5 text-sm text-muted">{dict.auth.login.subheading}</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-xs font-medium text-muted">
            {dict.auth.login.emailLabel}
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={dict.auth.login.emailPlaceholder}
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-medium text-muted">
            {dict.auth.login.passwordLabel}
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={dict.auth.login.passwordPlaceholder}
              className={inputClass}
            />
          </label>

          {error && (
            <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 h-12 rounded-md text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: 'var(--ink)' }}
          >
            {submitting ? dict.auth.login.submitting : dict.auth.login.submit}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">{dict.auth.login.reassurance}</p>
      </div>
    </main>
  )
}
