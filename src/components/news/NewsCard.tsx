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
    <div
      className="border-b border-zinc-900 py-6 cursor-pointer group"
      onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
    >
      <p className="text-white font-medium text-base leading-snug group-hover:text-zinc-300 transition-colors">
        {article.title}
      </p>
      {article.description && (
        <p className="text-zinc-600 text-sm mt-1 line-clamp-2">{article.description}</p>
      )}
      <div className="flex gap-4 mt-3 text-zinc-700 text-xs">
        <span>{article.source}</span>
        <span>{relativeTime(article.published_at)}</span>
      </div>
    </div>
  )
}
