'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, Loader2, Clock, Flame } from 'lucide-react'
import { siteConfig } from '@/config/site'

interface OrderInfo {
  productName: string
  total: string
  email: string
  event: string
}

type Status = 'waiting' | 'confirmed' | 'timeout' | 'no-ref'

/**
 * After checkout, Lemon Squeezy redirects here with our `?ref=`. We poll the
 * order-status endpoint until the webhook records the matching order, which is
 * the moment we *know* (server-side) the payment really cleared.
 */
export function SuccessClient() {
  const ref = useSearchParams().get('ref')
  const [status, setStatus] = useState<Status>(ref ? 'waiting' : 'no-ref')
  const [order, setOrder] = useState<OrderInfo | null>(null)

  useEffect(() => {
    if (!ref) return
    let attempts = 0
    let active = true

    const tick = async () => {
      attempts += 1
      try {
        const res = await fetch(`/api/order-status?ref=${ref}`, { cache: 'no-store' })
        const data = (await res.json()) as { paid?: boolean; order?: OrderInfo }
        if (!active) return
        if (data.paid && data.order) {
          setOrder(data.order)
          setStatus('confirmed')
          return
        }
      } catch {
        /* transient — keep polling */
      }
      // Poll for ~40s (20 × 2s) before showing the "still processing" note.
      if (attempts >= 20) {
        if (active) setStatus('timeout')
        return
      }
      if (active) timer = setTimeout(tick, 2000)
    }

    let timer = setTimeout(tick, 1200)
    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [ref])

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-5">
      <div className="grid-floor pointer-events-none absolute inset-0 -z-10" />
      <div className="forge-glow pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[480px] -translate-x-1/2 opacity-60" />

      <div className="w-full max-w-lg rounded-3xl bg-coal/70 p-10 text-center ring-hairline backdrop-blur">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-smoke transition-colors hover:text-bone"
        >
          <span className="grid size-7 place-items-center rounded-md bg-gradient-to-b from-flame to-ember">
            <Flame className="size-3.5 text-void" />
          </span>
          {siteConfig.name}
        </Link>

        {status === 'confirmed' && order && (
          <>
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-spark/10 text-spark">
              <CheckCircle2 className="size-9" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold">Payment confirmed</h1>
            <p className="mt-3 text-smoke">
              Your purchase cleared and our webhook verified it server-side. Welcome to the forge.
            </p>
            <dl className="mt-8 space-y-3 rounded-2xl bg-void/60 p-5 text-left text-sm ring-hairline">
              <Row label="Product" value={order.productName} />
              {order.total && <Row label="Amount" value={order.total} />}
              <Row label="Receipt sent to" value={order.email} />
              <Row label="Event" value={order.event} mono />
            </dl>
          </>
        )}

        {status === 'waiting' && (
          <>
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-ember/10 text-flame">
              <Loader2 className="size-9 animate-spin" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold">Finalizing your order…</h1>
            <p className="mt-3 text-smoke">
              We’re waiting for Lemon Squeezy to confirm the payment via webhook. This usually takes a few seconds.
            </p>
          </>
        )}

        {status === 'timeout' && (
          <>
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-white/5 text-smoke">
              <Clock className="size-9" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold">Still processing</h1>
            <p className="mt-3 text-smoke">
              Your payment may have gone through, but the webhook hasn’t reached this app yet. In
              local dev, make sure your tunnel is running and the webhook URL points here — see
              SETUP.md.
            </p>
          </>
        )}

        {status === 'no-ref' && (
          <>
            <h1 className="mt-2 font-display text-3xl font-bold">Nothing to show</h1>
            <p className="mt-3 text-smoke">
              This page confirms a completed checkout. Head back and pick a plan to try it.
            </p>
          </>
        )}

        <Link
          href="/"
          className="mt-9 inline-flex h-12 items-center justify-center rounded-full bg-bone px-7 font-semibold text-void transition-transform hover:scale-[1.02] active:scale-95"
        >
          Back to {siteConfig.name}
        </Link>
      </div>
    </main>
  )
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-faint">{label}</dt>
      <dd className={mono ? 'font-mono text-bone' : 'text-bone'}>{value}</dd>
    </div>
  )
}
