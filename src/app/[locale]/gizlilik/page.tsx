import type { Metadata } from "next";
import { LegalArticle } from "@/components/legal-article";
import { legalFor } from "@/content/legal";
import { localeAlternates } from "@/lib/i18n-routing";
import { isLocale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "en";
  return {
    title: legalFor(loc).content.privacy.title,
    description:
      "Akdamar Kahvaltı Evi — KVKK Aydınlatma Metni / Privacy Notice. A template to be reviewed by the business and a legal advisor.",
    robots: { index: true, follow: true },
    alternates: localeAlternates(loc, "/gizlilik"),
  };
}

export default function GizlilikPage() {
  return <LegalArticle doc="privacy" />;
}
