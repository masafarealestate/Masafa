import type { PropertyPublic } from './types'

type Lang = 'en' | 'ar'

/** Picks the field matching the active language, falling back to Arabic so nothing renders blank. */
function pickLocalized(en: string | null | undefined, ar: string | null | undefined, lang: Lang): string | null {
  return lang === 'en' ? en ?? ar ?? null : ar ?? en ?? null
}

export function getLocalizedGovernorate(property: PropertyPublic, lang: Lang) {
  return pickLocalized(property.governorate_en, property.governorate, lang)
}

export function getLocalizedCity(property: PropertyPublic, lang: Lang) {
  return pickLocalized(property.city_en, property.city, lang)
}

export function getLocalizedArea(property: PropertyPublic, lang: Lang) {
  return pickLocalized(property.area_en, property.area, lang)
}

export function getLocalizedAgentName(property: PropertyPublic, lang: Lang) {
  return pickLocalized(property.agent_name_en, property.agent_name, lang)
}

export function getLocalizedTitle(property: PropertyPublic, lang: Lang) {
  return pickLocalized(property.title_en, property.title_ar, lang) ?? ''
}

export function getLocalizedType(property: PropertyPublic, lang: Lang) {
  return pickLocalized(property.type_en, property.type_ar, lang) ?? ''
}

export function getLocalizedDescription(property: PropertyPublic, lang: Lang) {
  return pickLocalized(property.description_en, property.description_ar, lang)
}

export function formatPropertyPrice(
  property: PropertyPublic,
  lang: Lang,
  currencyLabel: string,
  perMonthLabel: string
) {
  const amount = property.purpose === 'rent' ? property.monthly_rent ?? 0 : property.sale_price ?? 0
  const formatted = new Intl.NumberFormat(lang === 'ar' ? 'ar-BH' : 'en-BH', {
    maximumFractionDigits: 0,
  }).format(amount)
  const price = lang === 'ar' ? `${formatted} ${currencyLabel}` : `${currencyLabel} ${formatted}`
  return property.purpose === 'rent' ? `${price} / ${perMonthLabel}` : price
}
