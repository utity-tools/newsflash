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
          style={{
            background: 'transparent',
            border: 'var(--border-default)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-newsprint)',
            width: '100%',
            outline: 'none',
            paddingRight: '80px',
          }}
          className="placeholder:opacity-50 focus:border-[var(--color-lead)] transition-colors"
        />
        <button
          onClick={() => setShowDropdown((v) => !v)}
          style={{ color: 'var(--color-lead)' }}
          className="absolute right-5 flex items-center gap-1 hover:opacity-70 transition-opacity"
        >
          <span className="text-xl">{selectedCountry.flag}</span>
          <span className="text-xs">▾</span>
        </button>
      </div>

      {showDropdown && (
        <div
          style={{
            background: 'var(--color-ink)',
            border: 'var(--border-default)',
            borderRadius: 'var(--radius-md)',
          }}
          className="absolute top-full left-0 right-0 mt-2 overflow-hidden z-20 shadow-xl"
        >
          {COUNTRIES.map((country) => (
            <button
              key={country.code}
              onClick={() => handleCountryClick(country)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-newsprint)',
              }}
              className="flex items-center gap-3 w-full px-4 py-3 hover:text-[var(--color-lead)] transition-colors text-left"
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
