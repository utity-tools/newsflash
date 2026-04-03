import type { Article, NewsApiResponse } from '../types'

const BASE_URL = 'https://api.thenewsapi.com/v1'
const API_TOKEN = import.meta.env.VITE_NEWS_API_TOKEN

export async function fetchTopStories(country: string, category?: string): Promise<Article[]> {
  try {
    const params = new URLSearchParams({
      api_token: API_TOKEN,
      locale: country,
      limit: '10',
    })
    if (category) params.set('categories', category)

    const res = await fetch(`${BASE_URL}/news/top?${params}`)
    const json: NewsApiResponse = await res.json()
    return json.data
  } catch {
    return []
  }
}

export async function fetchBySearch(query: string, country: string): Promise<Article[]> {
  try {
    const params = new URLSearchParams({
      api_token: API_TOKEN,
      search: query,
      locale: country,
      limit: '10',
    })

    const res = await fetch(`${BASE_URL}/news/all?${params}`)
    const json: NewsApiResponse = await res.json()
    return json.data
  } catch {
    return []
  }
}
