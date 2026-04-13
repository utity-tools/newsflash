import type { Article } from '@/types'

interface ArticleGridProps {
  articles: Article[]
  loading: boolean
  onClick: (article: Article) => void
}

function GridCard({ article, onClick }: { article: Article; onClick: (a: Article) => void }) {
  return (
    <article
      className="space-y-3 group cursor-pointer"
      onClick={() => onClick(article)}
    >
      <div className="aspect-square overflow-hidden" style={{ borderRadius: 'var(--radius-md)' }}>
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            onError={(e) => {
              const parent = (e.currentTarget as HTMLImageElement).parentElement
              if (parent) parent.style.background = 'var(--color-surface-high)'
              ;(e.currentTarget as HTMLImageElement).style.display = 'none'
            }}
          />
        ) : (
          <div className="w-full h-full" style={{ background: 'var(--color-surface-high)' }} />
        )}
      </div>

      <h4
        className="leading-snug"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-h2)', fontWeight: 700, color: 'var(--color-on-surface)' }}
      >
        {article.title}
      </h4>

      {article.description && (
        <p
          className="line-clamp-2"
          style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-meta)', color: 'var(--color-on-surface-variant)' }}
        >
          {article.description}
        </p>
      )}
    </article>
  )
}

function GridCardSkeleton() {
  return (
    <div className="space-y-3">
      <div className="aspect-square rounded-xl animate-pulse" style={{ background: 'var(--color-surface-high)' }} />
      <div className="h-4 rounded animate-pulse w-4/5" style={{ background: 'var(--color-surface-high)' }} />
      <div className="h-3 rounded animate-pulse w-full" style={{ background: 'var(--color-surface-high)' }} />
    </div>
  )
}

export function ArticleGrid({ articles, loading, onClick }: ArticleGridProps) {
  return (
    <section>
      {/* Section header */}
      <div className="col-span-2 flex items-baseline gap-4 mb-6">
        <h3
          className="italic shrink-0"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-h2)', fontWeight: 700, color: 'var(--color-on-surface)' }}
        >
          Latest Editions
        </h3>
        <div className="flex-1 h-px" style={{ background: 'rgba(72,72,72,0.3)' }} />
        <span
          className="shrink-0 uppercase"
          style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-label)', fontWeight: 700, color: 'var(--color-on-surface-variant)' }}
        >
          VIEW ALL
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <GridCardSkeleton key={i} />)
          : articles.map((article) => (
              <GridCard key={article.uuid} article={article} onClick={onClick} />
            ))}
      </div>
    </section>
  )
}
