import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at 30% 25%, #ff9e2c 0%, #ff6a00 45%, #0b0b0f 100%)',
          borderRadius: 14,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)',
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 800,
            fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
            color: '#0b0b0f',
            lineHeight: 1,
            letterSpacing: -2,
            transform: 'translateY(-1px)',
            textShadow: '0 1px 0 rgba(255,206,77,0.55)',
          }}
        >
          C
        </div>
      </div>
    ),
    size,
  )
}
