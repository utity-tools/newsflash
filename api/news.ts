export const config = { runtime: 'edge' }

const BASE_URL = 'https://api.thenewsapi.com/v1'

export default async function handler(request: Request): Promise<Response> {
  const token = process.env.NEWS_API_TOKEN || process.env.VITE_NEWS_API_TOKEN
  if (!token) {
    return new Response(JSON.stringify({ error: 'Missing API token' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') ?? 'top'
  const locale = searchParams.get('locale') ?? ''
  const category = searchParams.get('category') ?? ''
  const search = searchParams.get('search') ?? ''
  const limit = searchParams.get('limit') ?? '10'

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
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
