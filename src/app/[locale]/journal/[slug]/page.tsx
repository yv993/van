import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/sections/section";
import { Reveal } from "@/components/motion/reveal";
import { journalPosts } from "@/content/journal/posts";
import { isLocale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { localeAlternates, localeUrl } from "@/lib/i18n-routing";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Newest first — also the order used for prev/next.
const sorted = [...journalPosts].sort((a, b) => b.date.localeCompare(a.date));

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = isLocale(locale) ? locale : "en";
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) return {};
  const text = post.text[loc];
  return {
    title: text.title,
    description: text.excerpt,
    alternates: localeAlternates(loc, `/journal/${slug}`),
    openGraph: {
      type: "article",
      title: text.title,
      description: text.excerpt,
      images: [post.cover],
      publishedTime: post.date,
    },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const idx = sorted.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();

  const post = sorted[idx]!;
  const text = post.text[locale];
  const j = dictionaries[locale].journal;
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
    new Date(`${post.date}T00:00:00`),
  );
  const olderPost = sorted[idx + 1]; // "previous" (chronologically earlier)
  const newerPost = sorted[idx - 1]; // "next" (more recent)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: text.title,
    description: text.excerpt,
    datePublished: post.date,
    image: `${SITE_URL}${post.cover}`,
    inLanguage: locale,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: localeUrl(locale, `/journal/${slug}`),
  };

  return (
    <PageShell>
      <Section className="px-4 sm:px-6">
        <article className="mx-auto max-w-2xl">
          <Reveal>
            <Link
              href={`/${locale}/journal`}
              className="inline-flex items-center gap-2 text-sm text-brown-700 transition-colors hover:text-coral-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
            >
              <ArrowLeft className="size-4" aria-hidden />
              {j.backToJournal}
            </Link>
            <time className="mt-6 block text-xs font-semibold tracking-wide text-brown-500 uppercase">
              {date}
            </time>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
              {text.title}
            </h1>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="relative mt-7 aspect-[16/9] overflow-hidden rounded-3xl border border-border shadow-warm">
              <Image
                src={post.cover}
                alt={post.coverAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 42rem"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 flex flex-col gap-5">
              {text.body.map((p, i) => (
                <p
                  key={i}
                  className="text-lg leading-relaxed text-pretty text-brown-700"
                >
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Prev / next */}
          <nav className="mt-14 grid grid-cols-2 gap-4 border-t border-border pt-6">
            {olderPost ? (
              <Link
                href={`/${locale}/journal/${olderPost.slug}`}
                className="rounded-2xl border border-border bg-card p-4 transition-colors hover:border-coral-deep/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
              >
                <span className="text-xs font-semibold tracking-wide text-brown-500 uppercase">
                  ← {j.prev}
                </span>
                <span className="mt-1 block font-display font-semibold text-ink">
                  {olderPost.text[locale].title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {newerPost ? (
              <Link
                href={`/${locale}/journal/${newerPost.slug}`}
                className="rounded-2xl border border-border bg-card p-4 text-right transition-colors hover:border-coral-deep/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
              >
                <span className="text-xs font-semibold tracking-wide text-brown-500 uppercase">
                  {j.next} →
                </span>
                <span className="mt-1 block font-display font-semibold text-ink">
                  {newerPost.text[locale].title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </article>
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
