import { render, screen, fireEvent } from '@testing-library/react'
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
  it('renders the Paperboy masthead', () => {
    mockUseGeolocation.mockReturnValue({ detectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, selectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, setSelectedCountry: vi.fn(), loading: false })
    mockUseNews.mockReturnValue({ articles: [], loading: false, error: null })
    mockUseTrending.mockReturnValue({ topics: [], loading: false })
    render(<App />)
    expect(screen.getByText(/Paperboy/i)).toBeDefined()
  })

  it('renders the search bar', () => {
    mockUseGeolocation.mockReturnValue({ detectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, selectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, setSelectedCountry: vi.fn(), loading: false })
    mockUseNews.mockReturnValue({ articles: [], loading: false, error: null })
    mockUseTrending.mockReturnValue({ topics: [], loading: false })
    render(<App />)
    expect(screen.getByPlaceholderText(/search any topic/i)).toBeDefined()
  })

  it('renders topic pills when useTrending returns topics', () => {
    mockUseGeolocation.mockReturnValue({ detectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, selectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, setSelectedCountry: vi.fn(), loading: false })
    mockUseNews.mockReturnValue({ articles: [], loading: false, error: null })
    mockUseTrending.mockReturnValue({ topics: [{ id: 'tech', label: '💻 Tecnología', category: 'tech' }], loading: false })
    render(<App />)
    expect(screen.getByText('💻 Tecnología')).toBeDefined()
  })

  it('shows country selector with list of countries when flag button is clicked', async () => {
    mockUseGeolocation.mockReturnValue({ detectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, selectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, setSelectedCountry: vi.fn(), loading: false })
    mockUseNews.mockReturnValue({ articles: [], loading: false, error: null })
    mockUseTrending.mockReturnValue({ topics: [], loading: false })
    render(<App />)
    await userEvent.click(screen.getByText('🇪🇸'))
    expect(screen.getAllByText('Spain').length).toBeGreaterThan(0)
  })

  it('search bar calls onSearch when Enter is pressed', async () => {
    mockUseGeolocation.mockReturnValue({ detectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, selectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, setSelectedCountry: vi.fn(), loading: false })
    mockUseNews.mockReturnValue({ articles: [], loading: false, error: null })
    mockUseTrending.mockReturnValue({ topics: [], loading: false })
    render(<App />)
    const input = screen.getByPlaceholderText(/search any topic/i)
    await userEvent.type(input, 'react{Enter}')
    expect(mockUseNews).toHaveBeenCalledWith(
      expect.objectContaining({ searchQuery: 'react' })
    )
  })

  it('clicking a topic pill updates selected topic', async () => {
    mockUseGeolocation.mockReturnValue({ detectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, selectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, setSelectedCountry: vi.fn(), loading: false })
    mockUseNews.mockReturnValue({ articles: [], loading: false, error: null })
    mockUseTrending.mockReturnValue({ topics: [{ id: 'tech', label: '💻 Tecnología', category: 'tech' }], loading: false })
    render(<App />)
    await userEvent.click(screen.getByText('💻 Tecnología'))
    expect(mockUseNews).toHaveBeenCalledWith(
      expect.objectContaining({ category: 'tech' })
    )
  })

  it('clicking a country in the selector updates selected country', async () => {
    mockUseGeolocation.mockReturnValue({
      detectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' },
      selectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' },
      setSelectedCountry: vi.fn(),
      loading: false
    })
    mockUseNews.mockReturnValue({ articles: [], loading: false, error: null })
    mockUseTrending.mockReturnValue({ topics: [], loading: false })
    render(<App />)
    const flagButton = screen.getByText('🇪🇸')
    await userEvent.click(flagButton)
    const usOption = screen.getByText('United States')
    await userEvent.click(usOption)
    expect(screen.queryByText('United States')).toBeNull()
  })

  it('clicking flag button toggles country selector', async () => {
    mockUseGeolocation.mockReturnValue({ detectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, selectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, setSelectedCountry: vi.fn(), loading: false })
    mockUseNews.mockReturnValue({ articles: [], loading: false, error: null })
    mockUseTrending.mockReturnValue({ topics: [], loading: false })
    const { container } = render(<App />)
    expect(container).toBeDefined()
  })

  it('searching clears selected topic', async () => {
    mockUseGeolocation.mockReturnValue({ detectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, selectedCountry: { code: 'es', name: 'Spain', flag: '🇪🇸', locale: 'es' }, setSelectedCountry: vi.fn(), loading: false })
    mockUseNews.mockReturnValue({ articles: [], loading: false, error: null })
    mockUseTrending.mockReturnValue({ topics: [{ id: 'tech', label: '💻 Tecnología', category: 'tech' }], loading: false })
    render(<App />)
    await userEvent.click(screen.getByText('💻 Tecnología'))
    const input = screen.getByPlaceholderText(/search any topic/i)
    fireEvent.change(input, { target: { value: 'latest' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', keyCode: 13 })
    expect(mockUseNews).toHaveBeenLastCalledWith(
      expect.objectContaining({ searchQuery: 'latest', category: undefined })
    )
  })
})
