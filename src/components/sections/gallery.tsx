"use client";

import Image from "next/image";
import { Section, Eyebrow } from "@/components/sections/section";
import { Reveal } from "@/components/motion/reveal";
import { ImageCompare } from "@/components/image-compare";
import { useT } from "@/i18n/LanguageProvider";
import { galleryItems, compareImages } from "@/content/gallery";
import { unsplash } from "@/content/images";
import { SECTION } from "@/lib/site";

export function Gallery() {
  const t = useT();

  return (
    <Section id={SECTION.gallery} className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t.gallery.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
            {t.gallery.title}
          </h2>
          <p className="mt-4 text-lg text-pretty text-brown-700">
            {t.gallery.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {/* Comparison slider */}
            <div className="break-inside-avoid">
              <ImageCompare
                beforeSrc={unsplash(compareImages.before.image, 900, 680)}
                beforeAlt={t.gallery.alt[compareImages.before.alt]}
                beforeLabel={t.gallery.beforeLabel}
                afterSrc={unsplash(compareImages.after.image, 900, 680)}
                afterAlt={t.gallery.alt[compareImages.after.alt]}
                afterLabel={t.gallery.afterLabel}
                hint={t.gallery.compareHint}
              />
            </div>

            {galleryItems.map((item, i) => {
              const tall = i % 3 === 0;
              const h = tall ? 1000 : 680;
              return (
                <figure
                  key={item.id}
                  className="group break-inside-avoid overflow-hidden rounded-3xl border border-border shadow-soft"
                >
                  <Image
                    src={unsplash(item.image, 800, h)}
                    alt={t.gallery.alt[item.alt]}
                    width={800}
                    height={h}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    // TODO: swap for the client's real photos
                  />
                </figure>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
