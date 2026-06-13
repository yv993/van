"use client";

import { Section, Eyebrow } from "@/components/sections/section";
import { Reveal } from "@/components/motion/reveal";
import {
  AraratSilhouette,
  AkhtamarChurch,
  PomegranateSeeds,
} from "@/components/motifs";
import { useT } from "@/i18n/LanguageProvider";
import { SECTION } from "@/lib/site";

export function Heritage() {
  const t = useT();

  return (
    <Section
      id={SECTION.heritage}
      className="relative overflow-hidden bg-olive-700 px-4 py-24 text-linen sm:px-6 lg:py-32"
    >
      {/* Ararat silhouette band */}
      <AraratSilhouette
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 w-full text-linen/[0.07]"
        aria-hidden
      />
      <PomegranateSeeds
        className="pointer-events-none absolute top-20 right-[8%] size-24 text-pomegranate/30"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Sticky visual + intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow className="text-honey">{t.heritage.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance text-linen sm:text-5xl">
              {t.heritage.title}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-pretty text-linen/80">
              {t.heritage.intro}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex items-end gap-6">
              <AkhtamarChurch className="h-44 w-auto text-honey" aria-hidden />
              <span className="mb-2 h-px flex-1 bg-linen/15" aria-hidden />
            </div>
          </Reveal>
        </div>

        {/* Scrolling panels (visual timeline) */}
        <div className="relative flex flex-col">
          <span
            className="absolute top-2 bottom-2 left-[11px] w-px bg-linen/15"
            aria-hidden
          />
          {t.heritage.panels.map((panel, i) => (
            <Reveal key={i} delay={0.05} className="relative pb-12 pl-12 last:pb-0">
              <span className="absolute top-1 left-0 grid size-6 place-items-center rounded-full bg-honey text-xs font-semibold text-olive-700">
                {i + 1}
              </span>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-honey">
                {panel.title}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-pretty text-linen/80">
                {panel.body}
              </p>
            </Reveal>
          ))}
          <Reveal className="mt-2 pl-12">
            <p className="font-display text-xl text-balance text-linen/90 italic">
              {t.heritage.signoff}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
