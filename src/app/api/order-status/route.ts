import { NextResponse } from 'next/server'
import { getOrder } from '@/lib/orders'

export const runtime = 'nodejs'

/**
 * Polled by the /success page. Returns whether the webhook has recorded an
 * order for the given reference yet. Until the webhook lands, `paid` is false.
 */
export async function GET(req: Request) {
  const ref = new URL(req.url).searchParams.get('ref')
  if (!ref) {
    return NextResponse.json({ error: 'Missing ref.' }, { status: 400 })
  }

  const order = await getOrder(ref)
  if (!order) {
    return NextResponse.json({ paid: false })
  }

  return NextResponse.json({
    paid: true,
    order: {
      productName: order.productName,
      total: order.total,
      email: order.customerEmail,
      event: order.event,
    },
  })
}
