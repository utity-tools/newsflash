import type { Article } from '@/types'
import { relativeTime } from '@/lib/relativeTime'

interface NewsCardProps {
  article: Article
  onClick: (article: Article) => void
}

export function NewsCard({ article, onClick }: NewsCardProps) {
  return (
    <div
      style={{ borderBottom: 'var(--border-default)', fontFamily: 'var(--font-body)' }}
      className="py-5 cursor-pointer group"
      onClick={() => onClick(article)}
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
