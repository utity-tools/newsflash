import { useState, useRef } from 'react'
import { COUNTRIES } from '@/data/countries'
import type { Country } from '@/types'

interface SearchBarProps {
  onSearch: (query: string) => void
  selectedCountry: Country
  onCountrySelect: (country: Country) => void
  inputRef?: React.RefObject<HTMLInputElement | null>
}

export function SearchBar({ onSearch, selectedCountry, onCountrySelect, inputRef }: SearchBarProps) {
  const [value, setValue] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const internalRef = useRef<HTMLInputElement>(null)
  const ref = inputRef ?? internalRef

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onSearch(value.trim())
      ;(e.target as HTMLInputElement).blur()
    }
  }

  return (
    <div className="relative w-full">
      <div
        className="flex items-center px-5 py-3 transition-all focus-within:border-[var(--color-outline)]"
        style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(72,72,72,0.3)',
        }}
      >
        <span className="material-symbols-outlined mr-3 shrink-0" style={{ color: 'var(--color-outline)', fontSize: '20px' }}>
          search
        </span>

        <input
          ref={ref}
          type="search"
          placeholder="search any topic..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none flex-1 min-w-0"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-on-surface)',
          }}
        />

        <button
          onClick={() => setShowDropdown((v) => !v)}
          className="flex items-center gap-1 ml-3 pl-4 shrink-0 hover:opacity-70 transition-opacity"
          style={{ borderLeft: '1px solid rgba(72,72,72,0.4)' }}
        >
          <span className="text-lg leading-none">{selectedCountry.flag}</span>
          <span style={{ color: 'var(--color-on-surface-variant)', fontSize: '10px' }}>▾</span>
        </button>
      </div>

      {showDropdown && (
        <div
          className="absolute top-full left-0 right-0 mt-2 overflow-hidden z-20 shadow-2xl"
          style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(72,72,72,0.3)' }}
        >
          {COUNTRIES.map((country) => (
            <button
              key={country.code}
              onClick={() => { onCountrySelect(country); setShowDropdown(false) }}
              className="flex items-center gap-3 w-full px-4 py-3 hover:opacity-70 transition-opacity text-left"
              style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body)', color: 'var(--color-on-surface)' }}
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
