import { useEffect, useState } from 'react'
import { NewsList } from '@/components/news/NewsList'
import { SearchBar } from '@/components/search/SearchBar'
import { TopicPill } from '@/components/search/TopicPill'
import { COUNTRIES, DEFAULT_COUNTRY } from '@/data/countries'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useNews } from '@/hooks/useNews'
import { useTrending } from '@/hooks/useTrending'
import type { Country, Topic } from '@/types'

function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country>(DEFAULT_COUNTRY)
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCountrySelector, setShowCountrySelector] = useState(false)

  const { detectedCountry } = useGeolocation()
  const { articles, loading } = useNews({
    country: selectedCountry.code,
    category: selectedTopic?.category,
    searchQuery,
  })
  const { topics } = useTrending()

  useEffect(() => {
    setSelectedCountry(detectedCountry)
  }, [detectedCountry])

  function handleSearch(query: string) {
    setSearchQuery(query)
    setSelectedTopic(null)
  }

  function handleTopicClick(topic: Topic) {
    setSelectedTopic(topic)
    setSearchQuery('')
  }

  function handleCountrySelect(country: Country) {
    setSelectedCountry(country)
    setShowCountrySelector(false)
  }

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-4">

        {/* Header */}
        <header className="relative flex items-center justify-between">
          <h1 className="text-2xl font-bold">⚡ Newsflash</h1>
          <button
            onClick={() => setShowCountrySelector((v) => !v)}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-lg px-3 py-2 text-sm"
          >
            <span>{selectedCountry.flag}</span>
            <span>{selectedCountry.name}</span>
          </button>

          {/* Country selector dropdown */}
          {showCountrySelector && (
            <div className="absolute top-full right-0 mt-2 w-52 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl z-10 overflow-hidden">
              {COUNTRIES.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-zinc-800 transition-colors text-left"
                >
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </header>

        {/* Search */}
        <SearchBar onSearch={handleSearch} />

        {/* Topics */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {topics.map((topic) => (
            <TopicPill
              key={topic.id}
              topic={topic}
              isSelected={selectedTopic?.id === topic.id}
              onClick={() => handleTopicClick(topic)}
            />
          ))}
        </div>

        {/* News grid */}
        <NewsList articles={articles} loading={loading} />

      </div>
    </div>
  )
}

export default App
