import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

const mockUseGeolocation = vi.hoisted(() => vi.fn())
const mockUseNews = vi.hoisted(() => vi.fn())
const mockUseTrending = vi.hoisted(() => vi.fn())

vi.mock('../hooks/useGeolocation', () => ({
  useGeolocation: mockUseGeolocation
}))

vi.mock('../hooks/useNews', () => ({
  useNews: mockUseNews
}))

vi.mock('../hooks/useTrending', () => ({
  useTrending: mockUseTrending
}))

import App from '../App'

describe('App', () => {
  it('renders the Newsflash title', () => {
    mockUseGeolocation.mockReturnValue({ detectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, loading: false })
    mockUseNews.mockReturnValue({ articles: [], loading: false, error: null })
    mockUseTrending.mockReturnValue({ topics: [], loading: false })
    render(<App />)
    expect(screen.getByText(/Newsflash/i)).toBeDefined()
  })

  it('renders the search bar', () => {
    mockUseGeolocation.mockReturnValue({ detectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, loading: false })
    mockUseNews.mockReturnValue({ articles: [], loading: false, error: null })
    mockUseTrending.mockReturnValue({ topics: [], loading: false })
    render(<App />)
    expect(screen.getByPlaceholderText(/Search news/i)).toBeDefined()
  })
})
