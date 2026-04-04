import { useRef, useState } from 'react'
import { NewsList } from '@/components/news/NewsList'
import { SearchBar } from '@/components/search/SearchBar'
import { FloatingPill } from '@/components/search/FloatingPill'
import { LiveTicker } from '@/components/search/LiveTicker'
import { TOPICS } from '@/data/topics'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useNews } from '@/hooks/useNews'
import type { Topic } from '@/types'

function App() {
  const [selectedTopic, setSelectedTopic] = useState<Topic & { color: string } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const resultsRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)

  const { selectedCountry, setSelectedCountry } = useGeolocation()
  const { articles, loading } = useNews({
    country: selectedCountry.code,
    category: selectedTopic?.category,
    searchQuery,
  })

  function handleSearch(query: string) {
    setSearchQuery(query)
    setSelectedTopic(null)
    resultsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleTopicClick(topic: Topic & { color: string }) {
    setSelectedTopic(topic)
    setSearchQuery('')
    resultsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const activeLabel = selectedTopic?.label ?? (searchQuery ? `"${searchQuery}"` : null)

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">

      {/* HOME SECTION */}
      <section
        ref={topRef}
        className="min-h-screen flex flex-col items-center justify-center relative"
      >
        {/* Floating topic pills */}
        {TOPICS.map((topic, index) => (
          <FloatingPill
            key={topic.id}
            topic={topic}
            index={index}
            isSelected={selectedTopic?.id === topic.id}
            onClick={() => handleTopicClick(topic)}
          />
        ))}

        {/* Center content */}
        <div className="relative z-10 w-full max-w-xl mx-auto px-6 flex flex-col items-center">
          <p className="text-sm tracking-[0.3em] text-zinc-600 lowercase mb-12">
            newsflash
          </p>

          <SearchBar
            onSearch={handleSearch}
            selectedCountry={selectedCountry}
            onCountrySelect={setSelectedCountry}
          />

          <div className="mt-4 w-full">
            <LiveTicker articles={articles} />
          </div>
        </div>
      </section>

      {/* RESULTS SECTION */}
      <section ref={resultsRef} className="min-h-screen bg-[#0a0a0a] pt-24 pb-24">
        <div className="max-w-2xl mx-auto px-6">
          <button
            onClick={() => topRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="text-zinc-600 text-sm hover:text-zinc-400 transition-colors mb-10 block"
          >
            ← back
          </button>

          {activeLabel && (
            <p className="text-xs text-zinc-600 tracking-widest uppercase mb-8">
              {activeLabel}
            </p>
          )}

          <NewsList articles={articles} loading={loading} />
        </div>
      </section>

    </div>
  )
}

export default App
