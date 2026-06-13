import { locales, defaultLocale, type Locale } from "@/i18n/config";

/**
 * ──────────────────────────────────────────────────────────────────────────
 * BRAND / SITE CONFIG — the single source of truth for everything
 * business-specific. To launch a NEW client (see TEMPLATE.md), you edit THIS
 * file + the content files (src/content/*) + the dictionaries + swap the assets
 * in /public. The cinematic engine, i18n, commerce, forms and sections are all
 * generic and read from here.
 *
 * Values marked `TODO` are placeholders the business must confirm before launch.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type SocialId = "instagram" | "facebook" | "youtube";

export interface BrandConfig {
  /** Identity */
  name: string;
  shortName: string; // manifest / compact UI
  town: string;
  cuisine: string;
  tagline: string;

  /** Domain + SEO. TODO: set the real production domain before launch. */
  url: string;

  /** Languages (must each have a dictionary in src/i18n/dictionaries). */
  locales: readonly Locale[];
  defaultLocale: Locale;

  /** Contact + location. */
  phone: string; // display form. TODO: real number
  phoneTel: string; // tel: href (digits + leading +)
  email: string; // reservations / KVKK contact. TODO: real inbox
  address: {
    street: string;
    locality: string;
    region: string;
    country: string;
    countryCode: string; // ISO-3166-1 alpha-2
    full: string;
  };
  /** TODO: refine to the venue's exact coordinates. */
  geo: { lat: number; lng: number };
  /** Query used for the keyless Google Maps embed. */
  mapQuery: string;

  /** Opening hours (single daily window). */
  hours: {
    opens: string; // "HH:MM" (24h)
    closes: string; // "HH:MM"
    /** schema.org dayOfWeek names the venue is open. */
    days: string[];
  };

  /** Socials. TODO: real handles. */
  socials: { id: SocialId; href: string }[];

  /** Manifest / browser theme colour (matches --color-coral-deep). */
  themeColor: string;

  /**
   * Swappable cinematic hero source. A new region (Kars, Iğdır…) drops a new
   * frame sequence under /public/frames and points these here. The scrub engine
   * is otherwise unchanged.
   */
  cinematic: {
    framesDir: string; // 1440px set (desktop ≥ 1024px)
    smallDir: string; // lighter set (tablet 768–1023px); phones get the poster
    frameCount: number; // frames in framesDir
    smallFrameCount: number; // frames in smallDir (may be fewer — lighter)
    poster: string; // still shown before frames arm / as fallback
  };

  /** Commerce. */
  currency: string; // ISO-4217
  currencySymbol: string;
  /** Price range for schema.org (₺–₺₺₺₺). */
  priceRange: string;
}

export const brand: BrandConfig = {
  name: "Akdamar Kahvaltı Evi",
  shortName: "Akdamar",
  town: "Van",
  cuisine: "Anatolian breakfast",
  tagline: "the morning that fed empires",

  // TODO: replace with the real domain (feeds metadataBase, OG, sitemap, robots).
  url: "https://akdamar-kahvalti.example",

  locales,
  defaultLocale,

  phone: "+90 432 000 00 00", // TODO: real number
  phoneTel: "+904320000000", // TODO
  email: "rezervasyon@akdamar-kahvalti.example", // TODO: real inbox (also KVKK başvuru)
  address: {
    street: "Kahvaltı Sokağı",
    locality: "Van",
    region: "Van",
    country: "Türkiye",
    countryCode: "TR",
    full: "Kahvaltı Sokağı, Van, Türkiye",
  },
  geo: { lat: 38.5, lng: 43.38 }, // TODO: exact venue coordinates
  mapQuery: "Kahvaltı Sokağı, Van",

  hours: {
    opens: "06:00",
    closes: "14:00",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },

  socials: [
    { id: "instagram", href: "https://instagram.com" }, // TODO: real handle
    { id: "facebook", href: "https://facebook.com" }, // TODO
    { id: "youtube", href: "https://youtube.com" }, // TODO
  ],

  themeColor: "#b0540d",

  cinematic: {
    framesDir: "/frames/descent",
    smallDir: "/frames/descent-sm",
    frameCount: 130,
    smallFrameCount: 66, // tablet set: half the frames, smaller dimensions
    poster: "/images/earth.jpg",
  },

  currency: "TRY",
  currencySymbol: "₺",
  priceRange: "₺₺",
};

/** Opening time as minutes-from-midnight (for the "open now" check). */
export const hoursToMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
};
