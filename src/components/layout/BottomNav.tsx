export type Tab = 'home' | 'market' | 'bookmarks' | 'profile'

interface BottomNavProps {
  activeTab?: Tab
  onTabChange?: (tab: Tab) => void
}

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: 'home', icon: 'home', label: 'Home' },
  { id: 'market', icon: 'candlestick_chart', label: 'Market' },
  { id: 'bookmarks', icon: 'bookmarks', label: 'Saved' },
  { id: 'profile', icon: 'person', label: 'Profile' },
]

export function BottomNav({ activeTab = 'home', onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 w-full z-50 flex justify-around items-center px-8 py-4"
      style={{
        background: 'rgba(14,14,14,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '20px 20px 0 0',
        boxShadow: '0 -8px 32px rgba(0,0,0,0.5)',
      }}
    >
      {TABS.map(({ id, icon, label }) => {
        const isActive = id === activeTab
        return (
          <button
            key={id}
            aria-label={label}
            onClick={() => onTabChange?.(id)}
            className="w-12 h-12 flex items-center justify-center rounded-full transition-all active:scale-90 duration-200"
            style={
              isActive
                ? {
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-container))',
                    color: '#0e0e0e',
                  }
                : {
                    color: 'var(--color-outline-variant)',
                  }
            }
          >
            <span
              className="material-symbols-outlined"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {icon}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
