# Akdamar Kahvaltı Evi — Van Breakfast House

A production-quality marketing site **+ small online shop** for a fictional Van-style
_kahvaltı_ (Anatolian breakfast) house on the shores of Lake Van — warm, editorial,
and fully bilingual-and-then-some. Built to the polish of a premium DTC food brand:
bold display type, rich food photography, generous whitespace, smooth scrolling and
tasteful motion that always respects `prefers-reduced-motion`.

> The lake meets two shores. The site embraces the **shared** geography, food and
> hospitality of the region — cherished by local Armenians and Turks alike — and
> stays deliberately apolitical.

## Stack

- **Next.js 16** (App Router, TypeScript, `src/`, Turbopack) · React 19
- **Tailwind CSS v4** — CSS-first, design tokens live in [`src/app/globals.css`](src/app/globals.css) under `@theme` (there is **no** `tailwind.config.js`)
- **shadcn/ui** primitives (new-york / radix base, CSS variables) in [`src/components/ui/`](src/components/ui/)
- **motion** (`motion/react`) for animation · **lenis** for smooth scroll · **embla** available
- **lucide-react** icons · **sonner** toasts

## Getting started

Requires Node 20+ and npm.

```bash
npm install          # if dependencies aren't installed yet
npm run dev          # dev server → http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build (also runs type-checking + lint)
npm run start        # serve the production build
npm run lint         # eslint
npx tsc --noEmit     # type-check only
```

There is also a Playwright smoke test that verifies the language switcher,
cart, reservation form and reduced-motion path against a running server:

```bash
npm run start -- --port 3100                          # in one terminal
BASE_URL=http://localhost:3100 node e2e/smoke.mjs     # in another
```

## Internationalization (4 languages, English default)

The language switcher in the navbar flips **English · Türkçe · Հայերեն (Western
Armenian) · Русский**. The first render is always English (so SSR and hydration
match); the choice then persists to `localStorage` and updates `<html lang>`, which
also swaps in the **Noto Armenian** fonts for the `hy` locale.

- Config & locale list: [`src/i18n/config.ts`](src/i18n/config.ts)
- The typed dictionary **contract**: [`src/i18n/types.ts`](src/i18n/types.ts)
  (every locale must satisfy this `Dictionary` interface — missing or extra keys
  are a compile error, which keeps translations complete)
- Dictionaries: [`src/i18n/dictionaries/{en,tr,hy,ru}.ts`](src/i18n/dictionaries/)
- Client provider + hooks (`useT`, `useLocale`, `useLanguage`): [`src/i18n/LanguageProvider.tsx`](src/i18n/LanguageProvider.tsx)

**To edit copy:** change the value in `en.ts`, then mirror it in `tr.ts` / `hy.ts` /
`ru.ts`. **To add a language:** add the code to `locales`/`localeMeta` in
`config.ts`, create `dictionaries/<code>.ts` implementing `Dictionary`, and add it
to `dictionaries/index.ts`.

> _Known tradeoff:_ locale switching is client-side, so the server-rendered
> `<html lang>` and document `<title>`/meta are English. If per-locale SEO matters,
> move to locale-segmented routes (`/[locale]`).

## Where to change the content you'll actually edit

| You want to change… | Edit this file |
| --- | --- |
| **Menu items, prices (₺), categories, Turkish + Armenian dish names** | [`src/content/menu.ts`](src/content/menu.ts) |
| **Shop products + prices** | [`src/content/shop.ts`](src/content/shop.ts) |
| **Menu/shop descriptions & translated names** | the `menu` / `shop` blocks in [`src/i18n/dictionaries/*.ts`](src/i18n/dictionaries/) |
| **Guest reviews (placeholder)** | [`src/content/testimonials.ts`](src/content/testimonials.ts) (names/avatars) + `testimonials` block in the dictionaries (quotes) |
| **Hours, address, phone, reservation copy** | the `visit` block in the dictionaries |

Menu prices are plain numbers in `menu.ts` / `shop.ts` and render through
`formatPrice()` (the `₺` symbol). Change a number, change the price.

## Where to replace the photos

Imagery is centralized in one file — [`src/content/images.ts`](src/content/images.ts):

- `unsplash(id, w, h)` builds an Unsplash URL from an id **unless the id starts with
  `/`**, in which case it's treated as a **local `/public` path** and passed through
  untouched (no `remotePatterns` entry needed). This lets real local photos and
  Unsplash placeholders coexist.
- **Real local assets already in place** (see [`CREDITS.md`](CREDITS.md) for licenses):
  - `public/images/lake-van.jpg`, `akhtamar-church.jpg`, `lake-island.jpg` — **real,
    commercially-licensed** Lake Van / Akhtamar photos (Wikimedia Commons, CC BY /
    CC BY-SA) used in the gallery + zero-tricks slots.
  - `public/images/hero-spread.jpg` + `hero-poster.jpg` + `og.jpg` — local hero/OG.
  - `public/video/hero.mp4` — a cinematic Ken-Burns hero loop (autoplays muted,
    reduced-motion shows the still only). Drop-in replaceable.
- **Remaining food/product slots are still Unsplash placeholders** — these are the
  ones intended for a cohesive generated shoot. To swap: set the relevant `IMG`
  entry to a `/images/...` local path. Remote hosts are allow-listed in
  [`next.config.ts`](next.config.ts) → `images.remotePatterns`.

Avatars and gallery shots live in the same registry. The decorative food motifs
(pomegranate, walnut, apricot, olive sprig, wheat) and the **Ararat silhouette** +
**Akhtamar church** line-art are hand-built inline SVGs in
[`src/components/motifs.tsx`](src/components/motifs.tsx) — no external assets.

## Cinematic chapters & the earth-from-space globe

The page is organised into **five full-screen chapters** ([`src/app/page.tsx`](src/app/page.tsx)
→ [`Chapter`](src/components/cinematic/chapter.tsx)) that gently zoom/fade in as you
scroll; headings and key cards glide in from the right (`<Reveal from="right">`).

Chapter 1 opens with an **interactive earth-from-space globe**
([`src/components/cinematic/`](src/components/cinematic/)) that you scroll down into
Van, handing off to the Hero; Chapter 4 has an "advancing map" that flies to
**Akhtamar Island** with a marker + route ([`world-map.tsx`](src/components/sections/world-map.tsx)).

- **Mapbox token (optional):** set `NEXT_PUBLIC_MAPBOX_TOKEN` in `.env.local` to
  enable the live globe ([free token](https://account.mapbox.com/access-tokens/)).
  `mapbox-gl` is **dynamically imported** (never in the base bundle) and mounted
  only near the viewport, behind the `public/images/earth.jpg` poster.
- **No token / no WebGL / reduced-motion → graceful static earth fallback.** The
  page never crashes without a token, and `prefers-reduced-motion` disables all
  fly/zoom/scrub (compact static earth, hero shows directly, chapters are plain
  stacked sections, hero video off).

## Before launch

- Set the real domain in [`src/lib/site.ts`](src/lib/site.ts) (`SITE_URL`) — it feeds
  `metadataBase`, OpenGraph/Twitter, `sitemap.xml` and `robots.txt`.
- Swap the placeholder photos and the placeholder reviews (clearly commented).
- Replace the demo phone number / reservation handling — the form is client-side
  only (validates and confirms; it does **not** send anywhere yet). The shop
  checkout is a demo (no payment is taken).

## Project structure

```
src/
  app/            layout (fonts + metadata), page, globals.css, sitemap, robots, icon
  i18n/           config, Dictionary type, provider/hooks, dictionaries/{en,tr,hy,ru}
  content/        menu, shop, testimonials, gallery, images (data only)
  lib/            cart store, site constants, cn, hydration-safe reduced-motion hook
  components/
    motion/       Lenis smooth-scroll, Reveal, TiltCard, Magnetic, Counter, Marquee
    ui/           shadcn primitives + the premium CtaButton
    sections/     the 13 page sections (hero … footer)
    motifs.tsx, image-compare.tsx, site-nav, language-switcher, cart-drawer, …
e2e/              Playwright smoke test + screenshot script
```

## Quality notes

- **Responsive**, mobile-first (verified at 375 / 768 / 1280).
- **Accessible**: semantic landmarks, alt text, visible focus, keyboard-operable nav,
  cart, language switcher, menu filter, image-compare slider and reservation form;
  decorative marquee content is hidden from assistive tech; **WCAG AA** contrast
  (an AA-safe `coral-deep` token carries small text on warm surfaces).
- **Motion** is restrained and **fully disabled** under `prefers-reduced-motion`
  (via a hydration-safe hook so there are no SSR mismatches).
- `tsc`, `next build` and the Playwright smoke test (13/13) all pass clean — no
  console errors or hydration warnings.

---

_This is a demonstration build. Imagery and guest reviews are placeholders for
design purposes only._
