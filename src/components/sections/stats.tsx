"use client";

import { Section, Eyebrow } from "@/components/sections/section";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { Wheat } from "@/components/motifs";
import { useT } from "@/i18n/LanguageProvider";

export function Stats() {
  const t = useT();

  return (
    <Section className="px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-olive px-6 py-14 text-linen shadow-warm sm:px-12">
          <Wheat
            className="pointer-events-none absolute -top-2 right-6 h-28 text-honey/25"
            aria-hidden
          />
          <Wheat
            className="pointer-events-none absolute -bottom-6 left-8 hidden h-24 rotate-12 text-linen/10 sm:block"
            aria-hidden
          />

          <Reveal className="flex justify-center">
            <Eyebrow className="text-honey">{t.stats.eyebrow}</Eyebrow>
          </Reveal>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {t.stats.items.map((item, i) => (
              <Reveal
                key={i}
                delay={i * 0.08}
                className="relative text-center lg:text-left"
              >
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <span className="block font-display text-5xl font-semibold tracking-tight text-honey tabular-nums sm:text-6xl">
                    <Counter value={item.value} suffix={item.suffix} />
                  </span>
                  <span className="mt-2 block text-sm leading-snug text-linen/75">
                    {item.label}
                  </span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
