'use client'

/**
 * Client helpers for the Lemon.js checkout overlay.
 *
 * Flow: ask our `/api/checkout` route for a hosted checkout URL, then hand it to
 * Lemon.js so it opens in the on-page overlay instead of a full redirect. The
 * `Checkout.Success` event fires when payment completes — we forward the user to
 * the success page (the webhook confirms the purchase server-side in parallel).
 */

import type { BillingPeriod } from '@/config/site'

export interface StartCheckoutArgs {
  planId: string
  period: BillingPeriod
  email?: string
}

/** Ensure Lemon.js is initialised and overlay events route to /success. */
function ensureLemonReady(): boolean {
  if (typeof window === 'undefined' || !window.LemonSqueezy) return false
  window.createLemonSqueeze?.()
  window.LemonSqueezy.Setup?.({
    eventHandler: (event) => {
      if (event?.event === 'Checkout.Success') {
        // The overlay already shows a receipt; nudge the app to its own page.
        const ref = lastReference
        if (ref) window.location.assign(`/success?ref=${ref}`)
      }
    },
  })
  return true
}

let lastReference: string | null = null

/**
 * Create a checkout and open it. Returns a problem object on failure so the
 * caller can show a friendly message (e.g. missing env config returns code
 * "LEMON_CONFIG").
 */
export async function startCheckout(
  args: StartCheckoutArgs
): Promise<{ ok: true } | { ok: false; error: string; code?: string }> {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  })

  const data = (await res.json().catch(() => ({}))) as {
    url?: string
    reference?: string
    error?: string
    code?: string
  }

  if (!res.ok || !data.url) {
    return { ok: false, error: data.error ?? 'Could not start checkout.', code: data.code }
  }

  lastReference = data.reference ?? null

  if (ensureLemonReady() && window.LemonSqueezy?.Url?.Open) {
    window.LemonSqueezy.Url.Open(data.url)
  } else {
    // Lemon.js not available yet — fall back to a full-page redirect.
    window.location.assign(data.url)
  }

  return { ok: true }
}
