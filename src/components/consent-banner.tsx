"use client";

import { Fragment } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useConsent } from "@/lib/consent";

// KVKK cookie / Aydınlatma banner: bottom, non-blocking. Persists the choice in
// localStorage (akdamar.consent) via the consent store, then hides. Rendered
// only after mount + once the store is hydrated, so it never flashes for a
// returning visitor and never causes a hydration mismatch.
export function ConsentBanner() {
  const { t, locale } = useLanguage();
  const { consent, setConsent, ready } = useConsent();

  // `ready` is false on SSR + the first client render (the store reads
  // localStorage only after mount), so the banner appears only post-hydration
  // and never flashes for a visitor who already chose.
  if (!ready || consent !== null) return null;

  // Split the body around the two policy-link placeholders.
  const parts = t.consent.body.split(/(\{privacy\}|\{cookies\})/);

  return (
    <div
      role="dialog"
      aria-label={t.consent.title}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-60 flex justify-center p-3 sm:p-4"
    >
      <div className="pointer-events-auto w-full max-w-3xl rounded-2xl border border-border bg-cream/95 p-4 shadow-lift backdrop-blur-md motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-semibold tracking-tight text-ink">
              {t.consent.title}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-brown-700">
              {parts.map((part, i) => {
                if (part === "{privacy}")
                  return (
                    <Link
                      key={i}
                      href={`/${locale}/gizlilik`}
                      className="underline underline-offset-2 hover:text-coral-deep"
                    >
                      {t.footer.legal.privacy}
                    </Link>
                  );
                if (part === "{cookies}")
                  return (
                    <Link
                      key={i}
                      href={`/${locale}/cerez-politikasi`}
                      className="underline underline-offset-2 hover:text-coral-deep"
                    >
                      {t.footer.legal.cookies}
                    </Link>
                  );
                return <Fragment key={i}>{part}</Fragment>;
              })}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => setConsent("necessary")}
              className="rounded-full border border-border bg-transparent px-4 py-2 text-sm font-medium text-brown-700 transition-colors hover:border-coral-deep/40 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
            >
              {t.consent.necessary}
            </button>
            <button
              type="button"
              onClick={() => setConsent("accepted")}
              className="rounded-full bg-coral-deep px-4 py-2 text-sm font-semibold text-cream shadow-soft transition-colors hover:bg-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
            >
              {t.consent.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
