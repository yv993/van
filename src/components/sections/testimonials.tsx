"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Section, Eyebrow } from "@/components/sections/section";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";
import { useT } from "@/i18n/LanguageProvider";
import { interpolate } from "@/i18n/format";
import { testimonials, type Testimonial } from "@/content/testimonials";
import type { TestimonialId } from "@/i18n/types";
import { unsplash } from "@/content/images";

export function Testimonials() {
  const t = useT();

  function Card({ person }: { person: Testimonial }) {
    const copy = t.testimonials.items[person.id as TestimonialId];
    return (
      <figure className="flex h-full w-[20rem] flex-col rounded-3xl border border-border bg-card p-6 shadow-soft sm:w-[22rem]">
        <div
          className="flex gap-0.5 text-honey"
          aria-label={interpolate(t.testimonials.starsLabel, {
            rating: person.rating,
          })}
        >
          {Array.from({ length: person.rating }).map((_, i) => (
            <Star key={i} className="size-4 fill-current" aria-hidden />
          ))}
        </div>
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

      {/* As featured in — slow strip */}
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

      {/* Testimonial cards — two rows */}
      <div className="mt-12 flex flex-col gap-5">
        <Marquee
          items={testimonials}
          speed={46}
          renderItem={(person) => <Card person={person} />}
        />
        <Marquee
          items={[...testimonials].reverse()}
          speed={52}
          reverse
          renderItem={(person) => <Card person={person} />}
        />
      </div>
    </Section>
  );
}
