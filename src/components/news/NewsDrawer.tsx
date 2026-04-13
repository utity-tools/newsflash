import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Article } from '@/types'

interface NewsDrawerProps {
  article: Article | null
  onClose: () => void
}

function formatFullDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function isRecent(dateStr: string): boolean {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  return diffMs < 2 * 60 * 60 * 1000 // less than 2 hours
}

export function NewsDrawer({ article, onClose }: NewsDrawerProps) {
  useEffect(() => {
    if (!article) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [article, onClose])

  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [article])

  function handleLinkClick() {
    if (!article) return
    try {
      const parsed = new URL(article.url)
      if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return
      window.open(article.url, '_blank', 'noopener,noreferrer')
    } catch {
      // invalid URL — do nothing
    }
  }

  return (
    <AnimatePresence>
      {article && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label={article.title}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 38 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-2xl flex flex-col overflow-hidden"
            style={{
              background: 'var(--color-bg)',
              borderLeft: '0.5px solid var(--color-outline-variant)',
            }}
          >
            {/* Header bar — styled like TopHeader */}
            <div
              className="flex items-center justify-between px-6 py-4 shrink-0"
              style={{ borderBottom: '0.5px solid var(--color-outline-variant)' }}
            >
              <h2
                className="italic"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--color-on-surface)',
                }}
              >
                The Paperboy
              </h2>

              <button
                onClick={onClose}
                aria-label="Close article"
                className="w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-60"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto hide-scrollbar">

              {/* Hero image — full-bleed with gradient overlay */}
              {article.image_url && (
                <div className="w-full relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const wrapper = (e.currentTarget as HTMLImageElement).parentElement
                      if (wrapper) wrapper.style.display = 'none'
                    }}
                  />
                  {/* Dark gradient overlay at bottom */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(14,14,14,0.85) 0%, transparent 55%)',
                    }}
                  />
                  {/* LIVE badge */}
                  {isRecent(article.published_at) && (
                    <div
                      className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1"
                      style={{
                        background: 'rgba(255,113,108,0.15)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
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
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-label)',
                          fontWeight: 700,
                          letterSpacing: '0.2em',
                          color: 'var(--color-tertiary)',
                        }}
                      >
                        LIVE
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="px-6 py-8 flex flex-col gap-6">

                {/* Category chips */}
                {article.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {article.categories.map((cat) => (
                      <span
                        key={cat}
                        className="uppercase tracking-widest px-2 py-0.5"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-label)',
                          fontWeight: 700,
                          letterSpacing: '0.2em',
                          color: 'var(--color-tertiary)',
                          border: '0.5px solid rgba(255,113,108,0.35)',
                          borderRadius: 'var(--radius-sm)',
                        }}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title — editorial, Newsreader italic */}
                <h3
                  className="italic leading-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(24px, 5vw, 36px)',
                    fontWeight: 700,
                    color: 'var(--color-on-surface)',
                    lineHeight: 1.2,
                  }}
                >
                  {article.title}
                </h3>

                {/* Meta row — source + date + language */}
                <div
                  className="flex flex-wrap items-center gap-x-4 gap-y-1"
                  style={{
                    borderTop: '0.5px solid var(--color-outline-variant)',
                    borderBottom: '0.5px solid var(--color-outline-variant)',
                    padding: '10px 0',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-meta)',
                      color: 'var(--color-on-surface)',
                      fontWeight: 700,
                    }}
                  >
                    {article.source}
                  </span>
                  <span style={{ color: 'var(--color-outline)', fontSize: 'var(--font-size-meta)' }}>·</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-meta)',
                      color: 'var(--color-on-surface-variant)',
                    }}
                  >
                    {formatFullDate(article.published_at)}
                  </span>
                  {article.language && (
                    <>
                      <span style={{ color: 'var(--color-outline)', fontSize: 'var(--font-size-meta)' }}>·</span>
                      <span
                        className="uppercase"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-meta)',
                          color: 'var(--color-on-surface-variant)',
                        }}
                      >
                        {article.language}
                      </span>
                    </>
                  )}
                </div>

                {/* Description — newspaper lede */}
                {article.description && (
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '17px',
                      color: 'var(--color-on-surface)',
                      lineHeight: 1.7,
                      fontWeight: 500,
                    }}
                  >
                    {article.description}
                  </p>
                )}

                {/* Snippet — body copy with press-red left border */}
                {article.snippet && article.snippet !== article.description && (
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      color: 'var(--color-on-surface-variant)',
                      lineHeight: 1.8,
                      paddingLeft: '16px',
                      borderLeft: '2px solid var(--color-tertiary)',
                    }}
                  >
                    {article.snippet}
                  </p>
                )}

                {/* Keywords — subtle muted tags at the bottom */}
                {article.keywords && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {article.keywords
                      .split(',')
                      .map((kw) => kw.trim())
                      .filter(Boolean)
                      .map((kw) => (
                        <span
                          key={kw}
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-label)',
                            color: 'var(--color-outline)',
                            border: '0.5px solid var(--color-outline-variant)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '2px 6px',
                          }}
                        >
                          {kw}
                        </span>
                      ))}
                  </div>
                )}

              </div>
            </div>

            {/* Footer CTA — prominent editorial button */}
            <div
              className="px-6 py-5 shrink-0"
              style={{ borderTop: '0.5px solid var(--color-outline-variant)' }}
            >
              <button
                onClick={handleLinkClick}
                className="w-full py-4 text-center transition-opacity hover:opacity-85 active:opacity-70"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'var(--color-bg)',
                  background: 'var(--color-on-surface)',
                  borderRadius: 'var(--radius-md)',
                  letterSpacing: '0.02em',
                }}
              >
                Read full article at {article.source} →
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
