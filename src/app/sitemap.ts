import type { MetadataRoute } from "next";
import { locales, localeMeta } from "@/i18n/config";
import { localeUrl } from "@/lib/i18n-routing";
import { journalPosts } from "@/content/journal/posts";

// Every indexable route, emitted for all four locales with hreflang alternates.
const ROUTES = [
  "",
  "/about",
  "/journal",
  ...journalPosts.map((p) => `/journal/${p.slug}`),
  "/faq",
  "/gizlilik",
  "/cerez-politikasi",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.flatMap((route) =>
    locales.map((locale) => ({
      url: localeUrl(locale, route),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.6,
      alternates: {
        languages: Object.fromEntries([
          ...locales.map((l) => [localeMeta[l].htmlLang, localeUrl(l, route)]),
          ["x-default", localeUrl("en", route)],
        ]),
      },
    })),
  );
}
