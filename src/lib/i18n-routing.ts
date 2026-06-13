import { SITE_URL } from "@/lib/site";
import { locales, localeMeta, type Locale } from "@/i18n/config";

// Helpers for the per-locale routes (/en, /tr, /hy, /ru). Server-safe (no client
// imports) so metadata + sitemap can use them.

/** Absolute URL for a locale + route. `route` is "" (home) or "/about" etc. */
export function localeUrl(locale: Locale, route = ""): string {
  return `${SITE_URL}/${locale}${route}`;
}

/**
 * `metadata.alternates` with hreflang for every locale + `x-default` → en.
 * `canonical` points at the current locale's URL for this route.
 */
export function localeAlternates(locale: Locale, route = "") {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeMeta[l].htmlLang] = localeUrl(l, route);
  languages["x-default"] = localeUrl("en", route);
  return { canonical: localeUrl(locale, route), languages };
}
