import { motion } from 'framer-motion'
import type { Topic } from '@/types'

const POSITIONS = [
  { top: '15%', left: '8%' },
  { top: '25%', left: '22%' },
  { top: '18%', right: '12%' },
  { top: '35%', right: '25%' },
  { top: '60%', left: '5%' },
  { top: '65%', left: '25%' },
  { top: '58%', right: '8%' },
  { top: '70%', right: '28%' },
]

interface FloatingPillProps {
  topic: Topic & { color: string }
  index: number
  isSelected: boolean
  onClick: () => void
}

export function FloatingPill({ topic, index, isSelected, onClick }: FloatingPillProps) {
  const position = POSITIONS[index] ?? POSITIONS[0]

  return (
    <motion.button
      onClick={onClick}
      className={[
        'absolute rounded-full px-4 py-1.5 text-sm cursor-pointer transition-colors',
        isSelected
          ? 'bg-white text-zinc-950 border border-transparent'
          : 'bg-transparent border border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300',
      ].join(' ')}
      style={position}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -4, 0, 4, 0] }}
      transition={{
        opacity: { delay: index * 0.08, duration: 0.4 },
        y: {
          delay: index * 0.08,
          duration: 3 + index * 0.4,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        },
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {topic.label}
    </motion.button>
  )
}
