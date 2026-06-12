"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useT } from "@/i18n/LanguageProvider";
import { useSmoothScroll } from "@/components/motion/smooth-scroll";
import { SECTION } from "@/lib/site";
import { GlobeStage } from "./globe-stage";
import { ScrubStage } from "./scrub-stage";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Chapter 1 opener, SpaceX-style: a photoreal Earth hangs in black space on
 * the right while the headline sits on the left; scrolling scrubs a
 * pre-rendered cinematic descent (ScrubStage) from orbit down to Lake Van,
 * then a warm "whiteout" hands off to the Hero below. Progress is computed
 * explicitly from window scroll ÷ the sticky pin distance (motion's
 * target-based useScroll offsets behave unpredictably across a sticky pin),
 * so the whole earth→Lake-Van descent maps cleanly to 0→1 while pinned.
 * GlobeStage stays mounted underneath as the no-video fallback (decode
 * failure, iOS Low Power Mode). Under reduced motion the stage collapses to
 * a short static earth banner.
 */
export function IntroStage() {
  const reduced = useReducedMotion();
  const t = useT();
  const { scrollTo } = useSmoothScroll();
  const ref = useRef<HTMLDivElement>(null);
  // Seed from a 240vh−100vh estimate so progress doesn't collapse to 1 before
  // the effect measures (deep links / scroll restoration).
  const pinRef = useRef(
    typeof window !== "undefined" ? Math.max(1, window.innerHeight * 1.4) : 1,
  );

  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (v) => clamp01(v / pinRef.current));

  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (el) pinRef.current = Math.max(1, el.offsetHeight - window.innerHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // SpaceX-style headline block over the black left half of the earth frame:
  // gone by the time the dive is underway.
  const headlineOpacity = useTransform(progress, [0, 0.16], [1, 0]);
  const headlineY = useTransform(progress, [0, 0.16], [0, -36]);
  // "Van" label fades in during the final approach over the lake.
  const arrivalOpacity = useTransform(
    progress,
    [0.42, 0.52, 0.78, 0.88],
    [0, 1, 1, 0],
  );
  const paperFade = useTransform(progress, [0.72, 0.9], [0, 1]);

  if (reduced) {
    return (
      <div className="relative h-[58vh] min-h-[420px] w-full">
        <GlobeStage mode="intro" alt={t.worldMap.alt} className="absolute inset-0" />
        <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-1.5 px-6 text-center">
          <p className="font-armenian text-2xl text-linen drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
            {t.hero.eyebrowArmenian}
            {t.hero.eyebrowTurkish ? (
              <span className="ml-2 font-display text-xl text-linen/90 italic">
                · {t.hero.eyebrowTurkish}
              </span>
            ) : null}
          </p>
          <p className="text-xs font-semibold tracking-[0.3em] text-linen/75 uppercase">
            {t.worldMap.eyebrow}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[240vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Fallback descent (earth still → lake photo) — also the poster the
            scrub video fades in over once its frames are decoded. */}
        <GlobeStage
          mode="intro"
          progress={progress}
          alt={t.worldMap.alt}
          arrivalSrc="/images/descent-arrival-v3.jpg"
          arrivalAlt={t.gallery.alt.lake}
          posterSrc="/images/descent-poster-v3.jpg"
          posterFit="cover"
          className="absolute inset-0"
        />
        {/* Scroll-scrubbed cinematic descent (transparent until ready). */}
        <ScrubStage progress={progress} className="z-[1]" />

        {/* SpaceX-style headline (a cinematic title card; the Hero below is the
            settled landing with the image + CTAs). Left side, over the space. */}
        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="absolute inset-0 z-[2]"
        >
          {/* legibility scrim so cream text holds contrast over the bright,
              animating earth — motion-independent, fades with the overlay */}
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/60 via-black/25 to-transparent"
            aria-hidden
          />
          {/* safe center: when the block is taller than the viewport it
              top-aligns below the nav instead of sliding under it */}
          <div className="pointer-events-none mx-auto flex h-full max-w-7xl px-4 pt-24 pb-8 items-center-safe sm:px-6 sm:pt-28">
            <div className="relative max-w-xl pb-8">
              <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="font-armenian text-2xl text-linen drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)] sm:text-3xl">
                  {t.hero.eyebrowArmenian}
                </span>
                {t.hero.eyebrowTurkish ? (
                  <span className="font-display text-xl text-linen/90 italic drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)] sm:text-2xl">
                    · {t.hero.eyebrowTurkish}
                  </span>
                ) : null}
                <span className="text-xs font-semibold tracking-[0.3em] text-linen/75 uppercase">
                  {t.hero.eyebrowGloss}
                </span>
              </p>
              {/* A cinematic cold-open line about the descent itself — the Hero
                  below delivers the bold "THE MORNING THAT FED EMPIRES" payoff. */}
              <p className="mt-5 max-w-lg font-display text-[clamp(1.9rem,4.6vw,4rem)] leading-[1.04] font-semibold tracking-tight text-balance wrap-break-word text-linen drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)]">
                {t.worldMap.title}
              </p>
              <button
                type="button"
                onClick={() => scrollTo(`#${SECTION.hero}`)}
                className="pointer-events-auto mt-8 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-linen/80 uppercase transition-colors hover:text-linen focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-linen"
              >
                {t.hero.scroll}
                <ArrowDown className="size-4 animate-bounce" aria-hidden />
              </button>
            </div>
          </div>
        </motion.div>

        {/* "Van" label that fades in on the final approach over the lake. */}
        <motion.div
          style={{ opacity: arrivalOpacity }}
          className="pointer-events-none absolute inset-x-0 top-[42%] z-[2] flex flex-col items-center gap-2 px-6 text-center"
        >
          <span className="size-3 rounded-full bg-coral ring-4 ring-coral/30" aria-hidden />
          <p className="font-display text-4xl font-semibold tracking-tight text-linen drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)] sm:text-6xl">
            Van
          </p>
          <p className="text-xs font-semibold tracking-[0.3em] text-linen/85 uppercase">
            38.5° N · 43.4° E
          </p>
        </motion.div>

        {/* Warm whiteout that hands the stage off to the Hero (paper). */}
        <motion.div
          style={{ opacity: paperFade }}
          className="pointer-events-none absolute inset-0 z-[3] bg-paper"
          aria-hidden
        />
      </div>
    </div>
  );
}
