"use client";

import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { CartProvider } from "@/lib/cart";
import { Toaster } from "@/components/ui/sonner";
import { ConsentBanner } from "@/components/consent-banner";
import { SiteAnalytics } from "@/components/analytics";

export function Providers({
  children,
  initialLocale,
  dictionary,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
  dictionary: Dictionary;
}) {
  return (
    // Light is the designed default; dark is an explicit visitor choice
    // (persisted by next-themes), not inherited from the OS.
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <LanguageProvider initialLocale={initialLocale} dictionary={dictionary}>
        <CartProvider>
          {children}
          <Toaster position="bottom-right" />
          {/* KVKK cookie banner + consent-gated, cookieless analytics. */}
          <ConsentBanner />
          <SiteAnalytics />
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
