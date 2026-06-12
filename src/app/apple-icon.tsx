import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at 30% 25%, #ff9e2c 0%, #ff6a00 50%, #0b0b0f 100%)',
          boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.10)',
        }}
      >
        <div
          style={{
            fontSize: 128,
            fontWeight: 800,
            fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
            color: '#0b0b0f',
            lineHeight: 1,
            letterSpacing: -6,
            transform: 'translateY(-4px)',
            textShadow: '0 2px 0 rgba(255,206,77,0.55)',
          }}
        >
          C
        </div>
      </div>
    ),
    size,
  )
}
