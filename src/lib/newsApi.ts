import type { Article, NewsApiResponse } from '../types'

export async function fetchTopStories(country: string, category?: string): Promise<Article[]> {
  try {
    const params = new URLSearchParams({ type: 'top', locale: country, limit: '10' })
    if (category) params.set('category', category)

    const res = await fetch(`/api/news?${params}`)
    const json: NewsApiResponse = await res.json()
    return json.data
  } catch {
    return []
  }
}

export async function fetchBySearch(query: string, country: string): Promise<Article[]> {
  try {
    const params = new URLSearchParams({
      type: 'search',
      search: query,
      locale: country,
      limit: '10',
    })

    const res = await fetch(`/api/news?${params}`)
    const json: NewsApiResponse = await res.json()
    return json.data
  } catch {
    return []
  }
}
