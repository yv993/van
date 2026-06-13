"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Star, Leaf, Nut, Flame, Candy, type LucideIcon } from "lucide-react";
import { Section, Eyebrow } from "@/components/sections/section";
import { Reveal } from "@/components/motion/reveal";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageProvider";
import {
  menuItems,
  menuCategoryOrder,
  type MenuCategoryId,
  type MenuTag,
  type MenuItem,
} from "@/content/menu";
import { formatPrice } from "@/content/shop";
import { unsplash } from "@/content/images";
import type { MenuItemId } from "@/i18n/types";
import { SECTION } from "@/lib/site";
import { cn } from "@/lib/utils";

type Filter = "all" | MenuCategoryId;

// Dietary markers → a leading lucide glyph (labels come from the dictionaries).
const TAG_META: Record<MenuTag, LucideIcon> = {
  vegetarian: Leaf,
  "contains-nuts": Nut,
  spicy: Flame,
  sweet: Candy,
};
const ALL_TAGS: MenuTag[] = ["vegetarian", "contains-nuts", "spicy", "sweet"];

export function Menu() {
  const { t, locale } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const [activeTags, setActiveTags] = useState<Set<MenuTag>>(new Set());
  const [selected, setSelected] = useState<MenuItem | null>(null);

  const filters: Filter[] = ["all", ...menuCategoryOrder];

  const toggleTag = (tag: MenuTag) =>
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });

  // Category AND dietary tags are AND-combined.
  const visible = menuItems.filter((item) => {
    const catOk = filter === "all" || item.category === filter;
    const tagsOk =
      activeTags.size === 0 ||
      [...activeTags].every((tag) => item.tags?.includes(tag));
    return catOk && tagsOk;
  });

  const selectedCopy = selected
    ? t.menu.items[selected.id as MenuItemId]
    : null;

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

        {/* Dietary tag filter (AND-combined with the category above) */}
        <Reveal delay={0.1}>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold tracking-wide text-brown-500 uppercase">
              {t.menu.dietary}
            </span>
            {ALL_TAGS.map((tag) => {
              const Icon = TAG_META[tag];
              const active = activeTags.has(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral",
                    active
                      ? "border-olive bg-olive text-linen shadow-soft"
                      : "border-border bg-cream/60 text-brown-700 hover:border-olive/40 hover:text-ink",
                  )}
                >
                  <Icon className="size-3.5" aria-hidden />
                  {t.menu.tags[tag]}
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
                  className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
                >
                  <button
                    type="button"
                    onClick={() => setSelected(item)}
                    aria-label={`${item.tr} — ${copy.name}`}
                    className="flex size-full flex-col text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-coral"
                  >
                    <div className="relative aspect-[5/4] w-full overflow-hidden">
                      <Image
                        src={unsplash(item.image, 700, 560)}
                        alt={copy.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
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

                      {item.tags?.length ? (
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => {
                            const Icon = TAG_META[tag];
                            return (
                              <li
                                key={tag}
                                className="inline-flex items-center gap-1 rounded-full bg-paper px-2 py-0.5 text-[0.65rem] font-medium text-brown-700 ring-1 ring-border"
                              >
                                <Icon className="size-3 text-olive" aria-hidden />
                                {t.menu.tags[tag]}
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}
                    </div>
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>

      {/* Dish quick-view lightbox */}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto p-0 sm:max-w-lg">
          {selected && selectedCopy ? (
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={unsplash(selected.image, 900, 560)}
                  alt={selectedCopy.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 32rem"
                  className="object-cover"
                />
                {selected.signature ? (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-coral-deep px-2.5 py-1 text-[0.65rem] font-semibold text-cream shadow-sm">
                    <Star className="size-3 fill-current" />
                    {t.menu.signature}
                  </span>
                ) : null}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <DialogTitle className="font-display text-2xl font-semibold tracking-tight text-ink">
                      {selected.tr}
                    </DialogTitle>
                    <p className="mt-0.5 text-base font-medium text-coral-deep">
                      {selectedCopy.name}
                    </p>
                  </div>
                  <span className="shrink-0 font-display text-2xl font-semibold tabular-nums text-ink">
                    {formatPrice(selected.price)}
                  </span>
                </div>

                {locale === "hy" && selected.hy ? (
                  <span className="font-armenian mt-3 inline-block w-fit rounded-full bg-honey-soft px-3 py-0.5 text-sm text-brown-700">
                    {selected.hy}
                  </span>
                ) : null}

                <DialogDescription className="mt-3 text-base leading-relaxed text-brown-700">
                  {selectedCopy.desc}
                </DialogDescription>

                {selected.tags?.length ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {selected.tags.map((tag) => {
                      const Icon = TAG_META[tag];
                      return (
                        <li
                          key={tag}
                          className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 text-xs font-medium text-brown-700 ring-1 ring-border"
                        >
                          <Icon className="size-3.5 text-olive" aria-hidden />
                          {t.menu.tags[tag]}
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            </div>
          ) : (
            <DialogTitle className="sr-only">{t.menu.title}</DialogTitle>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
