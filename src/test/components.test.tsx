import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewsCard } from '@/components/news/NewsCard'
import { NewsList } from '@/components/news/NewsList'
import { TopicPill } from '@/components/search/TopicPill'
import { SearchBar } from '@/components/search/SearchBar'
import type { Article, Topic } from '@/types'
import { DEFAULT_COUNTRY } from '@/data/countries'

const mockArticle: Article = {
  uuid: '123',
  title: 'Test Article Title',
  description: 'Test article description',
  snippet: 'Test article snippet',
  keywords: 'test, article',
  url: 'https://example.com/article',
  image_url: 'https://example.com/image.jpg',
  published_at: new Date(Date.now() - 3600000).toISOString(),
  source: 'Test Source',
  categories: ['general'],
  language: 'en',
  relevance_score: null,
}

const mockTopic: Topic = {
  id: 'tech',
  label: '💻 Tech',
  category: 'tech',
}

describe('NewsCard', () => {
  it('renders article title', () => {
    render(<NewsCard article={mockArticle} onClick={vi.fn()} />)
    expect(screen.getByText('Test Article Title')).toBeInTheDocument()
  })

  it('renders source name', () => {
    render(<NewsCard article={mockArticle} onClick={vi.fn()} />)
    expect(screen.getByText('Test Source')).toBeInTheDocument()
  })

  it('renders relative time text in the footer', () => {
    render(<NewsCard article={mockArticle} onClick={vi.fn()} />)
    expect(screen.getByText(/ago/i)).toBeInTheDocument()
  })

  it('renders description in the card', () => {
    render(<NewsCard article={mockArticle} onClick={vi.fn()} />)
    expect(screen.getByText('Test article description')).toBeInTheDocument()
  })

  it('renders "just now" equivalent when published_at is current time', () => {
    render(<NewsCard article={{ ...mockArticle, published_at: new Date().toISOString() }} onClick={vi.fn()} />)
    expect(screen.getByText('0m ago')).toBeInTheDocument()
  })

  it('renders days ago when published_at is 2 days ago', () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 3600000).toISOString()
    render(<NewsCard article={{ ...mockArticle, published_at: twoDaysAgo }} onClick={vi.fn()} />)
    expect(screen.getByText('2d ago')).toBeInTheDocument()
  })

  it('calls onClick with the article when clicked', async () => {
    const onClick = vi.fn()
    render(<NewsCard article={mockArticle} onClick={onClick} />)
    await userEvent.click(screen.getByText('Test Article Title'))
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledWith(mockArticle)
  })
})

describe('NewsList', () => {
  it('shows 6 skeleton elements when loading', () => {
    const { container } = render(<NewsList articles={[]} loading={true} />)
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBe(6 * 3) // 3 animate-pulse divs per skeleton row × 6 rows
  })

  it('shows "no results found" when articles are empty and not loading', () => {
    render(<NewsList articles={[]} loading={false} />)
    expect(screen.getByText('no results found')).toBeInTheDocument()
  })

  it('renders correct number of cards when articles are provided', () => {
    const articles: Article[] = [
      { ...mockArticle, uuid: '1', title: 'Article One' },
      { ...mockArticle, uuid: '2', title: 'Article Two' },
      { ...mockArticle, uuid: '3', title: 'Article Three' },
    ]
    render(<NewsList articles={articles} loading={false} />)
    expect(screen.getByText('Article One')).toBeInTheDocument()
    expect(screen.getByText('Article Two')).toBeInTheDocument()
    expect(screen.getByText('Article Three')).toBeInTheDocument()
  })
})

describe('TopicPill', () => {
  it('renders topic label', () => {
    render(<TopicPill topic={mockTopic} isSelected={false} onClick={vi.fn()} />)
    expect(screen.getByText('💻 Tech')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<TopicPill topic={mockTopic} isSelected={false} onClick={onClick} />)
    await userEvent.click(screen.getByText('💻 Tech'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('applies selected styles when isSelected is true', () => {
    const { rerender } = render(
      <TopicPill topic={mockTopic} isSelected={false} onClick={vi.fn()} />,
    )
    const pill = screen.getByText('💻 Tech')
    expect(pill.className).toContain('bg-zinc-800')

    rerender(<TopicPill topic={mockTopic} isSelected={true} onClick={vi.fn()} />)
    expect(pill.className).toContain('bg-white')
  })
})

describe('SearchBar', () => {
  it('renders input with placeholder "search any topic..."', () => {
    render(
      <SearchBar
        onSearch={vi.fn()}
        selectedCountry={DEFAULT_COUNTRY}
        onCountrySelect={vi.fn()}
      />
    )
    expect(screen.getByPlaceholderText('search any topic...')).toBeInTheDocument()
  })

  it('calls onSearch with the input value when Enter is pressed', async () => {
    const onSearch = vi.fn()
    render(
      <SearchBar
        onSearch={onSearch}
        selectedCountry={DEFAULT_COUNTRY}
        onCountrySelect={vi.fn()}
      />
    )
    const input = screen.getByPlaceholderText('search any topic...')
    await userEvent.type(input, 'react news{Enter}')
    expect(onSearch).toHaveBeenCalledWith('react news')
  })
})
