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
      <span className="text-zinc-700 text-xs mr-4 shrink-0">· live ·</span>
      <div className="overflow-hidden flex-1">
        <motion.p
          className="text-zinc-500 text-xs whitespace-nowrap"
          animate={{ x: ['0%', '-100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {text}
        </motion.p>
      </div>
    </div>
  )
}
