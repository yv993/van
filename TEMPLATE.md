# TEMPLATE — spin up a new business site

This codebase is a reusable, multi-tenant **cinematic restaurant template**.
**Akdamar Kahvaltı Evi** (Van) is the reference configuration. A new client
(another Van / Kars / Iğdır breakfast house, a café, a meyhane…) is **edit
config + swap assets + translate copy** — not a rewrite. The cinematic engine,
i18n, commerce, forms, sections and SEO are generic and read from config.

Target: a new site in **days, not weeks**.

---

## The 6 steps

### 1. Brand config — `src/config/brand.ts`  (the single source of truth)

Edit one file for all business-specific data:

| Field | What |
| --- | --- |
| `name`, `shortName`, `town`, `cuisine`, `tagline` | Identity |
| `url` | Production domain (feeds `metadataBase`, OG, sitemap, robots, hreflang) |
| `locales`, `defaultLocale` | Enabled languages (must have dictionaries — step 3) |
| `phone`, `phoneTel`, `email` | Contact (tel: link, KVKK başvuru) |
| `address`, `geo`, `mapQuery` | Postal address, map pin, Google-Maps embed query |
| `hours` | Open window (drives the "Open now" badge **and** schema.org) |
| `socials` | Real Instagram/Facebook/YouTube handles |
| `themeColor` | Browser theme-color + PWA manifest |
| `cinematic` | **Swappable hero**: `framesDir` / `smallDir` / `frameCount` / `poster` |
| `currency`, `currencySymbol`, `priceRange` | Commerce + schema.org |

Everything marked `TODO` is a placeholder to confirm before launch.

### 2. Design tokens — `src/app/globals.css` `@theme`

The palette + fonts live as CSS-first tokens (`--color-coral`, `--color-honey`,
`--font-fraunces`…). Re-skin by editing the `@theme` block (and the `.dark`
overrides). Fonts are loaded in `src/app/[locale]/layout.tsx` (`next/font`).
Keep the token **names** — components reference them (`bg-coral`, `text-ink`).

### 3. Content + copy

| Data | File(s) |
| --- | --- |
| Menu (items, prices, categories, dietary tags) | `src/content/menu.ts` |
| Shop products + prices | `src/content/shop.ts` |
| Gallery, testimonials | `src/content/{gallery,testimonials}.ts` |
| About / Journal / FAQ | `src/content/{about,faq,journal}/` |
| KVKK legal text | `src/content/legal/{tr,en}.ts` |
| **All UI strings, per locale** | `src/i18n/dictionaries/{en,tr,hy,ru}.ts` |

The `Dictionary` type (`src/i18n/types.ts`) is **compile-enforced** — every
locale must be complete or the build fails. To change which languages ship,
edit `src/i18n/config.ts` (`locales`) + add/remove a dictionary + `brand.locales`.

### 4. Swap the assets — `/public`

| Asset | Where |
| --- | --- |
| Food / product / hero photos | `public/images/*` (registry: `src/content/images.ts`) |
| Cinematic frame sequence | `public/frames/<dir>/frame_0001..N.webp` (+ a `-sm` 960px set) → point `brand.cinematic` at it |
| Favicons / PWA icons | `src/app/{icon.svg,icon.png,apple-icon.png}`, `public/icon-{192,512}.png` |
| OG image | `public/images/og.jpg` (1200×630) |
| Landmark/CC photos | keep attributions in `CREDITS.md` |

`src/content/images.ts` maps every slot — a value starting with `/` is a local
file, otherwise an Unsplash id. Drop a real photo in `public/images` and point
the slot at `/images/your-file.jpg`.

### 5. External services — `.env.local` (all OPTIONAL)

Copy `.env.local.example` → `.env.local`. **The build + demo run with zero
keys.** Add keys to activate:

- **Resend** (`RESEND_API_KEY` + `RESERVATION_TO_EMAIL` / `RESEND_AUDIENCE_ID`) —
  real reservation + newsletter emails. Production needs a **verified sending
  domain**; set `RESEND_FROM_EMAIL`. Without keys → `.data/*.jsonl` + console.
- **Payments** (`STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET`, or the iyzico
  keys) — real card checkout. Without → orders recorded to `.data/orders.jsonl`
  as "pay on arrival". Webhook: `/api/payment-webhook`.
- **Capacity** (`RESERVATION_MAX_PER_SLOT`) — cap covers per slot.
- **Analytics** (`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`) — cookieless, after consent.
- **Google reviews** (`GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID`) — real rating;
  else curated testimonials.

### 6. Legal — see `LEGAL-CHECKLIST.md`

The KVKK pages are templates — a lawyer reviews `src/content/legal/*` and you
fill the controller details (also in `brand.ts`).

---

## Completing the iyzico (Turkey) payment adapter

`src/lib/payments/iyzico.ts` is a stub conforming to `PaymentProvider`. To make
it live: in `createCheckout`, POST an HMAC-SHA256-signed request to
`${IYZICO_BASE_URL}/payment/iyzipos/checkoutform/initialize/auth/ecom` (buyer +
basketItems from `order.lines` + `order.total`) and return
`{ redirectUrl: response.paymentPageUrl }`; in `handleWebhook`, retrieve the CF
result by `token` and return `{ orderId, paid }`. Stripe (`stripe.ts`) is the
working reference. The rest of the app needs **no changes** — both implement the
same interface, selected in `src/lib/payments/index.ts`.

---

## Generating bespoke imagery (Higgsfield)

The reference site ships licence-safe stock (Unsplash) + CC Wikimedia
landmark/dish photos. For the client's own branded shoot, generate with the
Higgsfield MCP (needs credits — the reference pass ran on 0 credits, so this is
deferred) and drop the results into `public/images`, then update
`src/content/images.ts`. **Art-direction style suffix** (append to each prompt):

> *warm editorial food photography, natural window light, rustic Anatolian
> table, linen + copper + stoneware, shallow depth of field, muted warm palette
> (terracotta/honey/olive), 35mm, appetizing, premium magazine quality, no text*

Per-asset prompts (1:1 product, 3:2 hero/food):

- **Hero spread** — "an abundant Van breakfast table from above: dozens of small
  plates — herbed cheese, honey & clotted cream, olives, eggs, tomatoes, tulip
  tea glasses, fresh bread — golden morning light by Lake Van."
- **Otlu peynir** — "a plate of Van herbed white cheese flecked with wild
  mountain herbs, on stoneware."
- **Bal-kaymak** — "raw honey poured over thick clotted cream on warm bread, a
  copper honey dipper."
- **Product jar** — "a rustic glass jar of {product}, kraft label, on a linen
  cloth, soft window light, 1:1."
- **Samovar tea** — "a brass samovar pouring black tea into a tulip glass, steam
  rising, warm light."

Then re-optimize: `node -e ' require("sharp")("in.png").resize({width:1200}).jpeg({quality:80,mozjpeg:true,progressive:true}).toFile("public/images/<slot>.jpg") '`.

---

## Verify a new config

```bash
npx tsc --noEmit && npm run lint && npm run build      # all must pass
npm run start -- --port 3100
BASE_URL=http://localhost:3100 node e2e/smoke.mjs       # must stay green
```

The smoke test, per-locale SSR, JSON-LD, sitemap and hreflang all derive from
config — they update automatically when you edit `brand.ts`.
