export const LANG_STORAGE_KEY = 'masafa-lang'

export const DEFAULT_LANG = 'en' as const

// Runs synchronously during HTML parsing (before first paint) so returning
// visitors don't see a flash of the wrong language/direction on load.
// Keep in sync with the lazy useState initializer in LanguageProvider.
export const SET_LANG_INLINE_SCRIPT = `(function(){try{var l=localStorage.getItem(${JSON.stringify(
  LANG_STORAGE_KEY
)});if(l==='ar'){document.documentElement.lang='ar';document.documentElement.dir='rtl'}}catch(e){}})()`
