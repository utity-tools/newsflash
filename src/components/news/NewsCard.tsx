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
      style={{ borderBottom: 'var(--border-default)', fontFamily: 'var(--font-body)' }}
      className="py-5 cursor-pointer group"
      onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
    >
      {article.categories[0] && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-label)',
            color: 'var(--color-press-red)',
          }}
          className="uppercase tracking-widest mb-2"
        >
          {article.categories[0]}
        </p>
      )}

      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--font-size-h1)',
          fontWeight: 700,
          color: 'var(--color-newsprint)',
        }}
        className="leading-snug group-hover:opacity-70 transition-opacity mb-2"
      >
        {article.title}
      </p>

      {article.description && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-lead)',
          }}
          className="line-clamp-2 mb-3"
        >
          {article.description}
        </p>
      )}

      <div className="flex justify-between items-center">
        <span style={{ fontSize: 'var(--font-size-meta)', color: 'var(--color-lead)' }}>
          {article.source}
        </span>
        <span style={{ fontSize: 'var(--font-size-meta)', color: 'var(--color-lead)' }}>
          {relativeTime(article.published_at)}
        </span>
      </div>
    </div>
  )
}
