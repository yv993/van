import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/sections/section";
import { Reveal } from "@/components/motion/reveal";
import { faq } from "@/content/faq";
import { isLocale } from "@/i18n/config";
import { localeAlternates } from "@/lib/i18n-routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "en";
  const c = faq[loc];
  return {
    title: c.title,
    description: c.intro,
    alternates: localeAlternates(loc, "/faq"),
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = faq[locale];

  // FAQPage structured data (strong rich-result SEO).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <PageShell>
      <Section className="px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
              {c.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-pretty text-brown-700">
              {c.intro}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              {c.items.map((it, i) => (
                <details
                  key={i}
                  className="group px-6 py-1 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral">
                    {it.q}
                    <ChevronDown
                      className="size-5 shrink-0 text-coral-deep transition-transform group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>
                  <p className="pb-5 leading-relaxed text-pretty text-brown-700">
                    {it.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </PageShell>
  );
}
