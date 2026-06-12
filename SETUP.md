# Setup — connecting ClipForge to Lemon Squeezy (test mode)

This walks you from a fresh Lemon Squeezy account to a working, end-to-end test
checkout — **no real money involved**. Takes about 15 minutes.

> Everything here uses **Test mode**, so you can use Lemon Squeezy's test card
> `4242 4242 4242 4242` (any future expiry, any CVC) and nothing is charged.

---

## 0. Install & run

```bash
pnpm install
cp .env.example .env.local   # then fill it in as you go below
pnpm dev
```

Open http://localhost:3000 — the landing page works immediately. Only the
**checkout buttons** need the credentials below.

---

## 1. Create a Lemon Squeezy account & store

1. Sign up at <https://app.lemonsqueezy.com> (free).
2. Create a **Store** when prompted. The name doesn't matter for testing.
3. Top-right, flip the **Test mode** toggle **ON**. Keep it on for everything below.

---

## 2. Turn on test mode & get your Store ID

- Go to **Settings → Stores**. Your store's **numeric ID** is shown there.
- Put it in `.env.local`:

  ```
  LEMONSQUEEZY_STORE_ID=12345
  ```

---

## 3. Create an API key

1. **Settings → API** → click **+** to create a new key.
2. Copy it immediately (it's only shown once). It's a long string starting with `eyJ…`.
3. Add it:

   ```
   LEMONSQUEEZY_API_KEY=eyJ0eXAiOiJKV1Q...
   ```

---

## 4. Create products & variants

You need products that match the three plans on the pricing page. **You can start
with just one to test, then add the rest later** — any plan whose variant ID is
missing simply shows a friendly "not configured" message when clicked.

Create these under **Store → Products → New Product**:

| Plan in this app | Product type in Lemon Squeezy | Suggested price |
| ---------------- | ----------------------------- | --------------- |
| Creator (monthly) | Subscription, monthly | $12 |
| Creator (yearly)  | Subscription, yearly  | $108 |
| Studio (monthly)  | Subscription, monthly | $29 |
| Studio (yearly)   | Subscription, yearly  | $261 |
| Lifetime          | Single payment        | $349 |

> Tip: A single product can hold multiple **variants** (e.g. a "Creator" product
> with a monthly and a yearly variant). The app keys off **variant IDs**, not
> product IDs.

**To get a variant ID:** open the product, click the variant, and copy the number
from the URL — `.../variants/678910` → `678910`.

Fill them in:

```
LEMONSQUEEZY_VARIANT_CREATOR_MONTHLY=678910
LEMONSQUEEZY_VARIANT_CREATOR_YEARLY=678911
LEMONSQUEEZY_VARIANT_STUDIO_MONTHLY=678912
LEMONSQUEEZY_VARIANT_STUDIO_YEARLY=678913
LEMONSQUEEZY_VARIANT_LIFETIME=678914
```

At this point, **checkout already works** — click a plan and the Lemon Squeezy
overlay opens. The success page just won't auto-confirm until the webhook is set
up (next step).

---

## 5. Set up the webhook

The webhook is what lets the `/success` page confirm a purchase server-side.

1. **Settings → Webhooks → +**.
2. **Callback URL:** your app's webhook endpoint:
   - Production: `https://your-domain.com/api/webhooks/lemonsqueezy`
   - Local dev: you need a public URL — see **§6** below.
3. **Signing secret:** type any strong random string. Put the *same* value in:

   ```
   LEMONSQUEEZY_WEBHOOK_SECRET=your-random-signing-secret
   ```

4. **Events:** check at least `order_created` and `subscription_created`.
5. Save.

---

## 6. Testing webhooks on localhost

Lemon Squeezy can't reach `localhost`, so expose it with a tunnel:

**Option A — Cloudflare Tunnel (no account needed):**
```bash
npx cloudflared tunnel --url http://localhost:3000
```

**Option B — ngrok:**
```bash
ngrok http 3000
```

Either prints a public `https://…` URL. Use it as the webhook **Callback URL**
with `/api/webhooks/lemonsqueezy` appended, and set the same base as
`NEXT_PUBLIC_SITE_URL` in `.env.local` so the post-payment redirect comes back to
the tunnel. Restart `pnpm dev` after changing env vars.

> Quick check without paying: on the webhook page, Lemon Squeezy has a **"Send
> test"** button. Note that test events won't carry our custom `ref`, so they
> verify signature handling but won't light up a specific `/success` page.

---

## 7. Run the full flow

1. Click a plan → the overlay opens.
2. Pay with test card `4242 4242 4242 4242`.
3. You're redirected to `/success?ref=…`, which polls until the webhook lands.
4. When the webhook arrives (verified by signature), the page flips to
   **"Payment confirmed"** with the order details. 🎉

---

## Where each value is used

| Env var | Used by | Purpose |
| ------- | ------- | ------- |
| `LEMONSQUEEZY_API_KEY` | `src/lib/lemonsqueezy.ts` | Authorize the create-checkout API call |
| `LEMONSQUEEZY_STORE_ID` | `src/lib/lemonsqueezy.ts` | Which store the checkout belongs to |
| `LEMONSQUEEZY_VARIANT_*` | `src/config/site.ts` → resolved server-side | Which product a button buys |
| `LEMONSQUEEZY_WEBHOOK_SECRET` | `src/app/api/webhooks/lemonsqueezy/route.ts` | Verify webhook authenticity (HMAC) |
| `NEXT_PUBLIC_SITE_URL` | `src/app/api/checkout/route.ts` | Build the post-payment redirect URL |

---

## Going live later

Flip Test mode off, create a **live** API key + products + webhook, and swap the
values. The code is identical — only the credentials change. (`test_mode: true`
is currently hard-set in `src/lib/lemonsqueezy.ts`; remove it for production.)
