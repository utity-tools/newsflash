import { useRef, useState } from 'react'
import { TopHeader } from '@/components/layout/TopHeader'
import { BottomNav, type Tab } from '@/components/layout/BottomNav'
import { SearchBar } from '@/components/search/SearchBar'
import { CategoryPills } from '@/components/home/CategoryPills'
import { HeroArticle, HeroArticleSkeleton } from '@/components/home/HeroArticle'
import { ArticleGrid } from '@/components/home/ArticleGrid'
import { NewsletterCTA } from '@/components/home/NewsletterCTA'
import { NewsDrawer } from '@/components/news/NewsDrawer'
import { MarketPage } from '@/pages/MarketPage'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useNews } from '@/hooks/useNews'
import type { Article, Topic } from '@/types'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [selectedTopic, setSelectedTopic] = useState<(Topic & { color: string }) | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const searchInputRef = useRef<HTMLInputElement>(null)

  const { selectedCountry, setSelectedCountry } = useGeolocation()
  const { articles, loading } = useNews({
    country: selectedCountry.code,
    category: selectedTopic?.category,
    searchQuery,
  })

  const [heroArticle, ...gridArticles] = articles

  function handleSearch(query: string) {
    setSearchQuery(query)
    setSelectedTopic(null)
  }

  function handleTopicSelect(topic: Topic & { color: string }) {
    setSelectedTopic((prev) => (prev?.id === topic.id ? null : topic))
    setSearchQuery('')
  }

  function handleSearchFocus() {
    searchInputRef.current?.focus()
    searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-on-surface)', minHeight: '100dvh' }}>
      <TopHeader onSearchFocus={handleSearchFocus} />

      {activeTab === 'market' ? (
        <MarketPage country={selectedCountry.code} />
      ) : (
        <main className="pt-20 pb-28 px-6 max-w-2xl mx-auto flex flex-col gap-10">

          {/* Branding */}
          <section className="text-center pt-6">
            <h2
              className="tracking-tight mb-2"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-display)', fontWeight: 800, color: 'var(--color-on-surface)' }}
            >
              The Paperboy
            </h2>
            <p
              className="uppercase opacity-75 tracking-wider"
              style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-meta)', color: 'var(--color-on-surface-variant)' }}
            >
              Your 5-minute daily briefing
            </p>
          </section>

          {/* Search */}
          <SearchBar
            onSearch={handleSearch}
            selectedCountry={selectedCountry}
            onCountrySelect={setSelectedCountry}
            inputRef={searchInputRef}
          />

          {/* Category pills */}
          <CategoryPills selected={selectedTopic} onSelect={handleTopicSelect} />

          {/* Hero / featured article */}
          {loading
            ? <HeroArticleSkeleton />
            : heroArticle && <HeroArticle article={heroArticle} onClick={setSelectedArticle} />
          }

          {/* Latest editions grid */}
          <ArticleGrid
            articles={gridArticles}
            loading={loading}
            onClick={setSelectedArticle}
          />

          {/* Newsletter CTA */}
          <NewsletterCTA />

        </main>
      )}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      <NewsDrawer article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  )
}

export default App
