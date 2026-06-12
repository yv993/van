"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Section } from "@/components/sections/section";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/motion/reveal";
import { PomegranateSeeds, Walnut, Wheat, OliveSprig } from "@/components/motifs";
import { useT } from "@/i18n/LanguageProvider";
import { useSmoothScroll } from "@/components/motion/smooth-scroll";
import { IMG, unsplash } from "@/content/images";
import { SECTION } from "@/lib/site";

const SIGNATURE_THUMBS = [
  { img: IMG.heroThumbCheese, key: "otlu-peynir" },
  { img: IMG.heroThumbHoneyCream, key: "bal-kaymak" },
  { img: IMG.heroThumbHoney, key: "honey" },
];

export function Hero() {
  const t = useT();
  const reduced = useReducedMotion();
  const { scrollTo } = useSmoothScroll();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const yBack = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <Section id={SECTION.hero} className="overflow-clip">
      <div ref={ref} className="relative">
        {/* Warm aurora glow */}
        <div className="bg-radial-warm pointer-events-none absolute inset-x-0 top-0 h-[140%]" aria-hidden />
        <div
          className="animate-aurora pointer-events-none absolute -top-40 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-coral/20 blur-[120px]"
          aria-hidden
        />

        {/* Floating motifs */}
        <motion.div
          aria-hidden
          style={reduced ? undefined : { y: yBack }}
          className="pointer-events-none absolute inset-0"
        >
          <PomegranateSeeds className="absolute top-28 left-[6%] size-16 text-pomegranate/20 sm:size-24" />
          <Walnut className="absolute top-[42%] left-[3%] size-12 text-brown-700/15 sm:size-16" />
          <Wheat className="absolute top-24 right-[8%] hidden h-28 text-honey/40 lg:block" />
          <OliveSprig className="absolute bottom-24 right-[6%] hidden w-28 text-olive/25 lg:block" />
        </motion.div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-32 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-40 lg:pb-28">
          {/* Copy */}
          <div className="relative z-10 max-w-xl">
            <Reveal from="right" distance={40}>
              <span className="inline-flex items-center gap-2 rounded-full border border-coral/20 bg-cream/70 px-4 py-1.5 backdrop-blur-sm">
                <span className="font-armenian text-base text-pomegranate">
                  {t.hero.eyebrowArmenian}
                </span>
                <span className="text-sm text-brown-500">
                  — {t.hero.eyebrowGloss}
                </span>
              </span>
            </Reveal>

            <Reveal delay={0.06} from="right" distance={56}>
              <h1 className="mt-6 font-display text-[clamp(2rem,6.5vw,5.6rem)] leading-[0.95] font-semibold tracking-tight text-balance wrap-break-word hyphens-auto text-ink uppercase sm:leading-[0.92]">
                {t.hero.titleLines.map((line, i) => (
                  <span key={i} className="block">
                    {i === 1 ? (
                      <span className="text-coral">{line}</span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-pretty text-brown-700">
                {t.hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <CtaButton
                  variant="primary"
                  size="lg"
                  magnetic
                  onClick={() => scrollTo(`#${SECTION.visit}`)}
                >
                  {t.common.reserve}
                  <ArrowRight className="size-4" />
                </CtaButton>
                <CtaButton
                  variant="outline"
                  size="lg"
                  onClick={() => scrollTo(`#${SECTION.menu}`)}
                >
                  {t.common.seeMenu}
                </CtaButton>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2">
                {t.hero.badges.map((badge, i) => (
                  <li
                    key={i}
                    className="inline-flex items-center gap-2 text-sm font-medium text-brown-700"
                  >
                    <Sparkles className="size-4 text-honey" />
                    {badge}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Visual */}
          <Reveal delay={0.1} from="right" distance={72} scaleFrom={1.06} className="relative z-10">
            <div className="relative">
              <motion.div
                style={reduced ? undefined : { y: yImage }}
                className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-cream shadow-lift sm:aspect-[5/6]"
              >
                <motion.div
                  style={reduced ? undefined : { scale: scaleImage }}
                  className="absolute inset-0"
                >
                  <Image
                    src={unsplash(IMG.heroSpread, 1100, 1320)}
                    alt={t.gallery.alt.fullTable}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                    // TODO: swap for the client's real photos / Higgsfield hero
                  />
                  {/* Cinematic hero loop — covers the still once loaded.
                      Disabled under reduced motion (still image only). The
                      priority <Image> above stays the LCP element + poster. */}
                  {!reduced ? (
                    <video
                      className="absolute inset-0 size-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="none"
                      poster="/images/hero-poster.jpg"
                      aria-hidden
                    >
                      <source src="/video/hero.mp4" type="video/mp4" />
                    </video>
                  ) : null}
                </motion.div>
                <div className="absolute inset-0 bg-linear-to-t from-shell/30 via-transparent to-transparent" />
              </motion.div>

              {/* Signature thumbnails */}
              <div className="absolute -bottom-6 -left-2 flex items-center gap-3 rounded-3xl border border-border bg-cream/90 p-3 shadow-warm backdrop-blur-sm sm:-left-8">
                <span className="px-2 text-[0.65rem] font-semibold tracking-wide text-brown-500 uppercase">
                  {t.hero.signature}
                </span>
                <div className="flex -space-x-3">
                  {SIGNATURE_THUMBS.map((thumb) => (
                    <span
                      key={thumb.key}
                      className="relative size-12 overflow-hidden rounded-full border-2 border-cream shadow-sm"
                    >
                      <Image
                        src={unsplash(thumb.img, 120, 120)}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </span>
                  ))}
                </div>
              </div>

              {/* Rating chip */}
              <div className="absolute -top-4 -right-2 hidden items-center gap-2 rounded-2xl border border-border bg-cream/90 px-3.5 py-2 shadow-warm backdrop-blur-sm sm:flex">
                <span className="flex text-honey">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </span>
                <span className="text-xs font-medium text-brown-700">4.9 · Van</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
