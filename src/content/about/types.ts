import type { Locale } from "@/i18n/config";

// Locale-aware "About" copy rendered by /[locale]/about.

export interface AboutSection {
  heading: string;
  paragraphs: string[];
}

export interface AboutValue {
  title: string;
  body: string;
}

export interface AboutContent {
  /** Page H1. */
  title: string;
  /** Lead paragraph under the title. */
  intro: string;
  /** The story, in 3–4 sections (lake & two shores, herding families, otlu
   *  peynir, Akhtamar heritage — warm and apolitical). */
  sections: AboutSection[];
  valuesTitle: string;
  values: AboutValue[];
  /** Closing CTA back to the home reservation anchor. */
  ctaTitle: string;
  ctaLabel: string;
}

export type AboutByLocale = Record<Locale, AboutContent>;
