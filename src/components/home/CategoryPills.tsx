import { TOPICS } from '@/data/topics'
import type { Topic } from '@/types'

interface CategoryPillsProps {
  selected: Topic | null
  onSelect: (topic: Topic & { color: string }) => void
}

export function CategoryPills({ selected, onSelect }: CategoryPillsProps) {
  return (
    <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2">
      {TOPICS.map((topic) => {
        const isActive = selected?.id === topic.id
        return (
          <button
            key={topic.id}
            onClick={() => onSelect(topic)}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 transition-all active:scale-95 duration-200"
            style={{
              borderRadius: 'var(--radius-full)',
              background: isActive ? 'var(--color-primary)' : 'var(--color-surface-high)',
              border: `1px solid ${isActive ? 'transparent' : 'rgba(72,72,72,0.4)'}`,
              color: isActive ? '#0e0e0e' : 'var(--color-on-surface)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-label)',
              fontWeight: 700,
              letterSpacing: '0.1em',
            }}
          >
            <span>{topic.label}</span>
          </button>
        )
      })}
    </div>
  )
}
