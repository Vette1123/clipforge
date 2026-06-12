/**
 * Single source of truth for branding + pricing.
 *
 * Rename "ClipForge" to anything by editing this file alone — the whole site,
 * metadata, and checkout copy read from here.
 *
 * Each paid plan references an environment variable holding its Lemon Squeezy
 * *variant* ID. The variant ID is resolved server-side at checkout time (see
 * `src/lib/lemonsqueezy.ts`), so these keys never reach the browser.
 */

export const siteConfig = {
  name: 'ClipForge',
  tagline: 'Forge one video into a hundred clips',
  description:
    'ClipForge turns a single long-form video into platform-ready shorts, captions, and thumbnails — automatically. Repurpose once, publish everywhere.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  email: 'hello@clipforge.studio',
  social: {
    twitter: '@clipforge',
    github: 'https://github.com/vette1123',
  },
} as const

/** Maps a plan/cadence to the env var that stores its Lemon Squeezy variant ID. */
export type BillingPeriod = 'monthly' | 'yearly' | 'once'

export interface PricingPlan {
  /** Stable identifier used by the checkout API and analytics. */
  id: string
  name: string
  /** One-line positioning shown under the plan name. */
  blurb: string
  /** Headline price in whole units, per period, for display only. */
  price: { monthly?: number; yearly?: number; once?: number }
  /** ISO currency — display only; the real charge comes from Lemon Squeezy. */
  currency: string
  features: string[]
  /** Visually emphasised as the recommended plan. */
  featured?: boolean
  /** CTA label. */
  cta: string
  /**
   * Env var names holding the variant ID for each available period.
   * A period is "purchasable" only if its env var resolves at runtime.
   */
  variantEnv: Partial<Record<BillingPeriod, string>>
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'creator',
    name: 'Creator',
    blurb: 'For solo creators finding their rhythm.',
    price: { monthly: 12, yearly: 108 },
    currency: 'USD',
    cta: 'Start with Creator',
    features: [
      '30 videos / month',
      'Auto clip detection',
      'Captions in 12 languages',
      '720p + 1080p exports',
      'Email support',
    ],
    variantEnv: {
      monthly: 'LEMONSQUEEZY_VARIANT_CREATOR_MONTHLY',
      yearly: 'LEMONSQUEEZY_VARIANT_CREATOR_YEARLY',
    },
  },
  {
    id: 'studio',
    name: 'Studio',
    blurb: 'For teams shipping content at scale.',
    price: { monthly: 29, yearly: 261 },
    currency: 'USD',
    featured: true,
    cta: 'Forge with Studio',
    features: [
      'Unlimited videos',
      'AI hook & title suggestions',
      'Brand kit + auto-thumbnails',
      '4K exports, no watermark',
      'Team seats & shared library',
      'Priority support',
    ],
    variantEnv: {
      monthly: 'LEMONSQUEEZY_VARIANT_STUDIO_MONTHLY',
      yearly: 'LEMONSQUEEZY_VARIANT_STUDIO_YEARLY',
    },
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    blurb: 'Pay once. Forge forever.',
    price: { once: 349 },
    currency: 'USD',
    cta: 'Buy Lifetime',
    features: [
      'Everything in Studio',
      'One-time payment',
      'All future updates',
      'Founder badge',
      'No recurring billing',
    ],
    variantEnv: {
      once: 'LEMONSQUEEZY_VARIANT_LIFETIME',
    },
  },
]

/** Yearly billing presents this saving vs paying monthly (display only). */
export const YEARLY_DISCOUNT_LABEL = 'Save 25%'
