"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useT } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

interface ScrollyMapProps {
  /** Chapter-4 panel scroll progress 0..1 (useScroll, start 85% → end 35%). */
  progress: MotionValue<number>;
  /** Screen-reader description of the whole stage. */
  alt: string;
  className?: string;
}

// Two parallax starfields painted purely with CSS radial-gradient dots — no
// image, no canvas. Each "star" is a sub-pixel radial-gradient at a fixed
// offset inside a tile that repeats across the layer.
const STAR_TILE_A =
  "radial-gradient(1px 1px at 18px 24px, #fff, transparent 60%)," +
  "radial-gradient(1px 1px at 62px 88px, rgba(255,255,255,0.85), transparent 60%)," +
  "radial-gradient(1.4px 1.4px at 120px 40px, #fff, transparent 60%)," +
  "radial-gradient(1px 1px at 168px 132px, rgba(255,255,255,0.7), transparent 60%)," +
  "radial-gradient(1px 1px at 30px 158px, rgba(255,255,255,0.8), transparent 60%)";
const STAR_TILE_B =
  "radial-gradient(1px 1px at 80px 50px, rgba(255,255,255,0.9), transparent 60%)," +
  "radial-gradient(1.6px 1.6px at 140px 110px, #fff, transparent 60%)," +
  "radial-gradient(1px 1px at 10px 96px, rgba(255,255,255,0.6), transparent 60%)," +
  "radial-gradient(1.2px 1.2px at 192px 30px, rgba(255,255,255,0.85), transparent 60%)";

// The lake / pin landing point, as a fraction of the panel. The SVG arc uses
// preserveAspectRatio="none" so these same numbers (62, 55) address the exact
// same spot the HTML pin sits at (left:62% / top:55%), on any panel ratio.
const PIN_X = 62;
const PIN_Y = 55;
// Cubic arc from the deep-space upper-left corner down to the lake point.
const ARC = `M 4 6 C 18 42, 38 58, ${PIN_X} ${PIN_Y}`;

// Warm atmosphere glow, centered on the lake point. screen-blends to brighten
// over the dark space rather than tinting it down.
const GLOW =
  "radial-gradient(58% 58% at 62% 55%, color-mix(in oklab, var(--color-honey) 60%, transparent) 0%, color-mix(in oklab, var(--color-coral) 32%, transparent) 38%, transparent 72%)";
// Space vignette over the earth poster.
const EARTH_VIGNETTE =
  "radial-gradient(120% 120% at 62% 38%, transparent 52%, rgba(8,6,4,0.85) 100%)";

/**
 * Chapter-4 "orbit → find the lake" stage: a scroll-scrubbed descent rendered
 * entirely from existing local assets (no Mapbox token, no video). Bottom→top:
 * parallax starfields, the NASA earth zooming toward Anatolia and dissolving
 * into the "Lake Van from the stratosphere" frame, a warm atmosphere glow, a
 * honey flight-arc that draws on, and a pulsing coral pin labelled "Akhtamar
 * Island". Every transform is driven from the passed-in `progress` MotionValue
 * (the panel's in-flow useScroll) — NOTHING is pinned, because this stage lives
 * inside Chapter 4's zoom transform, which would break position:sticky/fixed.
 *
 * Under reduced motion it returns a fully static earth with the pin visible.
 * That branch renders PLAIN elements (not <motion.*>): the hydration-safe
 * reduced-motion hook is false on the first render, so a persistent motion node
 * would mount with its progress=0 styles (the pin's scale(0)/opacity(0)) and
 * then keep them stuck when we stop driving it — swapping to plain DOM gives a
 * fresh, un-styled node instead.
 *
 * The glow sits just *below* the pin (not literally topmost) so the dark label
 * chip stays crisp; the warm-up over the imagery is unaffected.
 */
export function ScrollyMap({ progress, alt, className }: ScrollyMapProps) {
  const reduced = useReducedMotion();
  const t = useT();

  // All transforms are created unconditionally (rules of hooks) — the reduced
  // branch below simply doesn't use them.
  const starsY1 = useTransform(progress, [0, 1], [0, -40]);
  const starsY2 = useTransform(progress, [0, 1], [0, -90]);
  const starsOpacity = useTransform(progress, [0, 1], [0.9, 0.4]);
  const earthScale = useTransform(progress, [0, 0.55], [1, 2.3]);
  const earthOpacity = useTransform(progress, [0.38, 0.55], [1, 0]);
  const lakeOpacity = useTransform(progress, [0.42, 0.6], [0, 1]);
  const lakeScale = useTransform(progress, [0.42, 1], [1.18, 1]);
  const pathLength = useTransform(progress, [0.3, 0.62], [0, 1]);
  const pinScale = useTransform(progress, [0.6, 0.66, 0.68], [0, 1.25, 1]);
  const pinOpacity = useTransform(progress, [0.6, 0.64], [0, 1]);
  const glowOpacity = useTransform(progress, [0, 1], [0.15, 0.5]);

  // The pin + label, shared by both branches; the sonar ring is motion-only.
  const pin = (withPulse: boolean) => (
    <div className="relative flex items-center gap-2">
      <span className="relative grid size-3.5 place-items-center">
        {withPulse ? (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-coral/50 animate-pulse-ring"
          />
        ) : null}
        <span
          aria-hidden
          className="size-3.5 rounded-full bg-coral ring-4 ring-coral/25"
        />
      </span>
      <span className="rounded-full bg-shell/90 px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide whitespace-nowrap text-linen shadow-soft backdrop-blur-sm">
        {t.worldMap.markerLabel}
      </span>
    </div>
  );

  if (reduced) {
    return (
      <div
        className={cn(
          "relative size-full overflow-hidden bg-[#0a0806]",
          className,
        )}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: STAR_TILE_A,
            backgroundSize: "200px 190px",
            opacity: 0.55,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: STAR_TILE_B,
            backgroundSize: "230px 240px",
            opacity: 0.4,
          }}
        />
        <div className="absolute inset-0">
          <Image
            src="/images/earth.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-contain"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: EARTH_VIGNETTE }}
          />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-3"
          style={{ opacity: 0.3, mixBlendMode: "screen", background: GLOW }}
        />
        <div className="absolute top-[55%] left-[62%] z-5 -translate-x-1/2 -translate-y-1/2">
          {pin(false)}
        </div>
        <span className="sr-only">{alt}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative size-full overflow-hidden bg-[#0a0806]",
        className,
      )}
    >
      {/* Parallax starfields drift up and fade as we punch through them. */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: STAR_TILE_A,
          backgroundSize: "200px 190px",
          opacity: starsOpacity,
          y: starsY1,
        }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: STAR_TILE_B,
          backgroundSize: "230px 240px",
          opacity: starsOpacity,
          y: starsY2,
        }}
      />

      {/* Earth — zooms toward Anatolia and dissolves as we punch in. */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: earthScale,
          opacity: earthOpacity,
          transformOrigin: "62% 38%",
        }}
      >
        <Image
          src="/images/earth.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-contain"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: EARTH_VIGNETTE }}
        />
      </motion.div>

      {/* Lake-from-space reveal — the "you found it" frame, settling into place. */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: lakeOpacity, scale: lakeScale }}
      >
        <Image
          src="/images/map-strato.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Atmosphere glow — warms the image as we descend (under the pin so the
          label stays legible). */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-3"
        style={{ opacity: glowOpacity, mixBlendMode: "screen", background: GLOW }}
      />

      {/* Flight arc — a faint dashed "planned route" with a honey line that
          draws on over it as you scroll. preserveAspectRatio "none" maps the
          0–100 box straight onto the panel so the arc lands on the pin;
          non-scaling-stroke keeps the line crisp despite the stretch. */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 z-4 size-full"
      >
        <path
          d={ARC}
          fill="none"
          stroke="var(--color-honey)"
          strokeWidth={1.25}
          strokeOpacity={0.35}
          strokeDasharray="4 5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d={ARC}
          fill="none"
          stroke="var(--color-honey)"
          strokeWidth={2.2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{
            pathLength,
            // dark inner shadow holds the line over bright terrain; honey outer
            // glow gives it the cinematic "flight path" warmth.
            filter:
              "drop-shadow(0 0 1.5px rgba(20,12,6,0.7)) drop-shadow(0 0 5px rgba(233,185,73,0.75))",
          }}
        />
      </svg>

      {/* Coral pin + label at the lake point (62% / 55%), popping in at the end. */}
      <motion.div
        className="absolute top-[55%] left-[62%] z-5 -translate-x-1/2 -translate-y-1/2"
        style={{ scale: pinScale, opacity: pinOpacity }}
      >
        {pin(true)}
      </motion.div>

      <span className="sr-only">{alt}</span>
    </div>
  );
}
