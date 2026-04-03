import { Card, CardContent } from '@/components/ui/card'
import type { Article } from '@/types'

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

interface NewsCardProps {
  article: Article
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Card
      className="bg-zinc-900 border-zinc-800 hover:border-zinc-600 transition-all cursor-pointer gap-0 py-0"
      onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
    >
      {article.image_url ? (
        <img
          src={article.image_url}
          alt={article.title}
          className="aspect-video w-full object-cover rounded-t-xl"
        />
      ) : (
        <div className="aspect-video w-full bg-zinc-800 rounded-t-xl" />
      )}
      <CardContent className="flex flex-col gap-2 py-4">
        <p className="text-sm font-semibold text-white leading-snug line-clamp-2">
          {article.title}
        </p>
        {article.description && (
          <p className="text-xs text-zinc-400 line-clamp-2">{article.description}</p>
        )}
        <div className="flex items-center justify-between text-xs text-zinc-500 mt-1">
          <span>{article.source}</span>
          <span>{relativeTime(article.published_at)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
