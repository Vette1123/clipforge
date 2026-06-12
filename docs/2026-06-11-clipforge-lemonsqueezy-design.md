# ClipForge × Lemon Squeezy — Design Spec

**Date:** 2026-06-11
**Status:** Approved → Implemented

## Goal

Build a standalone, stunning SaaS landing page (fictional product "ClipForge", a
video-repurposing tool) with a **full, production-shaped Lemon Squeezy
integration** — the purpose is to learn and test the payment flow before applying
it to a real product. Test mode only; no real charges.

## Decisions (from brainstorming)

- **Location:** brand-new standalone Next.js app (sibling to the downloader).
- **Integration depth:** full — API-created checkout, signed webhook receiver,
  and a success page that confirms the purchase server-side.
- **Pricing model:** both subscription (monthly/yearly) **and** one-time.
- **Account:** user has none yet → all secrets read from `.env.local`, plus a
  step-by-step `SETUP.md`.
- **Aesthetic:** "Molten Foundry" — dark cinematic canvas, molten amber accent,
  teal sparks, Bricolage Grotesque display font, animated forge/film-strip hero.

## Architecture

Next.js 16 App Router · React 19 · Tailwind v4 · Motion. The Lemon Squeezy REST
API is called directly with `fetch` (no SDK) for transparency.

### Flow

```
Landing → choose plan → POST /api/checkout
  → lib/lemonsqueezy.createCheckout() calls LS /v1/checkouts with:
      • checkout_data.custom.ref = <uuid>      (echoed back by the webhook)
      • product_options.redirect_url = /success?ref=<uuid>
      • checkout_options.embed = true          (overlay)
  → returns hosted URL → Lemon.js overlay opens it
  → user pays (test card) →
      (a) redirect to /success?ref=<uuid>
      (b) LS fires webhook → POST /api/webhooks/lemonsqueezy
            • verify X-Signature HMAC-SHA256 over raw body (constant-time)
            • on order_created / subscription_created, save order keyed by ref
  → /success polls GET /api/order-status?ref=<uuid> until recorded → confirmed
```

### Components & boundaries

| Unit | Responsibility | Depends on |
| ---- | -------------- | ---------- |
| `config/site.ts` | Branding + pricing + plan→variant-env mapping | — |
| `lib/lemonsqueezy.ts` | Server: create checkout, resolve variant, verify signature | env, config |
| `lib/orders.ts` | Tiny JSON order store (`.data/orders.json`) | fs |
| `lib/lemon-client.ts` | Client: call checkout API, open Lemon.js overlay | — |
| `api/checkout` | Mint reference + redirect URL, call createCheckout | lemonsqueezy |
| `api/webhooks/lemonsqueezy` | Verify + persist webhook events | lemonsqueezy, orders |
| `api/order-status` | Read order by ref for the success page | orders |
| `components/site/*` | Landing sections + success UI | ui, lemon-client |

### Error handling

- Missing env → `LemonConfigError` → checkout API returns 503 with a clear
  message; the pricing UI shows "add your keys (see SETUP.md)".
- Bad webhook signature → 401, nothing recorded.
- Webhook slow/absent → success page polls ~40s, then shows a "still processing /
  check your tunnel" note instead of hanging.

### Out of scope (YAGNI)

Real auth, real database, actual app functionality behind the paywall. This is a
beautiful front door plus a real payment loop — nothing more.

## Testing

Manual, via Lemon Squeezy test mode + test card `4242 4242 4242 4242`, following
`SETUP.md`. Build verified with `pnpm build`.
