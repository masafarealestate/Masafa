import Image from 'next/image'

const VARIANTS = {
  mark: { src: '/masafa-mark.png', ratio: 292 / 294 },
  full: { src: '/masafa-logo-full.png', ratio: 287 / 366 },
} as const

export function Logo({
  variant = 'mark',
  height = 34,
  alt = 'Masafa',
  className,
  priority,
}: {
  variant?: keyof typeof VARIANTS
  height?: number
  alt?: string
  className?: string
  priority?: boolean
}) {
  const { src, ratio } = VARIANTS[variant]
  const width = Math.round(height * ratio)

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ height, width: 'auto' }}
      className={className}
      priority={priority}
    />
  )
}
