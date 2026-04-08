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
      className="absolute cursor-pointer transition-colors uppercase"
      style={{
        ...position,
        background: isSelected ? 'var(--color-newsprint)' : 'transparent',
        color: isSelected ? 'var(--color-ink)' : 'var(--color-lead)',
        borderWidth: '0.5px',
        borderStyle: 'solid',
        borderColor: isSelected ? 'var(--color-newsprint)' : 'rgba(140,136,128,0.4)',
        borderRadius: '100px',
        padding: '6px 16px',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--font-size-label)',
        letterSpacing: '0.15em',
      }}
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
