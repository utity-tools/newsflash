import { Skeleton } from '@/components/ui/skeleton'
import type { Article } from '@/types'
import { NewsCard } from './NewsCard'

interface NewsListProps {
  articles: Article[]
  loading: boolean
}

export function NewsList({ articles, loading }: NewsListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
            <Skeleton className="aspect-video w-full rounded-none bg-zinc-800" />
            <div className="p-4 flex flex-col gap-2">
              <Skeleton className="h-4 w-full bg-zinc-800" />
              <Skeleton className="h-4 w-3/4 bg-zinc-800" />
              <Skeleton className="h-3 w-1/2 bg-zinc-800 mt-1" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-zinc-500">
        No news found
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article) => (
        <NewsCard key={article.uuid} article={article} />
      ))}
    </div>
  )
}
