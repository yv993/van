import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/sections/section";
import { Reveal } from "@/components/motion/reveal";
import { about } from "@/content/about";
import { isLocale } from "@/i18n/config";
import { localeAlternates } from "@/lib/i18n-routing";
import { SECTION } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "en";
  const c = about[loc];
  return {
    title: c.title,
    description: c.intro,
    alternates: localeAlternates(loc, "/about"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = about[locale];

  return (
    <PageShell>
      <Section className="px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
              {c.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-pretty text-brown-700">
              {c.intro}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl border border-border shadow-warm">
              <Image
                src="/images/lake-van.jpg"
                alt="Lake Van"
                fill
                sizes="(max-width: 768px) 100vw, 48rem"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="mt-12 flex flex-col gap-12">
            {c.sections.map((s, i) => (
              <Reveal key={i} delay={0.04}>
                <section>
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    {s.heading}
                  </h2>
                  {s.paragraphs.map((p, j) => (
                    <p
                      key={j}
                      className="mt-3 leading-relaxed text-pretty text-brown-700"
                    >
                      {p}
                    </p>
                  ))}
                </section>
              </Reveal>
            ))}
          </div>

          {/* Values */}
          <Reveal>
            <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight text-ink">
              {c.valuesTitle}
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {c.values.map((v, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-card p-5 shadow-soft"
                >
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brown-700">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* CTA back to the home reservation anchor */}
          <Reveal>
            <div className="mt-16 rounded-[2rem] bg-linear-to-br from-coral to-honey p-8 text-center text-shell shadow-warm sm:p-12">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-balance text-shell">
                {c.ctaTitle}
              </h2>
              <Link
                href={`/${locale}#${SECTION.visit}`}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-shell px-7 py-3 text-base font-semibold text-linen shadow-lift transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shell"
              >
                {c.ctaLabel}
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>
    </PageShell>
  );
}
