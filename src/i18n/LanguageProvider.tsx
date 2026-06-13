"use client";

import { createContext, useContext, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  defaultLocale,
  isLocale,
  localeMeta,
  type Locale,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { dictionaries } from "@/i18n/dictionaries";

interface LanguageContextValue {
  locale: Locale;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * The active locale is now the ROUTE (/en, /tr, …) — the source of truth. This
 * provider derives it from the route param via `useParams()`, which is correct
 * during SSR (so the server HTML is already localized) and reactive to
 * client-side locale navigation (the [locale] layout persists across a switch,
 * so reading the param beats a stale `useState`). `initialLocale` (the route
 * locale the layout passes) is only a fallback seed. Switching locale is a real
 * navigation handled by the language switcher — not setState.
 */
export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const params = useParams();
  const raw = typeof params?.locale === "string" ? params.locale : undefined;
  const locale: Locale = isLocale(raw)
    ? raw
    : (initialLocale ?? defaultLocale);

  // Keep <html lang/dir> in sync on the client (SSR already set it from the
  // route; this also covers soft navigations). DOM write only — no setState.
  useEffect(() => {
    const meta = localeMeta[locale];
    document.documentElement.lang = meta.htmlLang;
    document.documentElement.dir = meta.dir;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, t: dictionaries[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

/** Returns the active dictionary. */
export function useT(): Dictionary {
  return useLanguage().t;
}

/** Returns the active locale code. */
export function useLocale(): Locale {
  return useLanguage().locale;
}
