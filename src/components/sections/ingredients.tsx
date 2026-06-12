"use client";

import Image from "next/image";
import { Leaf } from "lucide-react";
import { Section, Eyebrow } from "@/components/sections/section";
import { Reveal, Stagger, RevealItem } from "@/components/motion/reveal";
import { useT } from "@/i18n/LanguageProvider";
import { IMG, unsplash } from "@/content/images";
import { SECTION } from "@/lib/site";

const THUMBS = [
  IMG.ingredientCheese,
  IMG.ingredientHoney,
  IMG.ingredientButter,
  IMG.ingredientWalnut,
  IMG.ingredientHerbs,
];

export function Ingredients() {
  const t = useT();

  return (
    <Section
      id={SECTION.story}
      className="bg-cream px-4 py-20 sm:px-6 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t.ingredients.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
            {t.ingredients.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Ingredient list */}
          <Stagger className="flex flex-col gap-3 lg:col-span-4">
            {t.ingredients.list.map((entry, i) => (
              <RevealItem key={i}>
                <div className="flex items-center gap-4 rounded-2xl border border-border bg-paper/60 p-3 transition-colors hover:border-coral/30 hover:bg-paper">
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-border">
                    <Image
                      src={unsplash(THUMBS[i % THUMBS.length], 120, 120)}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium text-ink">
                      {entry.name}
                    </span>
                    <span className="block text-sm text-brown-500">
                      {entry.note}
                    </span>
                  </span>
                </div>
              </RevealItem>
            ))}
          </Stagger>

          {/* Hero jar image */}
          <Reveal delay={0.1} className="lg:col-span-4">
            <div className="relative h-full min-h-[22rem] overflow-hidden rounded-3xl border border-border shadow-warm">
              <Image
                src={unsplash(IMG.ingredientsHero, 800, 1000)}
                alt={t.ingredients.heroCaption}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
                // TODO: swap for the client's real photos
              />
              <div className="absolute inset-0 bg-linear-to-t from-shell/55 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-brown-700 backdrop-blur-sm">
                {t.ingredients.heroCaption}
              </span>
            </div>
          </Reveal>

          {/* Promise */}
          <Reveal delay={0.16} className="lg:col-span-4">
            <div className="flex h-full flex-col justify-between gap-6 rounded-3xl bg-olive p-7 text-linen shadow-warm">
              <span className="grid size-12 place-items-center rounded-full bg-linen/15 text-honey">
                <Leaf className="size-6" />
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-honey">
                  {t.ingredients.promiseTitle}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-pretty text-linen/85">
                  {t.ingredients.promiseBody}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
