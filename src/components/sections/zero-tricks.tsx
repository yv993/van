"use client";

import Image from "next/image";
import { Section, Eyebrow } from "@/components/sections/section";
import { Reveal } from "@/components/motion/reveal";
import { useT } from "@/i18n/LanguageProvider";
import { IMG, unsplash } from "@/content/images";
import { cn } from "@/lib/utils";

const CARDS = [
  // Theme-constant colored cards → theme-constant text (linen/shell).
  {
    img: IMG.zeroLake,
    bg: "bg-olive",
    text: "text-linen",
    sub: "text-linen/75",
    accent: "text-honey",
  },
  {
    img: IMG.zeroHerbs,
    bg: "bg-honey",
    text: "text-shell",
    sub: "text-shell/75",
    accent: "text-olive",
  },
  {
    img: IMG.zeroHoney,
    bg: "bg-coral",
    text: "text-linen",
    sub: "text-linen/85",
    accent: "text-honey",
  },
];

export function ZeroTricks() {
  const t = useT();

  return (
    <Section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t.zeroTricks.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
            {t.zeroTricks.title}
          </h2>
          <p className="mt-4 max-w-lg text-lg text-pretty text-brown-700">
            {t.zeroTricks.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.zeroTricks.cards.map((card, i) => {
            const style = CARDS[i % CARDS.length];
            return (
              <Reveal key={i} delay={i * 0.08}>
                <article
                  className={cn(
                    "flex h-full flex-col gap-5 rounded-3xl p-5 shadow-soft transition-transform duration-300 hover:-translate-y-1",
                    style.bg,
                    style.text,
                  )}
                >
                  <div className="relative aspect-[16/11] overflow-hidden rounded-2xl ring-1 ring-black/10">
                    <Image
                      src={unsplash(style.img, 700, 480)}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      // TODO: swap for the client's real photos
                    />
                  </div>
                  <div className="px-1 pb-2">
                    <span
                      className={cn(
                        "text-[0.7rem] font-semibold tracking-[0.18em] uppercase",
                        style.accent,
                      )}
                    >
                      0{i + 1}
                    </span>
                    <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight">
                      {card.title}
                    </h3>
                    <p className={cn("mt-2 leading-relaxed", style.sub)}>
                      {card.desc}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
