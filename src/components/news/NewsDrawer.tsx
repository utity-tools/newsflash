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
            style={{ background: '#111111', borderLeft: '0.5px solid var(--color-lead)' }}
          >
            {/* Header bar */}
            <div
              className="flex items-center justify-between px-6 py-4 shrink-0"
              style={{ borderBottom: '0.5px solid var(--color-lead)' }}
            >
              <span
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-label)', color: 'var(--color-lead)' }}
                className="uppercase tracking-widest"
              >
                The Paperboy
              </span>
              <button
                onClick={onClose}
                aria-label="Close article"
                className="text-[var(--color-lead)] hover:text-[var(--color-newsprint)] transition-colors text-xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">

              {/* Hero image */}
              {article.image_url && (
                <div className="w-full aspect-video overflow-hidden bg-zinc-900">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
              )}

              <div className="px-6 py-8 flex flex-col gap-5">

                {/* Categories */}
                {article.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {article.categories.map((cat) => (
                      <span
                        key={cat}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-label)',
                          color: 'var(--color-press-red)',
                          border: '0.5px solid var(--color-press-red)',
                          borderRadius: 'var(--radius-sm)',
                        }}
                        className="uppercase tracking-widest px-2 py-0.5"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px, 4vw, 32px)',
                    fontWeight: 700,
                    color: 'var(--color-newsprint)',
                    lineHeight: 1.25,
                  }}
                >
                  {article.title}
                </h2>

                {/* Meta row */}
                <div
                  className="flex flex-wrap items-center gap-x-4 gap-y-1"
                  style={{ borderTop: '0.5px solid var(--color-lead)', borderBottom: '0.5px solid var(--color-lead)', padding: '10px 0' }}
                >
                  <span
                    style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-meta)', color: 'var(--color-newsprint)', fontWeight: 600 }}
                  >
                    {article.source}
                  </span>
                  <span style={{ color: 'var(--color-lead)', fontSize: 'var(--font-size-meta)' }}>·</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-meta)', color: 'var(--color-lead)' }}>
                    {formatFullDate(article.published_at)}
                  </span>
                  {article.language && (
                    <>
                      <span style={{ color: 'var(--color-lead)', fontSize: 'var(--font-size-meta)' }}>·</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-meta)', color: 'var(--color-lead)' }} className="uppercase">
                        {article.language}
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                {article.description && (
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '16px',
                      color: 'var(--color-newsprint)',
                      lineHeight: 1.7,
                      fontWeight: 500,
                    }}
                  >
                    {article.description}
                  </p>
                )}

                {/* Snippet / body */}
                {article.snippet && article.snippet !== article.description && (
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body)',
                      color: 'var(--color-column)',
                      lineHeight: 1.8,
                    }}
                  >
                    {article.snippet}
                  </p>
                )}

                {/* Keywords */}
                {article.keywords && (
                  <div className="flex flex-col gap-2">
                    <span
                      style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-label)', color: 'var(--color-lead)' }}
                      className="uppercase tracking-widest"
                    >
                      Keywords
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {article.keywords.split(',').map((kw) => kw.trim()).filter(Boolean).map((kw) => (
                        <span
                          key={kw}
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-label)',
                            color: 'var(--color-lead)',
                            border: '0.5px solid #333',
                            borderRadius: 'var(--radius-sm)',
                          }}
                          className="px-2 py-0.5"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Footer CTA */}
            <div
              className="px-6 py-5 shrink-0"
              style={{ borderTop: '0.5px solid var(--color-lead)' }}
            >
              <button
                onClick={handleLinkClick}
                className="w-full py-3 text-center transition-opacity hover:opacity-80"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-ink)',
                  background: 'var(--color-newsprint)',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
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
