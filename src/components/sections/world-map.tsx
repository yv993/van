"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Section, Eyebrow } from "@/components/sections/section";
import { Reveal } from "@/components/motion/reveal";
import { GlobeStage } from "@/components/cinematic/globe-stage";
import { ScrollyMap } from "@/components/cinematic/scrolly-map";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useT } from "@/i18n/LanguageProvider";

// Build-time constant (inlined by Next) — identical on server + client, so
// branching on it in render is hydration-safe.
const HAS_MAPBOX_TOKEN = !!process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

/**
 * Chapter 4 "advancing map": with a Mapbox token, a live satellite globe flies
 * in to Akhtamar Island (GlobeStage). Without one — the default — a fully
 * scroll-scrubbed descent (ScrollyMap) plays from existing local assets: stars
 * drift, the earth zooms toward Anatolia and dissolves into Lake Van from
 * space, a honey flight-arc draws to a pulsing coral pin. The caption cards
 * are scrubbed too, so they stage in as the descent reaches them. This section
 * lives inside Chapter 4's zoom transform, so NOTHING here is pinned — all
 * animation is driven from the panel's in-flow scroll progress.
 */
export function WorldMap() {
  const t = useT();
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  // In-flow scroll progress for the panel (no pinning — a transformed Chapter
  // ancestor would break position:sticky/fixed anyway).
  const { scrollYProgress: progress } = useScroll({
    target: panelRef,
    offset: ["start 85%", "end 35%"],
  });

  // Caption cards glide in from the right, sequenced to the descent.
  const card1Opacity = useTransform(progress, [0.22, 0.38], [0, 1]);
  const card1X = useTransform(progress, [0.22, 0.38], [48, 0]);
  const card2Opacity = useTransform(progress, [0.5, 0.66], [0, 1]);
  const card2X = useTransform(progress, [0.5, 0.66], [48, 0]);

  return (
    <Section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal from="right" className="max-w-2xl">
          <Eyebrow>{t.worldMap.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
            {t.worldMap.title}
          </h2>
          <p className="mt-4 max-w-lg text-lg text-pretty text-brown-700">
            {t.worldMap.body}
          </p>
        </Reveal>

        <div
          ref={panelRef}
          className="relative mt-10 overflow-hidden rounded-[2rem] border border-border bg-[#0a0806] shadow-warm"
        >
          <div className="relative aspect-[16/11] w-full sm:aspect-[16/9]">
            {HAS_MAPBOX_TOKEN ? (
              <GlobeStage
                mode="map"
                markerLabel={t.worldMap.markerLabel}
                alt={t.worldMap.alt}
                className="absolute inset-0"
              />
            ) : (
              <ScrollyMap
                progress={progress}
                alt={t.worldMap.alt}
                className="absolute inset-0"
              />
            )}
          </div>

          {/* Caption cards — scrubbed in from the right as the descent reaches
              them. Under reduced motion they render as PLAIN divs (visible): a
              persistent motion node would mount with its progress=0 styles
              (opacity 0) on the first render — before the hydration-safe
              reduced-motion hook flips true — and stay stuck invisible. */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex w-full max-w-sm flex-col justify-center gap-4 p-5 sm:p-8">
            {reduced ? (
              <div className="pointer-events-auto rounded-2xl border border-border bg-cream/90 p-5 shadow-soft backdrop-blur-md">
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                  {t.worldMap.card1.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-brown-700">
                  {t.worldMap.card1.text}
                </p>
              </div>
            ) : (
              <motion.div
                className="pointer-events-auto rounded-2xl border border-border bg-cream/90 p-5 shadow-soft backdrop-blur-md"
                style={{ opacity: card1Opacity, x: card1X }}
              >
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                  {t.worldMap.card1.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-brown-700">
                  {t.worldMap.card1.text}
                </p>
              </motion.div>
            )}
            {reduced ? (
              <div className="pointer-events-auto rounded-2xl border border-border bg-cream/90 p-5 shadow-soft backdrop-blur-md">
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                  {t.worldMap.card2.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-brown-700">
                  {t.worldMap.card2.text}
                </p>
              </div>
            ) : (
              <motion.div
                className="pointer-events-auto rounded-2xl border border-border bg-cream/90 p-5 shadow-soft backdrop-blur-md"
                style={{ opacity: card2Opacity, x: card2X }}
              >
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                  {t.worldMap.card2.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-brown-700">
                  {t.worldMap.card2.text}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
