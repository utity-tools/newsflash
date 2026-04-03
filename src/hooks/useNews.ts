import { useEffect, useState } from 'react'
import { fetchTopStories, fetchBySearch } from '../lib/newsApi'
import type { Article } from '../types'

interface UseNewsProps {
  country: string
  category?: string
  searchQuery?: string
}

export function useNews({ country, category, searchQuery }: UseNewsProps): {
  articles: Article[]
  loading: boolean
  error: boolean
} {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(false)
      try {
        const data = searchQuery
          ? await fetchBySearch(searchQuery, country)
          : await fetchTopStories(country, category)
        if (!cancelled) setArticles(data)
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [country, category, searchQuery])

  return { articles, loading, error }
}
