"use client";

import Image from "next/image";
import { Star, ExternalLink } from "lucide-react";
import { Section, Eyebrow } from "@/components/sections/section";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";
import { useT } from "@/i18n/LanguageProvider";
import { interpolate } from "@/i18n/format";
import { testimonials, type Testimonial } from "@/content/testimonials";
import type { TestimonialId } from "@/i18n/types";
import type { GoogleReview, GoogleReviews } from "@/lib/google-reviews";
import { unsplash } from "@/content/images";

export function Testimonials({ reviews }: { reviews?: GoogleReviews | null }) {
  const t = useT();

  // Curated placeholder review (used when no Google key is configured).
  function CuratedCard({ person }: { person: Testimonial }) {
    const copy = t.testimonials.items[person.id as TestimonialId];
    return (
      <figure className="flex h-full w-[20rem] flex-col rounded-3xl border border-border bg-card p-6 shadow-soft sm:w-[22rem]">
        <Stars rating={person.rating} />
        <blockquote className="mt-4 flex-1 text-pretty text-brown-700">
          “{copy.quote}”
        </blockquote>
        <figcaption className="mt-5 flex items-center gap-3">
          <span className="relative size-11 overflow-hidden rounded-full border border-border">
            <Image
              src={unsplash(person.avatar, 96, 96)}
              alt=""
              fill
              sizes="44px"
              className="object-cover"
            />
          </span>
          <span>
            <span className="block font-medium text-ink">{person.name}</span>
            <span className="block text-sm text-brown-500">{copy.role}</span>
          </span>
        </figcaption>
      </figure>
    );
  }

  // Real Google review card (content shown verbatim, not reordered/modified).
  function GoogleCard({ review }: { review: GoogleReview }) {
    return (
      <figure className="flex h-full w-[20rem] flex-col rounded-3xl border border-border bg-card p-6 shadow-soft sm:w-[22rem]">
        <Stars rating={Math.round(review.rating)} />
        <blockquote className="mt-4 flex-1 text-pretty text-brown-700">
          <span className="line-clamp-6">“{review.text}”</span>
        </blockquote>
        <figcaption className="mt-5 flex items-center gap-3">
          {review.profilePhoto ? (
            // eslint-disable-next-line @next/next/no-img-element -- external Google avatar; the next/image optimizer can't reliably fetch Google's photo CDN
            <img
              src={review.profilePhoto}
              alt=""
              width={44}
              height={44}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="size-11 rounded-full border border-border object-cover"
            />
          ) : (
            <span className="grid size-11 place-items-center rounded-full border border-border bg-honey-soft font-display text-lg font-semibold text-brown-700">
              {review.author.charAt(0)}
            </span>
          )}
          <span className="min-w-0">
            <span className="block truncate font-medium text-ink">
              {review.author}
            </span>
            <span className="block text-sm text-brown-500">
              {review.relativeTime}
            </span>
          </span>
        </figcaption>
      </figure>
    );
  }

  function Stars({ rating }: { rating: number }) {
    return (
      <div
        className="flex gap-0.5 text-honey"
        aria-label={interpolate(t.testimonials.starsLabel, { rating })}
      >
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="size-4 fill-current" aria-hidden />
        ))}
      </div>
    );
  }

  const hasGoogle = !!reviews && reviews.reviews.length > 0;

  return (
    <Section className="overflow-hidden bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t.testimonials.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
            {t.testimonials.title}
          </h2>
          <p className="mt-4 text-lg text-pretty text-brown-700">
            {t.testimonials.subtitle}
          </p>
        </Reveal>
      </div>

      {hasGoogle ? (
        /* Real Google rating + REQUIRED attribution + link to all reviews */
        <Reveal className="mt-10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 sm:px-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-soft">
              <span className="font-display text-xl font-semibold text-ink">
                {interpolate(t.testimonials.ratingFormat, {
                  rating: reviews!.rating.toFixed(1),
                  total: reviews!.total,
                })}
              </span>
            </span>
            <span className="text-sm text-brown-500">
              {t.testimonials.googleAttribution}
            </span>
            <a
              href={reviews!.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-coral-deep underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
            >
              {t.testimonials.readAllGoogle}
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          </div>
        </Reveal>
      ) : (
        /* As featured in — curated press strip */
        <Reveal className="mt-12">
          <p className="mb-5 px-4 text-center text-xs font-semibold tracking-[0.18em] text-brown-500 uppercase">
            {t.testimonials.featuredIn}
          </p>
          <Marquee
            items={t.testimonials.featuredLogos}
            speed={48}
            renderItem={(logo) => (
              <span className="font-display text-xl font-medium whitespace-nowrap text-ink/40">
                {logo}
              </span>
            )}
            itemClassName="px-4"
          />
        </Reveal>
      )}

      {/* Cards — two rows */}
      <div className="mt-12 flex flex-col gap-5">
        {hasGoogle ? (
          <>
            <Marquee
              items={reviews!.reviews}
              speed={46}
              renderItem={(review) => <GoogleCard review={review} />}
            />
            <Marquee
              items={[...reviews!.reviews].reverse()}
              speed={52}
              reverse
              renderItem={(review) => <GoogleCard review={review} />}
            />
          </>
        ) : (
          <>
            <Marquee
              items={testimonials}
              speed={46}
              renderItem={(person) => <CuratedCard person={person} />}
            />
            <Marquee
              items={[...testimonials].reverse()}
              speed={52}
              reverse
              renderItem={(person) => <CuratedCard person={person} />}
            />
          </>
        )}
      </div>
    </Section>
  );
}
