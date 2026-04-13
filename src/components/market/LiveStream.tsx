import { useState } from 'react'

const CHANNEL_URL = 'https://www.youtube.com/watch?v=9XMouyXI-Zo'
const EMBED_URL = 'https://www.youtube-nocookie.com/embed/9XMouyXI-Zo?autoplay=1&mute=1'

export function LiveStream() {
  const [loaded, setLoaded] = useState(false)

  return (
    <section className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
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

        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:opacity-70 transition-opacity"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-label)',
            color: 'var(--color-on-surface-variant)',
            letterSpacing: '0.08em',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>open_in_new</span>
          YouTube
        </a>
      </div>

      {/* 16:9 container */}
      <div
        style={{
          position: 'relative',
          paddingBottom: '56.25%',
          height: 0,
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          border: '0.5px solid var(--color-outline-variant)',
          background: 'var(--color-surface)',
        }}
      >
        {loaded ? (
          <iframe
            src={EMBED_URL}
            title="Negocios TV en directo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
          />
        ) : (
          /* Preview / click-to-load */
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 cursor-pointer group"
            onClick={() => setLoaded(true)}
            style={{ background: '#0a0a0a' }}
          >
            {/* YouTube play button */}
            <div
              className="w-16 h-16 flex items-center justify-center rounded-full transition-transform group-hover:scale-110 duration-200"
              style={{ background: 'var(--color-tertiary)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#fff', fontVariationSettings: "'FILL' 1" }}>
                play_arrow
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--color-on-surface)',
                }}
              >
                Negocios TV
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-label)',
                  color: 'var(--color-on-surface-variant)',
                }}
              >
                Toca para cargar el directo
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
