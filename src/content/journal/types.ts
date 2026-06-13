import type { Locale } from "@/i18n/config";

// Lightweight typed content collection for /[locale]/journal (no MDX). Post
// metadata (slug/date/cover) is invariant; title/excerpt/body are localized.

export interface JournalText {
  title: string;
  excerpt: string;
  /** Body paragraphs (rendered as <p>). */
  body: string[];
}

export interface JournalPost {
  slug: string;
  /** Publish date, ISO (YYYY-MM-DD). */
  date: string;
  /** Cover image path under /public. */
  cover: string;
  coverAlt: string;
  text: Record<Locale, JournalText>;
}
