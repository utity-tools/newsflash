interface TopHeaderProps {
  onSearchFocus: () => void
}

export function TopHeader({ onSearchFocus }: TopHeaderProps) {
  return (
    <header
      className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4"
      style={{ background: 'rgba(14,14,14,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
    >
      <button
        aria-label="Menu"
        className="w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-60"
        style={{ color: 'var(--color-primary)' }}
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      <h1
        className="italic text-2xl"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-on-surface)' }}
      >
        The Paperboy
      </h1>

      <button
        aria-label="Search"
        onClick={onSearchFocus}
        className="w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-60"
        style={{ color: 'var(--color-primary)' }}
      >
        <span className="material-symbols-outlined">search</span>
      </button>
    </header>
  )
}
