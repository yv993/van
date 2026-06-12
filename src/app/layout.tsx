import type { Metadata } from "next";
import {
  Fraunces,
  Inter,
  Noto_Sans_Armenian,
  Noto_Serif_Armenian,
} from "next/font/google";
import "./globals.css";

import { en } from "@/i18n/dictionaries/en";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { Providers } from "@/components/providers";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { SkipLink } from "@/components/skip-link";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const notoSerifArmenian = Noto_Serif_Armenian({
  subsets: ["armenian", "latin"],
  variable: "--font-noto-serif-armenian",
  display: "swap",
});

const notoSansArmenian = Noto_Sans_Armenian({
  subsets: ["armenian", "latin"],
  variable: "--font-noto-sans-armenian",
  display: "swap",
});

// Local OG image (1200×630) derived from the hero spread.
const ogImage = "/images/og.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: en.meta.title,
    template: `%s · ${SITE_NAME}`,
  },
  description: en.meta.description,
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
    title: en.meta.title,
    description: en.meta.description,
    url: SITE_URL,
    locale: "en",
    images: [{ url: ogImage, width: 1200, height: 630, alt: en.meta.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: en.meta.title,
    description: en.meta.description,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${notoSerifArmenian.variable} ${notoSansArmenian.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <Providers>
          <SkipLink />
          <SmoothScroll>{children}</SmoothScroll>
          <div className="grain-overlay" aria-hidden />
        </Providers>
      </body>
    </html>
  );
}
