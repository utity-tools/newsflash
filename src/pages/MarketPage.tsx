import { useState } from 'react'
import { MarketSnapshot } from '@/components/market/MarketSnapshot'
import { CryptoPulse } from '@/components/market/CryptoPulse'
import { NewsDrawer } from '@/components/news/NewsDrawer'
import { useNews } from '@/hooks/useNews'
import { relativeTime } from '@/lib/relativeTime'
import type { Article } from '@/types'

interface MarketPageProps {
  country: string
}

function MarketHero({ article, onClick }: { article: Article; onClick: (a: Article) => void }) {
  return (
    <div
      className="relative overflow-hidden cursor-pointer group"
      style={{ borderRadius: 'var(--radius-md)' }}
      onClick={() => onClick(article)}
    >
      <div className="aspect-[16/9] relative">
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 transition-transform duration-700"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        ) : (
          <div className="w-full h-full" style={{ background: 'var(--color-surface-high)' }} />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #0e0e0e 10%, transparent 60%)' }}
        />

        {/* TRENDING badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1 uppercase"
          style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
            borderRadius: 'var(--radius-full)',
            border: '0.5px solid rgba(255,255,255,0.2)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-label)',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: 'var(--color-on-surface)',
          }}
        >
          Trending
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 w-full p-5">
          <h3
            className="leading-tight mb-2"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 4vw, 24px)',
              fontWeight: 700,
              color: 'var(--color-on-surface)',
            }}
          >
            {article.title}
          </h3>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-meta)',
              color: 'var(--color-on-surface-variant)',
            }}
          >
            {article.source} · {relativeTime(article.published_at)}
          </span>
        </div>
      </div>
    </div>
  )
}

function MarketArticleCard({ article, onClick }: { article: Article; onClick: (a: Article) => void }) {
  return (
    <div
      className="flex flex-col overflow-hidden cursor-pointer group"
      style={{ borderRadius: 'var(--radius-md)', background: 'var(--color-surface)', border: '0.5px solid var(--color-outline-variant)' }}
      onClick={() => onClick(article)}
    >
      <div className="aspect-[16/10] overflow-hidden" style={{ background: 'var(--color-surface-high)' }}>
        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        )}
      </div>
      <div className="p-3 flex flex-col gap-1">
        <p
          className="leading-snug"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '14px',
            fontWeight: 700,
            color: 'var(--color-on-surface)',
          }}
        >
          {article.title}
        </p>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-label)',
            color: 'var(--color-on-surface-variant)',
          }}
        >
          {relativeTime(article.published_at)}
        </span>
      </div>
    </div>
  )
}

function MarketArticleRow({ article, onClick, badge }: { article: Article; onClick: (a: Article) => void; badge?: string }) {
  return (
    <div
      className="flex items-start gap-4 py-4 cursor-pointer"
      style={{ borderBottom: '0.5px solid var(--color-outline-variant)' }}
      onClick={() => onClick(article)}
    >
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-label)',
              color: 'var(--color-on-surface-variant)',
              letterSpacing: '0.08em',
              fontWeight: 600,
            }}
            className="uppercase"
          >
            {badge ?? 'Markets'} · {relativeTime(article.published_at).toUpperCase()}
          </span>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body)',
            fontWeight: 500,
            color: 'var(--color-on-surface)',
            lineHeight: 1.5,
          }}
        >
          {article.description || article.title}
        </p>
      </div>
      {article.image_url && (
        <div
          className="shrink-0 overflow-hidden"
          style={{ width: 64, height: 64, borderRadius: 'var(--radius-sm)', background: 'var(--color-surface-high)' }}
        >
          <img
            src={article.image_url}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        </div>
      )}
    </div>
  )
}

function MarketSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="h-6 w-40 rounded" style={{ background: 'var(--color-surface-high)' }} />
      <div className="grid grid-cols-2 gap-3">
        {[0, 1].map((i) => (
          <div key={i} className="h-28 rounded-xl" style={{ background: 'var(--color-surface)' }} />
        ))}
      </div>
      <div className="h-48 rounded-xl" style={{ background: 'var(--color-surface)' }} />
    </div>
  )
}

export function MarketPage({ country }: MarketPageProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const { articles, loading } = useNews({ country, category: 'business' })

  const [hero, card1, card2, ...rest] = articles

  const BADGES = ['Description', 'Analysis', 'Resolution', 'Report', 'Update']

  return (
    <>
      <main className="pt-20 pb-28 px-4 max-w-2xl mx-auto flex flex-col gap-8">
        <MarketSnapshot />

        {loading ? (
          <MarketSkeleton />
        ) : (
          <>
            {/* Hero article */}
            {hero && <MarketHero article={hero} onClick={setSelectedArticle} />}

            {/* 2-col article grid */}
            {(card1 || card2) && (
              <div className="grid grid-cols-2 gap-3">
                {card1 && <MarketArticleCard article={card1} onClick={setSelectedArticle} />}
                {card2 && <MarketArticleCard article={card2} onClick={setSelectedArticle} />}
              </div>
            )}

            {/* Crypto Pulse */}
            <CryptoPulse />

            {/* Article rows */}
            {rest.length > 0 && (
              <section className="flex flex-col">
                {rest.slice(0, 4).map((article, i) => (
                  <MarketArticleRow
                    key={article.uuid}
                    article={article}
                    onClick={setSelectedArticle}
                    badge={BADGES[i % BADGES.length]}
                  />
                ))}
              </section>
            )}
          </>
        )}
      </main>

      <NewsDrawer article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </>
  )
}
