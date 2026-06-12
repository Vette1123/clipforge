import { NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { createCheckout, resolveVariantId, LemonConfigError } from '@/lib/lemonsqueezy'
import { siteConfig, type BillingPeriod } from '@/config/site'

export const runtime = 'nodejs'

interface CheckoutRequest {
  planId?: string
  period?: BillingPeriod
  email?: string
}

/**
 * Mint a Lemon Squeezy checkout for the requested plan + billing period.
 *
 * We generate a random `reference`, embed it in the checkout's custom data, and
 * point the post-payment redirect at `/success?ref=…`. The webhook later echoes
 * that same reference back, closing the loop.
 */
export async function POST(req: Request) {
  let payload: CheckoutRequest
  try {
    payload = (await req.json()) as CheckoutRequest
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const { planId, period, email } = payload
  if (!planId || !period) {
    return NextResponse.json({ error: 'planId and period are required.' }, { status: 400 })
  }

  try {
    const variantId = resolveVariantId(planId, period)
    const reference = crypto.randomUUID()
    const redirectUrl = `${siteConfig.url.replace(/\/$/, '')}/success?ref=${reference}`

    const { url } = await createCheckout({ variantId, reference, redirectUrl, email })
    return NextResponse.json({ url, reference })
  } catch (err) {
    if (err instanceof LemonConfigError) {
      // Configuration problems are the user's to fix — surface them clearly.
      return NextResponse.json({ error: err.message, code: err.code }, { status: 503 })
    }
    const message = err instanceof Error ? err.message : 'Unknown error.'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
