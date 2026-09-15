'use client'

import { useState } from 'react'
import { useLanguage } from '../lib/i18n/LanguageProvider'

export function StaffOnlyNotice() {
  const { dict } = useLanguage()
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="flex items-center justify-between gap-4 bg-brass/15 px-4 py-2.5 text-sm text-ink md:px-8">
      <span>{dict.auth.staffOnlyNotice}</span>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="shrink-0 text-muted transition-colors hover:text-ink"
      >
        ✕
      </button>
    </div>
  )
}
