import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config/site'

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0b0b0f',
          color: '#f5f3ef',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Molten glow — primary ember bloom */}
        <div
          style={{
            position: 'absolute',
            top: -260,
            right: -200,
            width: 900,
            height: 900,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,106,0,0.55) 0%, rgba(255,158,44,0.20) 35%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
        {/* Teal spark — secondary accent */}
        <div
          style={{
            position: 'absolute',
            bottom: -300,
            left: -180,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(20,224,192,0.30) 0%, transparent 65%)',
            filter: 'blur(30px)',
          }}
        />
        {/* Hairline grid floor */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(to right, rgba(245,243,239,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,243,239,0.05) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 75%)',
          }}
        />

        {/* Header — wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '56px 72px 0',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'linear-gradient(180deg, #ff9e2c 0%, #ff6a00 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.18), 0 6px 32px rgba(255,106,0,0.45)',
            }}
          >
            <div
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: '#0b0b0f',
                letterSpacing: -1.5,
                lineHeight: 1,
                transform: 'translateY(-1px)',
              }}
            >
              C
            </div>
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: -0.5,
              color: '#f5f3ef',
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 18px',
              borderRadius: 999,
              border: '1px solid rgba(245,243,239,0.10)',
              fontSize: 18,
              color: '#a3a1ac',
              fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#14e0c0',
                boxShadow: '0 0 12px #14e0c0',
              }}
            />
            forging clips
          </div>
        </div>

        {/* Hero — headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0 72px',
            marginTop: 'auto',
            marginBottom: 'auto',
            gap: 28,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 1.02,
              color: '#f5f3ef',
            }}
          >
            <div style={{ display: 'flex' }}>Forge one video</div>
            <div style={{ display: 'flex' }}>
              into{' '}
              <span
                style={{
                  marginLeft: 22,
                  backgroundImage: 'linear-gradient(100deg, #ffce4d 0%, #ff6a00 55%, #ff9e2c 100%)',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                a hundred clips.
              </span>
            </div>
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: '#a3a1ac',
              maxWidth: 880,
              letterSpacing: -0.2,
            }}
          >
            Platform-ready shorts, captions, and thumbnails — automatically.
            Repurpose once, publish everywhere.
          </div>
        </div>

        {/* Footer strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 72px 56px',
            fontSize: 20,
            color: '#6c6a76',
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                background: 'rgba(255,106,0,0.12)',
                color: '#ff9e2c',
                border: '1px solid rgba(255,106,0,0.30)',
              }}
            >
              AI captions
            </div>
            <div
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                background: 'rgba(20,224,192,0.10)',
                color: '#14e0c0',
                border: '1px solid rgba(20,224,192,0.30)',
              }}
            >
              Auto thumbnails
            </div>
            <div
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                background: 'rgba(245,243,239,0.06)',
                color: '#f5f3ef',
                border: '1px solid rgba(245,243,239,0.12)',
              }}
            >
              4K exports
            </div>
          </div>
          <div style={{ display: 'flex' }}>clipforge.studio</div>
        </div>
      </div>
    ),
    size,
  )
}
