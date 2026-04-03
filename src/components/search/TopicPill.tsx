import { Badge } from '@/components/ui/badge'
import type { Topic } from '@/types'

interface TopicPillProps {
  topic: Topic
  isSelected: boolean
  onClick: () => void
}

export function TopicPill({ topic, isSelected, onClick }: TopicPillProps) {
  return (
    <Badge
      className={[
        'cursor-pointer transition-all px-3 py-1 h-auto text-sm rounded-full border-0 select-none',
        isSelected
          ? 'bg-white text-zinc-950 hover:bg-white'
          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700',
      ].join(' ')}
      onClick={onClick}
    >
      {topic.label}
    </Badge>
  )
}
