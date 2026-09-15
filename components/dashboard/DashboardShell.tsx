'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Logo } from '../Logo'
import { useLanguage } from '../../lib/i18n/LanguageProvider'
import type { Dictionary } from '../../lib/i18n/dictionaries'

type NavItem = {
  href: string
  labelKey: keyof Dictionary['dashboard']['nav']
  enabled: boolean
}

const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', labelKey: 'overview', enabled: true },
  { href: '/dashboard/properties', labelKey: 'properties', enabled: true },
  { href: '/dashboard/properties/new', labelKey: 'addProperty', enabled: true },
  { href: '/dashboard/sellers', labelKey: 'sellers', enabled: false },
  { href: '/dashboard/agents', labelKey: 'agents', enabled: false },
  { href: '/dashboard/leads', labelKey: 'leads', enabled: false },
]

export function DashboardShell({
  children,
  userDisplayName,
  userEmail,
  logoutAction,
}: {
  children: React.ReactNode
  userDisplayName: string
  userEmail: string
  logoutAction: () => Promise<void>
}) {
  const { lang, dir, dict } = useLanguage()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const closedTransform = dir === 'rtl' ? 'translate-x-full' : '-translate-x-full'

  return (
    <div className="min-h-screen bg-sand">
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        />
      )}

      <div className="flex min-h-screen">
        <aside
          className={`fixed inset-y-0 start-0 z-40 flex w-72 shrink-0 flex-col bg-ink transition-transform duration-200 md:static md:z-auto md:translate-x-0 ${
            mobileOpen ? 'translate-x-0' : closedTransform
          }`}
        >
          <div className="flex items-center gap-2.5 px-6 py-6">
            <div className="inline-flex rounded-md bg-white/95 px-2.5 py-1.5">
              <Logo variant="mark" height={28} alt={lang === 'ar' ? 'مسافة' : 'Masafa'} />
            </div>
            <span className="text-base font-bold tracking-tight text-white">{lang === 'ar' ? 'مسافة' : 'Masafa'}</span>
          </div>

          <nav className="flex flex-col gap-1 px-3 py-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              const label = dict.dashboard.nav[item.labelKey]

              if (!item.enabled) {
                return (
                  <span
                    key={item.href}
                    className="flex cursor-not-allowed items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-white/40"
                  >
                    {label}
                    <span className="rounded-sm border border-white/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/40">
                      {dict.dashboard.nav.comingSoon}
                    </span>
                  </span>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-stone bg-surface/95 px-4 py-3 backdrop-blur md:px-8">
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((open) => !open)}
              className="rounded-md border border-stone p-2 text-ink transition-colors hover:border-brass hover:text-brass md:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 5h14M3 10h14M3 15h14" />
              </svg>
            </button>

            <div className="min-w-0 flex-1" />

            <div className="flex items-center gap-3">
              <div className="hidden text-end sm:block">
                <div className="truncate text-sm font-semibold text-ink">{userDisplayName}</div>
                {userDisplayName !== userEmail && <div className="truncate text-xs text-muted">{userEmail}</div>}
              </div>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-md border border-stone px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
                >
                  {dict.dashboard.topbar.logout}
                </button>
              </form>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
