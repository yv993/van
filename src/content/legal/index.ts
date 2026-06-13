import type { Locale } from "@/i18n/config";
import type { LegalContent } from "./types";
import { tr } from "./tr";
import { en } from "./en";

// Turkish is the legally operative version; English is a courtesy translation.
// HY/RU visitors get the English text plus a short note (footer.legal.note).
export function legalFor(locale: Locale): {
  content: LegalContent;
  showNote: boolean;
} {
  if (locale === "tr") return { content: tr, showNote: false };
  if (locale === "en") return { content: en, showNote: false };
  return { content: en, showNote: true };
}
