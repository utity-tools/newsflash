const CHANNEL_ID = 'UCvN5Z0_CCskZ0mueyv67YpA'

export function LiveStream() {
  return (
    <section className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: 'var(--color-tertiary)' }}
          />
          <span
            className="uppercase"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-label)',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: 'var(--color-tertiary)',
            }}
          >
            En directo
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-size-h2)',
            fontWeight: 700,
            color: 'var(--color-on-surface)',
          }}
        >
          Negocios TV
        </span>
      </div>

      {/* 16:9 iframe container */}
      <div
        className="overflow-hidden"
        style={{
          position: 'relative',
          paddingBottom: '56.25%',
          height: 0,
          borderRadius: 'var(--radius-md)',
          border: '0.5px solid var(--color-outline-variant)',
          background: 'var(--color-surface)',
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/live_stream?channel=${CHANNEL_ID}&autoplay=1&mute=1`}
          title="Negocios TV en directo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </section>
  )
}
