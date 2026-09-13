'use client'

import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react'
import { DEFAULT_LANG, LANG_STORAGE_KEY } from './constants'
import { dictionaries, type Dictionary, type Lang } from './dictionaries'

type LanguageContextValue = {
  lang: Lang
  dir: 'ltr' | 'rtl'
  dict: Dictionary
  setLang: (lang: Lang) => void
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLang(): Lang {
  if (typeof window === 'undefined') return DEFAULT_LANG
  return window.localStorage.getItem(LANG_STORAGE_KEY) === 'ar' ? 'ar' : DEFAULT_LANG
}

function applyLangToDocument(lang: Lang) {
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang)

  // Re-applies the DOM attributes the inline script already set. This is a
  // no-op in production; in dev, React Strict Mode's remount resets <html>
  // to only the attributes it manages from JSX, so it must be reapplied.
  useLayoutEffect(() => {
    applyLangToDocument(lang)
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    applyLangToDocument(next)
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next)
    } catch {
      // localStorage unavailable (private browsing, disabled storage) — language still works for this session
    }
  }, [])

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'ar' : 'en')
  }, [lang, setLang])

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      dict: dictionaries[lang],
      setLang,
      toggleLang,
    }),
    [lang, setLang, toggleLang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
