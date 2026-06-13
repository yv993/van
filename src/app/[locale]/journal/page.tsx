import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Section, Eyebrow } from "@/components/sections/section";
import { Reveal } from "@/components/motion/reveal";
import { journalPosts } from "@/content/journal/posts";
import { isLocale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { localeAlternates } from "@/lib/i18n-routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "en";
  const j = dictionaries[loc].journal;
  return {
    title: j.title,
    description: j.subtitle,
    alternates: localeAlternates(loc, "/journal"),
  };
}

export default async function JournalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const j = dictionaries[locale].journal;
  const posts = [...journalPosts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <PageShell>
      <Section className="px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <Eyebrow>{j.eyebrow}</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
              {j.title}
            </h1>
            <p className="mt-4 text-lg text-pretty text-brown-700">
              {j.subtitle}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => {
              const text = post.text[locale];
              const date = new Intl.DateTimeFormat(locale, {
                dateStyle: "long",
              }).format(new Date(`${post.date}T00:00:00`));
              return (
                <Reveal key={post.slug} delay={i * 0.05}>
                  <Link
                    href={`/${locale}/journal/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-shadow hover:shadow-warm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.cover}
                        alt={post.coverAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <time className="text-xs font-semibold tracking-wide text-brown-500 uppercase">
                        {date}
                      </time>
                      <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">
                        {text.title}
                      </h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-brown-700">
                        {text.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-coral-deep">
                        {j.readMore}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
