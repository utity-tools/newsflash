import { motion } from 'framer-motion'
import type { Article } from '@/types'

interface LiveTickerProps {
  articles: Article[]
}

export function LiveTicker({ articles }: LiveTickerProps) {
  const text = articles.length > 0
    ? articles.map((a) => a.title).join('  ·  ')
    : 'loading headlines...'

  return (
    <div className="flex items-center overflow-hidden max-w-xl w-full">
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-label)',
          color: 'var(--color-press-red)',
          letterSpacing: '0.2em',
        }}
        className="uppercase shrink-0 mr-4"
      >
        · live ·
      </span>
      <div className="overflow-hidden flex-1">
        <motion.p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-meta)',
            color: 'var(--color-lead)',
          }}
          className="whitespace-nowrap"
          animate={{ x: ['0%', '-100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {text}
        </motion.p>
      </div>
    </div>
  )
}
