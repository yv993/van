import type { Locale } from "@/i18n/config";

// Locale-aware FAQ rendered by /[locale]/faq (accordion + FAQPage JSON-LD).

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqContent {
  title: string;
  intro: string;
  items: FaqItem[]; // ~8 Q&As
}

export type FaqByLocale = Record<Locale, FaqContent>;
