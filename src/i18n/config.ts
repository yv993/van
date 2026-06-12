// Central i18n configuration. English is the default and the canonical
// dictionary shape (see src/i18n/dictionaries/en.ts).

export const locales = ["en", "tr", "hy", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// Native label shown in the language switcher + lang attribute metadata.
export const localeMeta: Record<
  Locale,
  { label: string; native: string; htmlLang: string; dir: "ltr" | "rtl" }
> = {
  en: { label: "English", native: "English", htmlLang: "en", dir: "ltr" },
  tr: { label: "Turkish", native: "Türkçe", htmlLang: "tr", dir: "ltr" },
  hy: { label: "Armenian", native: "Հայերեն", htmlLang: "hy", dir: "ltr" },
  ru: { label: "Russian", native: "Русский", htmlLang: "ru", dir: "ltr" },
};

export const STORAGE_KEY = "akdamar.locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
