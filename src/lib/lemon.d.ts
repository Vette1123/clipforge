/** Ambient types for the Lemon.js overlay script loaded in layout.tsx. */

interface LemonSqueezyEvent {
  event?: string
  data?: unknown
}

interface LemonSqueezyGlobal {
  Setup?: (options: { eventHandler?: (event: LemonSqueezyEvent) => void }) => void
  Url?: {
    Open?: (url: string) => void
    Close?: () => void
  }
  Refresh?: () => void
}

interface Window {
  createLemonSqueeze?: () => void
  LemonSqueezy?: LemonSqueezyGlobal
}
