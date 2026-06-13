# Legal checklist — before go-live

> The KVKK pages (`/[locale]/gizlilik`, `/[locale]/cerez-politikasi`) ship as
> **templates** drafted from `src/content/legal/{tr,en}.ts`. Turkish is the
> legally operative version. **A lawyer must review and complete them before
> launch.** This file is operational guidance, not legal advice.

## Must do before launch

- [ ] **Veri Sorumlusu (data controller)** — fill the real business legal name,
      address and contact in `src/content/legal/tr.ts` + `en.ts` (replace every
      `[…]` placeholder) and `src/config/brand.ts` (`email`, `address`, `phone`).
- [ ] **KVKK Aydınlatma Metni** — lawyer review of purposes, legal bases
      (Md. 5), transfers, **retention periods** (set a real period), and the
      başvuru (data-subject request) process + email.
- [ ] **Açık Rıza (explicit consent)** — confirm the wording for the newsletter
      + analytics consent matches the controller's actual processing.
- [ ] **Çerez Politikası** — confirm the cookie/localStorage inventory is
      accurate (theme, language, consent choice; analytics only after consent).
- [ ] **VERBİS** — check whether the controller must register.
- [ ] **Reservation/order emails** — confirm they don't over-collect; the data
      stored in `.data/*.jsonl` (or your DB) must match the retention policy.

## Consent + analytics (already wired — verify config)

- [x] Cookie/Aydınlatma banner gates analytics; nothing loads until **Accept**.
- [x] Analytics is cookieless (Plausible preferred; Vercel fallback).
- [ ] Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (or accept Vercel) and re-confirm the
      cookie policy names the actual analytics provider.

## Email deliverability

- [ ] **Resend verified sending domain** — required in production. Until then
      `onboarding@resend.dev` only delivers to the account owner. Set
      `RESEND_FROM_EMAIL` to a verified address and add SPF/DKIM DNS records.

## Commerce (if taking payments)

- [ ] Distance-sales contract (Mesafeli Satış Sözleşmesi) + pre-information form
      (Ön Bilgilendirme Formu) for the shop — Turkish e-commerce law.
- [ ] Refund/return + shipping policy pages.
- [ ] Confirm the payment provider's PCI scope (Stripe Checkout / iyzico hosted
      = card data never touches this server).
