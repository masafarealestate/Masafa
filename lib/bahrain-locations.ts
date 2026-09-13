export type Area = {
  key: string
  en: string
  ar: string
}

export type Governorate = {
  key: string
  en: string
  ar: string
  areas: Area[]
}

// Stable English keys are used in query params and as React keys; EN/AR labels are for display only.
export const BAHRAIN_GOVERNORATES: Governorate[] = [
  {
    key: 'capital',
    en: 'Capital Governorate',
    ar: 'محافظة العاصمة',
    areas: [
      { key: 'manama', en: 'Manama', ar: 'المنامة' },
      { key: 'seef', en: 'Seef', ar: 'السيف' },
      { key: 'juffair', en: 'Juffair', ar: 'الجفير' },
      { key: 'adliya', en: 'Adliya', ar: 'العدلية' },
      { key: 'umm-al-hassam', en: 'Umm Al Hassam', ar: 'أم الحصم' },
      { key: 'hoora', en: 'Hoora', ar: 'الحورة' },
      { key: 'gudaibiya', en: 'Gudaibiya', ar: 'القضيبية' },
      { key: 'sanabis', en: 'Sanabis', ar: 'السنابس' },
      { key: 'qufool', en: 'Qufool', ar: 'القفول' },
      { key: 'ras-rumman', en: 'Ras Rumman', ar: 'رأس رمان' },
      { key: 'zinj', en: 'Zinj', ar: 'الزنج' },
      { key: 'jid-ali', en: 'Jid Ali', ar: 'جد علي' },
      { key: 'zayed-town', en: 'Zayed Town', ar: 'مدينة زايد' },
    ],
  },
  {
    key: 'muharraq',
    en: 'Muharraq Governorate',
    ar: 'محافظة المحرق',
    areas: [
      { key: 'muharraq', en: 'Muharraq', ar: 'المحرق' },
      { key: 'hidd', en: 'Hidd', ar: 'الحد' },
      { key: 'arad', en: 'Arad', ar: 'عراد' },
      { key: 'busaiteen', en: 'Busaiteen', ar: 'البسيتين' },
      { key: 'dair', en: 'Dair', ar: 'الدير' },
      { key: 'samaheej', en: 'Samaheej', ar: 'سماهيج' },
      { key: 'galali', en: 'Galali', ar: 'قلالي' },
      { key: 'amwaj-islands', en: 'Amwaj Islands', ar: 'جزر أمواج' },
      { key: 'diyar-al-muharraq', en: 'Diyar Al Muharraq', ar: 'ديار المحرق' },
      { key: 'halat-bu-maher', en: 'Halat Bu Maher', ar: 'حالة بو ماهر' },
    ],
  },
  {
    key: 'northern',
    en: 'Northern Governorate',
    ar: 'المحافظة الشمالية',
    areas: [
      { key: 'hamad-town', en: 'Hamad Town', ar: 'مدينة حمد' },
      { key: 'budaiya', en: 'Budaiya', ar: 'البديع' },
      { key: 'saar', en: 'Saar', ar: 'سار' },
      { key: 'janabiya', en: 'Janabiya', ar: 'الجنبية' },
      { key: 'diraz', en: 'Diraz', ar: 'الدراز' },
      { key: 'barbar', en: 'Barbar', ar: 'بربار' },
      { key: 'bani-jamra', en: 'Bani Jamra', ar: 'بني جمرة' },
      { key: 'al-markh', en: 'Al Markh', ar: 'المرخ' },
      { key: 'shakhura', en: 'Shakhura', ar: 'الشاخورة' },
      { key: 'jidhafs', en: 'Jidhafs', ar: 'جدحفص' },
      { key: 'karzakan', en: 'Karzakan', ar: 'كرزكان' },
      { key: 'damistan', en: 'Damistan', ar: 'دمستان' },
      { key: 'karrana', en: 'Karrana', ar: 'كرانة' },
      { key: 'al-malikiyah', en: 'Al Malikiyah', ar: 'المالكية' },
      { key: 'abu-saiba', en: 'Abu Saiba', ar: 'أبو صيبع' },
      { key: 'hamala', en: 'Hamala', ar: 'حمالة' },
    ],
  },
  {
    key: 'southern',
    en: 'Southern Governorate',
    ar: 'المحافظة الجنوبية',
    areas: [
      { key: 'riffa', en: 'Riffa', ar: 'الرفاع' },
      { key: 'east-riffa', en: 'East Riffa', ar: 'الرفاع الشرقي' },
      { key: 'west-riffa', en: 'West Riffa', ar: 'الرفاع الغربي' },
      { key: 'isa-town', en: 'Isa Town', ar: 'مدينة عيسى' },
      { key: 'zallaq', en: 'Zallaq', ar: 'الزلاق' },
      { key: 'askar', en: 'Askar', ar: 'عسكر' },
      { key: 'jaw', en: 'Jaw', ar: 'جو' },
      { key: 'dar-kulaib', en: 'Dar Kulaib', ar: 'دار كليب' },
      { key: 'al-dur', en: 'Al Dur', ar: 'الدور' },
      { key: 'maameer', en: "Ma'ameer", ar: 'المعامير' },
      { key: 'salman-city', en: 'Salman City', ar: 'مدينة سلمان' },
      { key: 'durrat-al-bahrain', en: 'Durrat Al Bahrain', ar: 'درة البحرين' },
      { key: 'hawar-islands', en: 'Hawar Islands', ar: 'جزر حوار' },
    ],
  },
]

export function getAreasForGovernorate(governorateKey: string): Area[] {
  if (!governorateKey) return BAHRAIN_GOVERNORATES.flatMap((g) => g.areas)
  return BAHRAIN_GOVERNORATES.find((g) => g.key === governorateKey)?.areas ?? []
}
