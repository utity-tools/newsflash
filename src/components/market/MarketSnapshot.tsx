import { MARKET_TICKERS } from '@/data/marketData'
import { Sparkline } from './Sparkline'

function formatValue(v: number): string {
  return v >= 1000
    ? v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : v.toFixed(2)
}

export function MarketSnapshot() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).toUpperCase()

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
          Market Snapshot
        </h2>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-label)',
            color: 'var(--color-on-surface-variant)',
            letterSpacing: '0.08em',
          }}
        >
          {today}
        </span>
      </div>

      {/* Tickers row */}
      <div className="grid grid-cols-2 gap-3">
        {MARKET_TICKERS.map((ticker) => {
          const positive = ticker.changePct >= 0
          const changeColor = positive ? '#4ade80' : 'var(--color-tertiary)'
          return (
            <div
              key={ticker.symbol}
              className="flex flex-col gap-2 p-4"
              style={{
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
                border: '0.5px solid var(--color-outline-variant)',
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-label)',
                    color: 'var(--color-on-surface-variant)',
                    letterSpacing: '0.1em',
                  }}
                  className="uppercase"
                >
                  {ticker.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-label)',
                    color: changeColor,
                    fontWeight: 600,
                  }}
                >
                  {positive ? '+' : ''}{ticker.changePct.toFixed(2)}%
                </span>
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: 'var(--color-on-surface)',
                  lineHeight: 1,
                }}
              >
                {formatValue(ticker.value)}
              </span>

              <div className="flex items-end justify-between">
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-label)',
                    color: changeColor,
                  }}
                >
                  {positive ? '+' : ''}{ticker.change.toFixed(2)}
                </span>
                <Sparkline data={ticker.sparkline} positive={positive} />
              </div>
            </div>
          )
        })}
      </div>

      {/* CTA button */}
      <button
        className="w-full py-3 uppercase tracking-widest transition-opacity hover:opacity-80 active:scale-[0.98]"
        style={{
          background: 'var(--color-tertiary)',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-label)',
          fontWeight: 700,
          color: '#fff',
          letterSpacing: '0.15em',
        }}
      >
        Buy Now
      </button>
    </section>
  )
}
