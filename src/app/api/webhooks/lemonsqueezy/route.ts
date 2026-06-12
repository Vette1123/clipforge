import { NextResponse } from 'next/server'
import { verifyWebhookSignature } from '@/lib/lemonsqueezy'
import { saveOrder } from '@/lib/orders'

export const runtime = 'nodejs'

/**
 * Lemon Squeezy webhook receiver.
 *
 * Security: we read the RAW request body (not parsed JSON) and verify the
 * `X-Signature` HMAC before trusting a single byte. An invalid signature is
 * rejected with 401 and never recorded.
 *
 * We handle `order_created` and `subscription_created`, pull the reference we
 * stashed in custom data, and persist a small record the success page polls.
 *
 * Docs: https://docs.lemonsqueezy.com/help/webhooks
 */
export async function POST(req: Request) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-signature')

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 })
  }

  let event: LemonWebhookPayload
  try {
    event = JSON.parse(rawBody) as LemonWebhookPayload
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const eventName = event.meta?.event_name ?? 'unknown'
  const reference = event.meta?.custom_data?.ref

  // Events we care about for confirming a purchase.
  const handled = eventName === 'order_created' || eventName === 'subscription_created'
  if (!handled || !reference) {
    // Acknowledge anything else with 200 so Lemon Squeezy doesn't retry.
    return NextResponse.json({ received: true, ignored: eventName })
  }

  const attrs = event.data?.attributes ?? {}
  await saveOrder({
    reference,
    event: eventName,
    status: attrs.status ?? 'paid',
    productName: attrs.product_name ?? attrs.first_order_item?.product_name ?? 'ClipForge plan',
    customerEmail: attrs.user_email ?? 'unknown',
    total: attrs.total_formatted ?? '',
    receivedAt: new Date().toISOString(),
  })

  return NextResponse.json({ received: true })
}

// ── Loose shape of the bits of the payload we read ───────────────────────────
interface LemonWebhookPayload {
  meta?: {
    event_name?: string
    custom_data?: { ref?: string }
  }
  data?: {
    attributes?: {
      status?: string
      product_name?: string
      user_email?: string
      total_formatted?: string
      first_order_item?: { product_name?: string }
    }
  }
}
