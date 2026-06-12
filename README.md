# ClipForge — SaaS landing page + Lemon Squeezy integration

A production-shaped demo SaaS: a stunning, dark "Molten Foundry" landing page for
a fictional video-repurposing tool, wired to a **complete Lemon Squeezy checkout
and webhook flow**. Built to learn and test how payments work end-to-end before
bolting them onto a real product.

> Created as a payment-integration test harness. The marketing copy and product
> are fictional; the **Lemon Squeezy integration is real and works**.

## What it demonstrates

```
Landing page → click a plan → POST /api/checkout (Lemon Squeezy API mints a URL)
   → Lemon.js overlay checkout → pay with the test card
   → redirect to /success?ref=…   +   Lemon Squeezy fires a webhook
   → POST /api/webhooks/lemonsqueezy verifies the HMAC signature, records the order
   → /success polls /api/order-status → flips to "Payment confirmed" ✅
```

- **Both billing models:** subscription tiers (Creator, Studio — monthly/yearly
  toggle) **and** a one-time Lifetime purchase.
- **Signed webhooks:** raw-body HMAC-SHA256 verification, constant-time compare.
- **No database required:** a tiny JSON store under `.data/` records orders so the
  success page can confirm them. Swap it for your DB in production.

## Tech

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Motion · lucide-react.
No payment SDK — the Lemon Squeezy REST API is called directly with `fetch`, so
the whole flow is transparent and easy to read.

## Quick start

```bash
pnpm install
cp .env.example .env.local      # fill in your Lemon Squeezy test values
pnpm dev                        # http://localhost:3000
```

The landing page renders without any credentials. To exercise checkout, follow
**[SETUP.md](./SETUP.md)** — a 15-minute, step-by-step guide to creating a
test-mode store, products, API key, and webhook (including how to tunnel webhooks
to localhost).

## Project structure

```
src/
  app/
    page.tsx                         Landing page (assembles the sections)
    success/page.tsx                 Post-purchase confirmation
    api/
      checkout/route.ts              Mints a Lemon Squeezy checkout URL
      webhooks/lemonsqueezy/route.ts Verifies + records webhook events
      order-status/route.ts          Polled by the success page
  components/site/                   Hero, Pricing, FAQ, Forge animation, …
  config/site.ts                     Branding + pricing (single source of truth)
  lib/
    lemonsqueezy.ts                  Server-side LS API client + signature verify
    lemon-client.ts                  Client overlay helper (Lemon.js)
    orders.ts                        Tiny JSON order store
```

## Rebranding

Edit `src/config/site.ts` — name, tagline, pricing, and plan→variant mapping all
live there. Theme tokens (colors, fonts) are in `src/app/globals.css`.

## Design

See [`docs/2026-06-11-clipforge-lemonsqueezy-design.md`](./docs/2026-06-11-clipforge-lemonsqueezy-design.md)
for the spec this was built from.
