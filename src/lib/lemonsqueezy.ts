/**
 * Minimal, dependency-free Lemon Squeezy REST client.
 *
 * We talk to the JSON:API directly with `fetch` (instead of the official SDK)
 * so the integration is fully transparent — useful when the whole point is to
 * *learn* how the checkout + webhook flow works.
 *
 * Docs: https://docs.lemonsqueezy.com/api
 */

import crypto from 'node:crypto'
import { pricingPlans, type BillingPeriod } from '@/config/site'

const API_BASE = 'https://api.lemonsqueezy.com/v1'

const JSON_API_HEADERS = {
  Accept: 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
} as const

/** Throws a readable error if a required server env var is missing. */
function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new LemonConfigError(
      `Missing environment variable "${name}". Copy .env.example to .env.local and fill it in — see SETUP.md.`
    )
  }
  return value
}

/** Signals a configuration problem (vs. an upstream API failure). */
export class LemonConfigError extends Error {
  readonly code = 'LEMON_CONFIG'
}

/** Resolve the Lemon Squeezy variant ID for a plan + billing period. */
export function resolveVariantId(planId: string, period: BillingPeriod): string {
  const plan = pricingPlans.find((p) => p.id === planId)
  if (!plan) throw new LemonConfigError(`Unknown plan "${planId}".`)

  const envName = plan.variantEnv[period]
  if (!envName) {
    throw new LemonConfigError(`Plan "${planId}" has no "${period}" option.`)
  }
  return requireEnv(envName)
}

export interface CreateCheckoutArgs {
  variantId: string
  /** Opaque reference we mint and later match in the webhook payload. */
  reference: string
  /** Absolute URL Lemon Squeezy redirects to after a successful payment. */
  redirectUrl: string
  /** Optionally prefill the buyer's email in the checkout form. */
  email?: string
}

/**
 * Create a checkout and return its hosted URL.
 *
 * `checkout_data.custom.ref` is echoed back to us inside the webhook payload
 * (under `meta.custom_data.ref`), which is how the success page later confirms
 * that *this* purchase completed.
 */
export async function createCheckout({
  variantId,
  reference,
  redirectUrl,
  email,
}: CreateCheckoutArgs): Promise<{ url: string }> {
  const apiKey = requireEnv('LEMONSQUEEZY_API_KEY')
  const storeId = requireEnv('LEMONSQUEEZY_STORE_ID')

  const body = {
    data: {
      type: 'checkouts',
      attributes: {
        checkout_data: {
          ...(email ? { email } : {}),
          custom: { ref: reference },
        },
        product_options: {
          redirect_url: redirectUrl,
          receipt_button_text: 'Back to ClipForge',
          receipt_link_url: process.env.NEXT_PUBLIC_SITE_URL ?? redirectUrl,
        },
        checkout_options: {
          embed: true,
          media: true,
          logo: true,
          dark: true,
        },
        // Test mode follows the API key's mode automatically, but we set it
        // explicitly so a test key never accidentally creates a live checkout.
        test_mode: true,
      },
      relationships: {
        store: { data: { type: 'stores', id: String(storeId) } },
        variant: { data: { type: 'variants', id: String(variantId) } },
      },
    },
  }

  const res = await fetch(`${API_BASE}/checkouts`, {
    method: 'POST',
    headers: { ...JSON_API_HEADERS, Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  if (!res.ok) {
    const detail = await safeReadError(res)
    throw new Error(`Lemon Squeezy checkout failed (${res.status}): ${detail}`)
  }

  const json = (await res.json()) as { data?: { attributes?: { url?: string } } }
  const url = json.data?.attributes?.url
  if (!url) throw new Error('Lemon Squeezy returned no checkout URL.')

  return { url }
}

/**
 * Verify a webhook request's `X-Signature` header against the raw body using
 * HMAC-SHA256 and the shared signing secret. Returns true only on an exact,
 * constant-time match.
 */
export function verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET
  if (!secret || !signature) return false

  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')

  // Both buffers must be equal length for timingSafeEqual.
  const a = Buffer.from(expected, 'hex')
  const b = Buffer.from(signature, 'hex')
  if (a.length !== b.length) return false

  return crypto.timingSafeEqual(a, b)
}

async function safeReadError(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { errors?: Array<{ detail?: string }> }
    return data.errors?.map((e) => e.detail).filter(Boolean).join('; ') || res.statusText
  } catch {
    return res.statusText
  }
}
