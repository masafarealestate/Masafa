'use client'

import Link from 'next/link'
import { useLanguage } from '../lib/i18n/LanguageProvider'
import { Logo } from './Logo'

export function Header() {
  const { lang, dict, toggleLang } = useLanguage()

  const navItems = [
    { key: 'home', href: '/', label: dict.nav.home },
    { key: 'buy', href: '/properties?purpose=sale', label: dict.nav.buy },
    { key: 'rent', href: '/properties?purpose=rent', label: dict.nav.rent },
    { key: 'commercial', href: '/properties?purpose=commercial', label: dict.nav.commercial },
    { key: 'agents', href: '#', label: dict.nav.agents },
    { key: 'about', href: '#', label: dict.nav.about },
  ]

  return (
    <header className="sticky top-0 z-10 border-b border-stone bg-surface/95 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo variant="mark" height={40} alt={lang === 'ar' ? 'مسافة' : 'Masafa'} priority />
          <span className="text-lg font-bold tracking-tight text-ink">
            {lang === 'ar' ? 'مسافة' : 'Masafa'}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-ink">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href} className="transition-colors hover:text-brass">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={toggleLang}
          aria-label="Toggle language"
          className="shrink-0 rounded-sm border border-stone px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
        >
          EN / عربي
        </button>
      </div>

      <nav className="flex md:hidden items-center gap-5 overflow-x-auto px-4 pb-3 text-sm font-medium text-ink [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {navItems.map((item) => (
          <Link key={item.key} href={item.href} className="shrink-0 transition-colors hover:text-brass">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
