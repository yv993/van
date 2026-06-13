"use client";

import Script from "next/script";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { useConsent } from "@/lib/consent";

// Cookieless analytics, mounted ONLY after the visitor accepts (KVKK). Prefers
// Plausible (the most privacy-friendly) when its domain is configured; else
// falls back to Vercel Web Analytics (also cookieless; only reports on a Vercel
// deployment — a harmless no-op elsewhere). With neither configured + no
// consent, this renders nothing.
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export function SiteAnalytics() {
  const { consent } = useConsent();
  if (consent !== "accepted") return null;

  if (PLAUSIBLE_DOMAIN) {
    return (
      <Script
        src="https://plausible.io/js/script.js"
        data-domain={PLAUSIBLE_DOMAIN}
        strategy="afterInteractive"
      />
    );
  }

  return <VercelAnalytics />;
}
