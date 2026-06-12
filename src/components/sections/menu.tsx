"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Star } from "lucide-react";
import { Section, Eyebrow } from "@/components/sections/section";
import { Reveal } from "@/components/motion/reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import {
  menuItems,
  menuCategoryOrder,
  type MenuCategoryId,
} from "@/content/menu";
import { formatPrice } from "@/content/shop";
import { unsplash } from "@/content/images";
import type { MenuItemId } from "@/i18n/types";
import { SECTION } from "@/lib/site";
import { cn } from "@/lib/utils";

type Filter = "all" | MenuCategoryId;

export function Menu() {
  const { t, locale } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");

  const filters: Filter[] = ["all", ...menuCategoryOrder];
  const visible =
    filter === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === filter);

  return (
    <Section id={SECTION.menu} className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t.menu.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
            {t.menu.title}
          </h2>
          <p className="mt-4 max-w-lg text-lg text-pretty text-brown-700">
            {t.menu.subtitle}
          </p>
        </Reveal>

        {/* Category pills */}
        <Reveal delay={0.06}>
          <div
            className="mt-9 flex flex-wrap gap-2"
            role="group"
            aria-label={t.menu.title}
          >
            {filters.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral",
                    active
                      ? "border-coral-deep bg-coral-deep text-cream shadow-soft"
                      : "border-border bg-cream/60 text-brown-700 hover:border-coral-deep/40 hover:text-ink",
                  )}
                >
                  {f === "all" ? t.menu.all : t.menu.categories[f]}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Cards */}
        <motion.ul
          layout
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item) => {
              const copy = t.menu.items[item.id as MenuItemId];
              return (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
                >
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <Image
                      src={unsplash(item.image, 700, 560)}
                      alt={copy.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      // TODO: swap for the client's real photos
                    />
                    {item.signature ? (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-coral-deep px-2.5 py-1 text-[0.65rem] font-semibold text-cream shadow-sm">
                        <Star className="size-3 fill-current" />
                        {t.menu.signature}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                          {item.tr}
                        </h3>
                        <p className="text-sm font-medium text-coral-deep">
                          {copy.name}
                        </p>
                      </div>
                      <span className="shrink-0 font-display text-lg font-semibold tabular-nums text-ink">
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    {locale === "hy" && item.hy ? (
                      <span className="font-armenian mt-2 w-fit rounded-full bg-honey-soft px-2.5 py-0.5 text-xs text-brown-700">
                        {item.hy}
                      </span>
                    ) : null}

                    <p className="mt-2 text-sm leading-relaxed text-brown-500">
                      {copy.desc}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </Section>
  );
}
