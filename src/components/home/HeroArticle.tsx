import type { Article } from '@/types'
import { relativeTime, estimateReadTime } from '@/lib/relativeTime'

interface HeroArticleProps {
  article: Article
  onClick: (article: Article) => void
}

export function HeroArticle({ article, onClick }: HeroArticleProps) {
  const readTime = estimateReadTime(`${article.title} ${article.description} ${article.snippet ?? ''}`)

  return (
    <div
      className="relative group cursor-pointer overflow-hidden"
      style={{ borderRadius: 'var(--radius-md)' }}
      onClick={() => onClick(article)}
    >
      {/* LIVE badge */}
      <div
        className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1"
        style={{
          background: 'rgba(255,113,108,0.15)',
          backdropFilter: 'blur(12px)',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(255,113,108,0.3)',
        }}
      >
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: 'var(--color-tertiary)' }}
        />
        <span
          className="uppercase"
          style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-label)', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--color-tertiary)' }}
        >
          LIVE
        </span>
      </div>

      {/* Image */}
      <div className="aspect-[4/5] relative">
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 transition-transform duration-700"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        ) : (
          <div className="w-full h-full" style={{ background: 'var(--color-surface)' }} />
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #0e0e0e 0%, transparent 50%)' }}
        />

        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 p-8 w-full">
          {article.categories[0] && (
            <span
              className="block uppercase mb-3"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-label)',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: 'var(--color-primary)',
              }}
            >
              BREAKING NEWS
            </span>
          )}

          <h2
            className="leading-tight mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(22px, 5vw, 30px)',
              fontWeight: 700,
              color: 'var(--color-on-surface)',
            }}
          >
            {article.title}
          </h2>

          <div className="flex items-center justify-between">
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-meta)', color: 'var(--color-on-surface-variant)', fontWeight: 500 }}>
              {readTime} MIN READ · {relativeTime(article.published_at).toUpperCase()}
            </span>
            <span
              className="material-symbols-outlined group-hover:translate-x-2 transition-transform duration-300"
              style={{ color: 'var(--color-primary)' }}
            >
              arrow_forward
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroArticleSkeleton() {
  return (
    <div className="aspect-[4/5] rounded-xl overflow-hidden" style={{ background: 'var(--color-surface)' }}>
      <div className="w-full h-full animate-pulse" style={{ background: 'var(--color-surface-high)' }} />
    </div>
  )
}
