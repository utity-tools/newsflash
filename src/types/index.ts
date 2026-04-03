export interface Article {
  uuid: string
  title: string
  description: string
  url: string
  image_url: string
  published_at: string
  source: string
  categories: string[]
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
