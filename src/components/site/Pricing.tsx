'use client'

import { useState } from 'react'
import { Check, Loader2, AlertTriangle, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import {
  pricingPlans,
  YEARLY_DISCOUNT_LABEL,
  type BillingPeriod,
  type PricingPlan,
} from '@/config/site'
import { startCheckout } from '@/lib/lemon-client'
import { cn } from '@/lib/cn'

export function Pricing() {
  const [yearly, setYearly] = useState(false)
  const [pending, setPending] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  /** The period a given plan will actually be charged on. */
  function chargePeriod(plan: PricingPlan): BillingPeriod {
    if (plan.price.once != null) return 'once'
    return yearly ? 'yearly' : 'monthly'
  }

  async function onBuy(plan: PricingPlan) {
    const period = chargePeriod(plan)
    setError(null)
    setPending(plan.id)
    const result = await startCheckout({ planId: plan.id, period })
    if (!result.ok) {
      setError(
        result.code === 'LEMON_CONFIG'
          ? 'Checkout isn’t configured yet — add your Lemon Squeezy keys to .env.local (see SETUP.md).'
          : result.error
      )
    }
    // On success the overlay opens / we redirect, so leave pending as-is.
    setPending(null)
  }

  return (
    <section id="pricing" className="relative mx-auto max-w-6xl px-5 py-28">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">Pricing</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Pick your forge.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-smoke">
          Start free. Upgrade when you’re shipping. Cancel in two clicks.
        </p>

        {/* Billing toggle */}
        <div className="mt-8 inline-flex items-center gap-1 rounded-full bg-coal p-1 ring-hairline">
          <ToggleBtn active={!yearly} onClick={() => setYearly(false)}>
            Monthly
          </ToggleBtn>
          <ToggleBtn active={yearly} onClick={() => setYearly(true)}>
            Yearly
            <span className="ml-1.5 rounded-full bg-spark/15 px-2 py-0.5 text-[10px] font-semibold text-spark">
              {YEARLY_DISCOUNT_LABEL}
            </span>
          </ToggleBtn>
        </div>
      </div>

      {error && (
        <div className="mx-auto mt-8 flex max-w-xl items-start gap-3 rounded-2xl border border-ember/30 bg-ember/5 px-4 py-3 text-sm text-flame">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => {
          const period = chargePeriod(plan)
          const amount = plan.price[period]
          const isPending = pending === plan.id
          return (
            <motion.div
              key={plan.id}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className={cn(
                'relative flex flex-col rounded-3xl p-7',
                plan.featured
                  ? 'bg-gradient-to-b from-iron to-coal ring-2 ring-ember/50 shadow-[0_30px_80px_-30px_rgba(255,106,0,0.45)]'
                  : 'bg-coal/60 ring-hairline'
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-7 inline-flex items-center gap-1 rounded-full bg-gradient-to-b from-flame to-ember px-3 py-1 text-xs font-semibold text-void">
                  <Sparkles className="size-3" /> Most popular
                </span>
              )}

              <h3 className="font-display text-xl font-bold">{plan.name}</h3>
              <p className="mt-1 text-sm text-smoke">{plan.blurb}</p>

              <div className="mt-6 flex items-end gap-1.5">
                <span className="font-display text-5xl font-extrabold tracking-tight">
                  ${amount}
                </span>
                <span className="mb-1.5 text-sm text-faint">
                  {period === 'once' ? 'one-time' : period === 'yearly' ? '/year' : '/month'}
                </span>
              </div>

              <button
                onClick={() => onBuy(plan)}
                disabled={isPending}
                className={cn(
                  'mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full font-semibold transition-all active:scale-[0.98] disabled:opacity-60',
                  plan.featured
                    ? 'bg-gradient-to-b from-flame to-ember text-void shadow-[0_8px_30px_-8px_rgba(255,106,0,0.7)] hover:brightness-110'
                    : 'bg-bone text-void hover:bg-white'
                )}
              >
                {isPending ? <Loader2 className="size-4 animate-spin" /> : plan.cta}
              </button>

              <ul className="mt-7 space-y-3 border-t border-white/5 pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-smoke">
                    <Check className="mt-0.5 size-4 shrink-0 text-spark" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>

      <p className="mt-10 text-center font-mono text-xs text-faint">
        Prices in USD · Secure checkout by Lemon Squeezy · VAT handled at checkout
      </p>
    </section>
  )
}

function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors',
        active ? 'bg-bone text-void' : 'text-smoke hover:text-bone'
      )}
    >
      {children}
    </button>
  )
}
