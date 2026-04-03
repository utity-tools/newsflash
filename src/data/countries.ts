import type { Country } from '../types'

export const COUNTRIES: Country[] = [
  { code: 'us', name: 'United States', flag: '🇺🇸', locale: 'en' },
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧', locale: 'en' },
  { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' },
  { code: 'mx', name: 'Mexico', flag: '🇲🇽', locale: 'es' },
  { code: 'ar', name: 'Argentina', flag: '🇦🇷', locale: 'es' },
  { code: 'fr', name: 'France', flag: '🇫🇷', locale: 'fr' },
  { code: 'de', name: 'Germany', flag: '🇩🇪', locale: 'de' },
  { code: 'it', name: 'Italy', flag: '🇮🇹', locale: 'it' },
]

export const DEFAULT_COUNTRY = COUNTRIES[2] // Spain
