export function NewsletterCTA() {
  return (
    <section
      className="p-8 text-center"
      style={{
        background: 'var(--color-surface-low)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid rgba(72,72,72,0.15)',
      }}
    >
      <span
        className="material-symbols-outlined block mb-4 text-3xl"
        style={{ color: 'var(--color-primary)' }}
      >
        mark_as_unread
      </span>

      <h3
        className="mb-2"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-h1)', fontWeight: 700, color: 'var(--color-on-surface)' }}
      >
        Get the Morning Fold
      </h3>

      <p
        className="mb-6 mx-auto max-w-xs"
        style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body)', color: 'var(--color-on-surface-variant)' }}
      >
        The most important stories, curated for your morning coffee.
      </p>

      <button
        className="w-full py-3 px-6 uppercase transition-transform active:scale-95 duration-200"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-container))',
          borderRadius: 'var(--radius-full)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-label)',
          fontWeight: 700,
          letterSpacing: '0.15em',
          color: '#0e0e0e',
        }}
      >
        Subscribe Now
      </button>
    </section>
  )
}
