"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

// mapbox-gl lives in this dynamic chunk only — never the base bundle.
const Globe = dynamic(() => import("./globe"), { ssr: false });

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(
      c.getContext("webgl2") ||
      c.getContext("webgl") ||
      c.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

interface GlobeStageProps {
  mode: "intro" | "map";
  /** intro scroll progress (drives both the live camera and the fallback zoom) */
  progress?: MotionValue<number>;
  markerLabel?: string;
  alt: string;
  className?: string;
  /** intro fallback only: a real photo to "land on" as the earth dissolves */
  arrivalSrc?: string;
  arrivalAlt?: string;
  /** poster/fallback earth image (defaults to the centered NASA globe) */
  posterSrc?: string;
  /** cover for full-bleed posters (e.g. the SpaceX-style earth frame) */
  posterFit?: "contain" | "cover";
}

export function GlobeStage({
  mode,
  progress,
  markerLabel,
  alt,
  className,
  arrivalSrc,
  arrivalAlt,
  posterSrc = "/images/earth.jpg",
  posterFit = "contain",
}: GlobeStageProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [canLive, setCanLive] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  // Decide live-globe eligibility on the client (token + WebGL + motion allowed).
  useEffect(() => {
    const hasToken = !!process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only feature detection (token + WebGL); must stay false on SSR + first render for hydration safety.
    setCanLive(hasToken && !reduced && hasWebGL());
  }, [reduced]);

  // Mount the heavy map only when the stage is near the viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const live = canLive && inView;

  // Fallback earth zoom (used when there's no live globe). Always create the
  // motion values (no conditional hooks); only apply them in the fallback path.
  const zero = useMotionValue(0);
  const src = progress ?? zero;
  // Fallback "descent" — deliberately SLOW so the scrub video (which arms on
  // first scroll and reveals itself within ~a second) takes over before the
  // still-image dissolve is ever seen. It only plays out fully when the video
  // genuinely can't run (decode failure, Save-Data, iOS Low Power Mode).
  const earthScale = useTransform(src, [0, 0.55], [1, 2.1]);
  const earthFade = useTransform(src, [0.38, 0.55], [1, 0]);
  // ...into the arrival frame, which scales down and settles into place.
  const arrivalOpacity = useTransform(src, [0.44, 0.58], [0, 1]);
  const arrivalScale = useTransform(src, [0.44, 0.72], [1.18, 1]);

  const fallbackIntro = mode === "intro" && !reduced && !live;
  const showArrival = fallbackIntro && !!arrivalSrc;

  const posterStyle =
    !reduced && !live
      ? {
          scale: earthScale,
          opacity: mode === "intro" ? earthFade : undefined,
          // For the cover poster (earth offset right) zoom toward the planet.
          transformOrigin: posterFit === "cover" ? "62% 42%" : "50% 38%",
        }
      : undefined;

  return (
    <div
      ref={ref}
      className={cn(
        "relative size-full overflow-hidden bg-[#0a0806]",
        className,
      )}
    >
      {/* Poster / fallback earth — also the live globe's poster until it loads. */}
      <motion.div
        style={posterStyle}
        className={cn(
          "absolute inset-0",
          // CSS fade only for the live-globe handoff; the fallback earth's
          // opacity is motion-driven (a CSS transition would lag the scroll).
          live && "transition-opacity duration-1000",
          live && mapReady && "opacity-0",
        )}
      >
        <Image
          src={posterSrc}
          alt={alt}
          fill
          priority={mode === "intro"}
          sizes="100vw"
          className={posterFit === "cover" ? "object-cover" : "object-contain"}
        />
        {/* soft space vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 40%, transparent 52%, rgba(8,6,4,0.85) 100%)",
          }}
          aria-hidden
        />
      </motion.div>

      {/* Arrival: the earth dissolves into the real Lake Van as you scroll down. */}
      {showArrival ? (
        <motion.div
          style={{ opacity: arrivalOpacity, scale: arrivalScale }}
          className="absolute inset-0"
        >
          <Image
            src={arrivalSrc as string}
            alt={arrivalAlt ?? alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-shell/45 via-transparent to-transparent"
            aria-hidden
          />
        </motion.div>
      ) : null}

      {live ? (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            mapReady ? "opacity-100" : "opacity-0",
          )}
        >
          <Globe
            mode={mode}
            progress={progress}
            markerLabel={markerLabel}
            onReady={() => setMapReady(true)}
            className="size-full"
          />
        </div>
      ) : null}

      <span className="sr-only">{alt}</span>
    </div>
  );
}
