"use client";

import Image from "next/image";
import { Section, Eyebrow } from "@/components/sections/section";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { PomegranateSeeds } from "@/components/motifs";
import { useT } from "@/i18n/LanguageProvider";
import { shopProducts, formatPrice } from "@/content/shop";
import { unsplash } from "@/content/images";
import type { ShopProductId } from "@/i18n/types";
import { SECTION } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Shop() {
  const t = useT();

  return (
    <Section id={SECTION.shop} className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="relative mx-auto max-w-7xl">
        <PomegranateSeeds
          className="pointer-events-none absolute -top-6 right-2 size-20 text-pomegranate/15"
          aria-hidden
        />
        <Reveal className="max-w-2xl">
          <Eyebrow>{t.shop.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
            {t.shop.title}
          </h2>
          <p className="mt-4 max-w-md text-lg text-pretty text-brown-700">
            {t.shop.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shopProducts.map((product, i) => {
            const copy = t.shop.products[product.id as ShopProductId];
            const item = {
              id: product.id,
              name: copy.name,
              price: product.price,
              image: unsplash(product.image, 400, 400),
            };
            return (
              <Reveal
                key={product.id}
                delay={(i % 3) * 0.07}
                className={cn(product.featured && "sm:col-span-2 lg:col-span-1")}
              >
                <TiltCard className="h-full">
                  <article
                    className={cn(
                      "group flex h-full flex-col overflow-hidden rounded-3xl border shadow-soft transition-shadow duration-300 hover:shadow-warm",
                      product.featured
                        ? "border-olive/30 bg-olive text-linen"
                        : "border-border bg-card text-ink",
                    )}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={unsplash(product.image, 800, 600)}
                        alt={copy.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        // TODO: swap for the client's real photos
                      />
                      <span className="absolute top-3 left-3 rounded-full bg-cream/90 px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-brown-700 uppercase backdrop-blur-sm">
                        {t.shop.badges[product.badge]}
                      </span>
                      {product.featured ? (
                        <span className="absolute top-3 right-3 rounded-full bg-coral-deep px-3 py-1 text-[0.7rem] font-semibold text-cream shadow-sm">
                          {t.shop.featuredLabel}
                        </span>
                      ) : null}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <p
                        className={cn(
                          "text-[0.7rem] font-medium tracking-wide uppercase",
                          product.featured ? "text-honey" : "text-coral-deep",
                        )}
                      >
                        {copy.tagline}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">
                        {copy.name}
                      </h3>
                      <p
                        className={cn(
                          "mt-2 text-sm leading-relaxed",
                          product.featured ? "text-linen/75" : "text-brown-500",
                        )}
                      >
                        {copy.desc}
                      </p>

                      <div className="mt-5 flex items-center justify-between pt-1">
                        <span className="font-display text-2xl font-semibold tabular-nums transition-transform duration-300 group-hover:-translate-y-0.5">
                          {formatPrice(product.price)}
                        </span>
                        <AddToCartButton
                          item={item}
                          className={cn(
                            product.featured &&
                              "bg-linen text-shell hover:bg-honey",
                          )}
                        />
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
