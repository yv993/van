import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Fraunces,
  Inter,
  Noto_Sans_Armenian,
  Noto_Serif_Armenian,
} from "next/font/google";
import "../globals.css";

import { SITE_NAME, SITE_URL } from "@/lib/site";
import { localeAlternates, localeUrl } from "@/lib/i18n-routing";
import { isLocale, locales, localeMeta, type Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { Providers } from "@/components/providers";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { SkipLink } from "@/components/skip-link";
import { StructuredData } from "@/components/structured-data";
import { HashScroll } from "@/components/hash-scroll";

// Primary DISPLAY font (the hero headline → the LCP element). Kept variable so
// its optical-size axis keeps large headings crisp and the footer's italic
// works; it's the ONLY preloaded font.
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
  preload: true,
});

// Body/UI font — trimmed to the weights actually rendered (400/500/600). Not
// preloaded (display:swap covers the brief FOUT; the headline is the LCP).
const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
  preload: false,
});

// Armenian families swap in only for the `hy` locale (see globals.css), so they
// must NOT be preloaded on every page.
const notoSerifArmenian = Noto_Serif_Armenian({
  subsets: ["armenian", "latin"],
  variable: "--font-noto-serif-armenian",
  display: "swap",
  preload: false,
});

const notoSansArmenian = Noto_Sans_Armenian({
  subsets: ["armenian", "latin"],
  variable: "--font-noto-sans-armenian",
  display: "swap",
  preload: false,
});

const ogImage = "/images/og.jpg";

// Prerender real localized HTML for all four locales (great for crawlers).
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const dict = dictionaries[loc];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: dict.meta.title, template: `%s · ${SITE_NAME}` },
    description: dict.meta.description,
    applicationName: SITE_NAME,
    keywords: [
      "Van kahvaltı",
      "Van breakfast",
      "Anatolian breakfast",
      "kahvaltı evi",
      "otlu peynir",
      "bal kaymak",
      "Lake Van",
      "Akhtamar",
      "breakfast house",
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: dict.meta.title,
      description: dict.meta.description,
      url: localeUrl(loc),
      locale: localeMeta[loc].htmlLang,
      images: [{ url: ogImage, width: 1200, height: 630, alt: dict.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
    alternates: localeAlternates(loc),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const meta = localeMeta[locale];

  return (
    // Light is the designed default; dark is an explicit choice (next-themes).
    <html
      lang={meta.htmlLang}
      dir={meta.dir}
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${notoSerifArmenian.variable} ${notoSansArmenian.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <StructuredData />
        <Providers initialLocale={locale}>
          <SkipLink />
          <SmoothScroll>
            <HashScroll />
            {children}
          </SmoothScroll>
          <div className="grain-overlay" aria-hidden />
        </Providers>
      </body>
    </html>
  );
}
