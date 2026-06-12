"use client";

import Image from "next/image";
import { Section, Eyebrow } from "@/components/sections/section";
import { Reveal, Stagger, RevealItem } from "@/components/motion/reveal";
import { useT } from "@/i18n/LanguageProvider";
import { IMG, unsplash } from "@/content/images";

export function Ritual() {
  const t = useT();

  return (
    <Section className="bg-honey-soft px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Stacked imagery */}
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-cream shadow-lift sm:aspect-square">
            <Image
              src={unsplash(IMG.ritualStack, 900, 900)}
              alt={t.ritual.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              // TODO: swap for the client's real photos
            />
          </div>
          <div className="absolute -right-4 -bottom-8 hidden aspect-square w-44 overflow-hidden rounded-3xl border-4 border-cream shadow-warm sm:block">
            <Image
              src={unsplash(IMG.ritualSide, 360, 360)}
              alt=""
              fill
              sizes="176px"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <Eyebrow>{t.ritual.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
              {t.ritual.title}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-pretty text-brown-700">
              {t.ritual.body}
            </p>
          </Reveal>

          <Stagger className="mt-8 flex flex-col gap-3">
            {t.ritual.steps.map((step, i) => (
              <RevealItem key={i}>
                <div className="flex items-center gap-4 rounded-2xl border border-cream bg-cream/70 p-4 backdrop-blur-sm">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-coral-deep font-display text-base font-semibold text-cream">
                    {i + 1}
                  </span>
                  <span className="font-medium text-ink">{step}</span>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
