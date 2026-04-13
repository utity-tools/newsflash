export const config = { runtime: 'edge' }

const BASE_URL = 'https://api.thenewsapi.com/v1'

const ALLOWED_TYPES = new Set(['top', 'search'])
const LOCALE_RE = /^[a-z]{2}(,[a-z]{2})*$/i
const CATEGORY_RE = /^[a-z]+(,[a-z]+)*$/i

function validateParams(searchParams: URLSearchParams): {
  type: string
  locale: string
  category: string
  search: string
  limit: string
  error?: string
} {
  const type = searchParams.get('type') ?? 'top'
  if (!ALLOWED_TYPES.has(type)) {
    return { type: 'top', locale: '', category: '', search: '', limit: '10', error: 'Invalid type parameter' }
  }

  const locale = searchParams.get('locale') ?? ''
  if (locale && !LOCALE_RE.test(locale)) {
    return { type, locale: '', category: '', search: '', limit: '10', error: 'Invalid locale parameter' }
  }

  const category = searchParams.get('category') ?? ''
  if (category && !CATEGORY_RE.test(category)) {
    return { type, locale, category: '', search: '', limit: '10', error: 'Invalid category parameter' }
  }

  const search = (searchParams.get('search') ?? '').slice(0, 200)

  const rawLimit = searchParams.get('limit') ?? '10'
  const parsedLimit = parseInt(rawLimit, 10)
  const limit = String(Number.isFinite(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 50) : 10)

  return { type, locale, category, search, limit }
}

const SECURITY_HEADERS = {
  'Content-Type': 'application/json',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Cache-Control': 'no-store',
}

export default async function handler(request: Request): Promise<Response> {
  const token = process.env.NEWS_API_TOKEN
  if (!token) {
    return new Response(JSON.stringify({ error: 'Missing API token' }), {
      status: 500,
      headers: SECURITY_HEADERS,
    })
  }

  const { searchParams } = new URL(request.url)
  const params = validateParams(searchParams)

  if (params.error) {
    return new Response(JSON.stringify({ error: params.error }), {
      status: 400,
      headers: SECURITY_HEADERS,
    })
  }

  const { type, locale, category, search, limit } = params

  const upstream = new URLSearchParams({ api_token: token, locale, limit })
  if (category) upstream.set('categories', category)

  let endpoint: string
  if (type === 'search') {
    upstream.set('search', search)
    endpoint = `${BASE_URL}/news/all`
  } else {
    endpoint = `${BASE_URL}/news/top`
  }

  try {
    const res = await fetch(`${endpoint}?${upstream}`)
    const json = await res.json()
    return new Response(JSON.stringify(json), {
      status: res.status,
      headers: SECURITY_HEADERS,
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to fetch news' }), {
      status: 502,
      headers: SECURITY_HEADERS,
    })
  }
}
