import { useEffect, useState } from 'react'
import { COUNTRIES, DEFAULT_COUNTRY } from '../data/countries'
import type { Country } from '../types'

function detectCountryCode(lat: number, lng: number): string {
  if (lat > 35 && lat < 44 && lng > -9 && lng < 4) return 'es'
  if (lat > 49 && lat < 61 && lng > -8 && lng < 2) return 'gb'
  if (lat > 24 && lat < 50 && lng > -125 && lng < -66) return 'us'
  if (lat > 14 && lat < 33 && lng > -118 && lng < -86) return 'mx'
  if (lat > -55 && lat < -21 && lng > -74 && lng < -53) return 'ar'
  if (lat > 42 && lat < 51 && lng > -5 && lng < 8) return 'fr'
  if (lat > 47 && lat < 55 && lng > 6 && lng < 15) return 'de'
  if (lat > 36 && lat < 47 && lng > 6 && lng < 19) return 'it'
  return DEFAULT_COUNTRY.code
}

export function useGeolocation(geoProvider: Geolocation = navigator.geolocation): {
  detectedCountry: Country
  selectedCountry: Country
  setSelectedCountry: React.Dispatch<React.SetStateAction<Country>>
  loading: boolean
} {
  const [detectedCountry, setDetectedCountry] = useState<Country>(DEFAULT_COUNTRY)
  const [selectedCountry, setSelectedCountry] = useState<Country>(DEFAULT_COUNTRY)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    geoProvider.getCurrentPosition(
      ({ coords }) => {
        const code = detectCountryCode(coords.latitude, coords.longitude)
        const country = COUNTRIES.find((c) => c.code === code) ?? DEFAULT_COUNTRY
        setDetectedCountry(country)
        setSelectedCountry(country)
        setLoading(false)
      },
      () => {
        setLoading(false)
      },
    )
  }, [geoProvider])

  return { detectedCountry, selectedCountry, setSelectedCountry, loading }
}
