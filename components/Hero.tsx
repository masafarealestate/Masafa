'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useLanguage } from '../lib/i18n/LanguageProvider'
import { PROPERTY_TYPE_SLUGS } from '../lib/i18n/dictionaries'
import { BAHRAIN_GOVERNORATES, getAreasForGovernorate } from '../lib/bahrain-locations'
import { FieldSelect } from './FieldSelect'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1920&auto=format&fit=crop'

type Intent = 'sale' | 'rent' | 'commercial'

export function Hero() {
  const router = useRouter()
  const { lang, dict } = useLanguage()
  const [imgFailed, setImgFailed] = useState(false)

  const [intent, setIntent] = useState<Intent>('sale')
  const [governorate, setGovernorate] = useState('')
  const [area, setArea] = useState('')
  const [type, setType] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [bedrooms, setBedrooms] = useState('')

  const governorateOptions = [
    { value: '', label: dict.home.hero.allGovernorates },
    ...BAHRAIN_GOVERNORATES.map((g) => ({ value: g.key, label: lang === 'ar' ? g.ar : g.en })),
  ]
  const areaOptions = [
    { value: '', label: dict.home.hero.allAreas },
    ...getAreasForGovernorate(governorate).map((a) => ({ value: a.key, label: lang === 'ar' ? a.ar : a.en })),
  ]
  const typeOptions = [
    { value: '', label: dict.home.hero.typeAny },
    ...PROPERTY_TYPE_SLUGS.map((slug, i) => ({ value: slug, label: dict.home.hero.typeOptions[i] })),
  ]
  const bedroomOptions = [
    { value: '', label: dict.home.hero.bedroomsAny },
    ...[1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: `${n}${n === 5 ? '+' : ''}` })),
  ]

  function handleGovernorateChange(next: string) {
    setGovernorate(next)
    setArea('')
  }

  const intents: { value: Intent; label: string }[] = [
    { value: 'sale', label: dict.nav.buy },
    { value: 'rent', label: dict.nav.rent },
    { value: 'commercial', label: dict.nav.commercial },
  ]

  function handleSearch() {
    const params = new URLSearchParams()
    params.set('purpose', intent)
    if (governorate) params.set('governorate', governorate)
    if (area) params.set('area', area)
    if (type) params.set('type', type)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (bedrooms) params.set('beds', bedrooms)
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <section className="relative isolate">
      <div
        className="absolute inset-0 -z-20"
        style={{ background: 'linear-gradient(160deg, var(--ink-deep), var(--ink))' }}
      />
      {!imgFailed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          onError={() => setImgFailed(true)}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
        />
      )}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(180deg, rgba(30,42,54,.55), rgba(30,42,54,.85))' }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20 md:px-8 md:py-28">
        <h1 className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          {dict.home.hero.headline}
        </h1>
        <p className="mt-4 max-w-xl text-base text-white/80 sm:text-lg">{dict.home.hero.subheading}</p>

        <div className="mt-8 rounded-lg border border-white/10 bg-surface p-3 shadow-card sm:p-4 md:mt-10">
          <div className="flex gap-1 rounded-sm bg-sand p-1 text-sm font-semibold">
            {intents.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setIntent(item.value)}
                className="flex-1 rounded-sm px-3 py-2 transition-colors"
                style={
                  intent === item.value
                    ? { background: 'var(--ink)', color: '#fff' }
                    : { color: 'var(--ink)' }
                }
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-1">
              <FieldSelect
                label={dict.home.hero.governorateLabel}
                value={governorate}
                onChange={handleGovernorateChange}
                options={governorateOptions}
              />
            </div>

            <div className="lg:col-span-1">
              <FieldSelect label={dict.home.hero.areaLabel} value={area} onChange={setArea} options={areaOptions} />
            </div>

            <div className="lg:col-span-1">
              <FieldSelect label={dict.home.hero.typeLabel} value={type} onChange={setType} options={typeOptions} />
            </div>

            <label className="flex flex-col gap-1 text-xs font-medium text-muted lg:col-span-1">
              {dict.home.hero.maxPriceLabel}
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder={dict.home.hero.maxPricePlaceholder}
                className="h-12 rounded-md border border-stone bg-surface px-3 text-sm text-ink placeholder:text-muted transition-colors hover:border-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)]"
              />
            </label>

            <div className="lg:col-span-1">
              <FieldSelect
                label={dict.home.hero.bedroomsLabel}
                value={bedrooms}
                onChange={setBedrooms}
                options={bedroomOptions}
              />
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="h-12 rounded-md px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 lg:col-span-1"
              style={{ background: 'var(--brass)' }}
            >
              {dict.home.hero.searchButton}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
