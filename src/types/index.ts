export interface Article {
  uuid: string
  title: string
  description: string
  snippet: string
  keywords: string
  url: string
  image_url: string
  published_at: string
  source: string
  categories: string[]
  language: string
  relevance_score: number | null
}

export interface NewsApiResponse {
  data: Article[]
  meta: {
    found: number
    returned: number
    limit: number
    page: number
  }
}

export interface Country {
  code: string
  name: string
  flag: string
  locale: string
}

export interface Topic {
  id: string
  label: string
  category: string
}
