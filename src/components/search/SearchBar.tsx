import { useState } from 'react'
import { COUNTRIES } from '@/data/countries'
import type { Country } from '@/types'

interface SearchBarProps {
  onSearch: (query: string) => void
  selectedCountry: Country
  onCountrySelect: (country: Country) => void
}

export function SearchBar({ onSearch, selectedCountry, onCountrySelect }: SearchBarProps) {
  const [value, setValue] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onSearch(value.trim())
    }
  }

  function handleCountryClick(country: Country) {
    onCountrySelect(country)
    setShowDropdown(false)
  }

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <input
          type="search"
          placeholder="search any topic..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-white text-lg placeholder:text-zinc-700 focus:border-zinc-600 focus:outline-none transition-colors pr-20"
        />
        <button
          onClick={() => setShowDropdown((v) => !v)}
          className="absolute right-5 flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <span className="text-xl">{selectedCountry.flag}</span>
          <span className="text-xs text-zinc-600">▾</span>
        </button>
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden z-20 shadow-xl">
          {COUNTRIES.map((country) => (
            <button
              key={country.code}
              onClick={() => handleCountryClick(country)}
              className="flex items-center gap-3 w-full px-4 py-3 text-zinc-300 hover:bg-zinc-800 transition-colors text-left text-sm"
            >
              <span>{country.flag}</span>
              <span>{country.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
