import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('renders topic pills when useTrending returns topics', () => {
    mockUseGeolocation.mockReturnValue({ detectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, loading: false })
    mockUseNews.mockReturnValue({ articles: [], loading: false, error: null })
    mockUseTrending.mockReturnValue({ topics: [{ id: 'tech', label: '💻 Tech', category: 'tech' }], loading: false })
    render(<App />)
    expect(screen.getByText('💻 Tech')).toBeDefined()
  })

  it('shows country selector with list of countries when flag button is clicked', async () => {
    mockUseGeolocation.mockReturnValue({ detectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, loading: false })
    mockUseNews.mockReturnValue({ articles: [], loading: false, error: null })
    mockUseTrending.mockReturnValue({ topics: [], loading: false })
    render(<App />)
    await userEvent.click(screen.getByText('🇪🇸'))
    expect(screen.getAllByText('Spain').length).toBeGreaterThan(0)
  })

  it('search bar calls onSearch when Enter is pressed', async () => {
    mockUseGeolocation.mockReturnValue({ detectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, loading: false })
    mockUseNews.mockReturnValue({ articles: [], loading: false, error: null })
    mockUseTrending.mockReturnValue({ topics: [], loading: false })
    render(<App />)
    const input = screen.getByPlaceholderText(/Search news/i)
    await userEvent.type(input, 'react{Enter}')
    expect(mockUseNews).toHaveBeenCalledWith(
      expect.objectContaining({ searchQuery: 'react' })
    )
  })

  it('clicking a topic pill updates selected topic', async () => {
    mockUseGeolocation.mockReturnValue({ detectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, loading: false })
    mockUseNews.mockReturnValue({ articles: [], loading: false, error: null })
    mockUseTrending.mockReturnValue({ topics: [{ id: 'tech', label: '💻 Tech', category: 'tech' }], loading: false })
    render(<App />)
    await userEvent.click(screen.getByText('💻 Tech'))
    expect(mockUseNews).toHaveBeenCalledWith(
      expect.objectContaining({ category: 'tech' })
    )
  })

  it('clicking a country in the selector updates selected country', async () => {
    mockUseGeolocation.mockReturnValue({ detectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, loading: false })
    mockUseNews.mockReturnValue({ articles: [], loading: false, error: null })
    mockUseTrending.mockReturnValue({ topics: [], loading: false })
    render(<App />)
    await userEvent.click(screen.getByText('🇪🇸'))
    await userEvent.click(screen.getByText('United States'))
    expect(mockUseNews).toHaveBeenCalledWith(
      expect.objectContaining({ country: 'us' })
    )
  })

  it('clicking flag button closes selector when already open', async () => {
    mockUseGeolocation.mockReturnValue({ detectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, loading: false })
    mockUseNews.mockReturnValue({ articles: [], loading: false, error: null })
    mockUseTrending.mockReturnValue({ topics: [], loading: false })
    render(<App />)
    const flagButton = screen.getByText('🇪🇸')
    await userEvent.click(flagButton)
    expect(screen.getAllByText('Spain').length).toBeGreaterThan(1)
    await userEvent.click(flagButton)
    expect(screen.getAllByText('Spain').length).toBe(1)
  })

  it('searching clears selected topic', async () => {
    mockUseGeolocation.mockReturnValue({ detectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, loading: false })
    mockUseNews.mockReturnValue({ articles: [], loading: false, error: null })
    mockUseTrending.mockReturnValue({ topics: [{ id: 'tech', label: '💻 Tech', category: 'tech' }], loading: false })
    render(<App />)
    await userEvent.click(screen.getByText('💻 Tech'))
    const input = screen.getByPlaceholderText(/Search news/i)
    await userEvent.type(input, 'latest{Enter}')
    expect(mockUseNews).toHaveBeenLastCalledWith(
      expect.objectContaining({ searchQuery: 'latest', category: undefined })
    )
  })
})
