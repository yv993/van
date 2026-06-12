"use client";

import { useT } from "@/i18n/LanguageProvider";

export function SkipLink() {
  const t = useT();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-cream focus:shadow-warm"
    >
      {t.common.skipToContent}
    </a>
  );
}
