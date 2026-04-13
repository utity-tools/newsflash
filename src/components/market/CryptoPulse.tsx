import { CRYPTO_PULSE_ITEMS } from '@/data/marketData'

export function CryptoPulse() {
  return (
    <section className="flex flex-col gap-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-size-h2)',
            fontWeight: 700,
            color: 'var(--color-on-surface)',
          }}
        >
          Crypto Pulse
        </h2>
        <button
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-label)',
            color: 'var(--color-on-surface-variant)',
            letterSpacing: '0.08em',
          }}
          className="uppercase hover:opacity-70 transition-opacity"
        >
          View All
        </button>
      </div>

      {/* Items */}
      <div
        className="flex flex-col"
        style={{ border: '0.5px solid var(--color-outline-variant)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}
      >
        {CRYPTO_PULSE_ITEMS.map((item, idx) => (
          <div
            key={item.id}
            className="flex items-start gap-4 p-4"
            style={{
              background: 'var(--color-surface)',
              borderBottom: idx < CRYPTO_PULSE_ITEMS.length - 1 ? '0.5px solid var(--color-outline-variant)' : undefined,
            }}
          >
            {/* Text */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {item.badge === 'LIVE ALERT' && (
                  <span className="flex items-center gap-1">
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: 'var(--color-tertiary)' }}
                    />
                  </span>
                )}
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-label)',
                    color: item.badge === 'LIVE ALERT' ? 'var(--color-tertiary)' : 'var(--color-on-surface-variant)',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                  }}
                  className="uppercase"
                >
                  {item.badge}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-label)',
                    color: 'var(--color-on-surface-variant)',
                  }}
                >
                  · {item.time}
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-on-surface)',
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}
              >
                {item.title}
              </p>
            </div>

            {/* Thumbnail */}
            <div
              className="shrink-0 overflow-hidden"
              style={{ width: 72, height: 72, borderRadius: 'var(--radius-sm)', background: 'var(--color-surface-high)' }}
            >
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
