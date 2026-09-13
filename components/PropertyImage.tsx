'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '../lib/i18n/LanguageProvider'

/**
 * Renders a property photo, or a branded gradient placeholder when the url is
 * missing or fails to load — this environment blocks some external images,
 * so a broken-image icon or empty box must never be visible to the user.
 */
export function PropertyImage({
  src,
  alt,
  className = '',
}: {
  src?: string | null
  alt: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const { dict } = useLanguage()

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={dict.propertyDetail.gallery.noPhoto}
        className={`flex items-center justify-center ${className}`}
        style={{ background: 'linear-gradient(135deg, var(--ink-deep), var(--ink))' }}
      >
        <Image src="/masafa-mark.png" alt="" width={40} height={40} style={{ opacity: 0.85 }} aria-hidden="true" />
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
  )
}
