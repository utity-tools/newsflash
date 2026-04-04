import type { Article } from '@/types'
import { NewsCard } from './NewsCard'

interface NewsListProps {
  articles: Article[]
  loading: boolean
}

export function NewsList({ articles, loading }: NewsListProps) {
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border-b border-zinc-900 py-6 flex flex-col gap-2">
            <div className="h-4 bg-zinc-900 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-zinc-900 rounded animate-pulse w-full" />
            <div className="h-3 bg-zinc-900 rounded animate-pulse w-1/4 mt-1" />
          </div>
        ))}
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-zinc-700 text-sm">
        no results found
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {articles.map((article) => (
        <NewsCard key={article.uuid} article={article} />
      ))}
    </div>
  )
}
