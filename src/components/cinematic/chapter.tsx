"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useT } from "@/i18n/LanguageProvider";
import type { Dictionary } from "@/i18n/types";
import { cn } from "@/lib/utils";

type ChapterKey = keyof Dictionary["chapterLabels"];

interface ChapterProps {
  index: number;
  chapter: ChapterKey;
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Skip the zoom transform (use when the chapter contains sticky / its own
   *  useScroll elements that a transformed ancestor would offset, e.g. Ch.1). */
  noZoom?: boolean;
}

/**
 * Full-viewport cinematic chapter. As it enters, the whole group gently zooms
 * (0.97 → 1) and fades up — the zoom is what visually delineates the five
 * "pages". No CSS scroll-snap (it fights Lenis); the transform IS the cue.
 * Fully static under reduced motion. Inner section anchor ids are preserved.
 */
export function Chapter({
  index,
  chapter,
  children,
  className,
  id,
  noZoom = false,
}: ChapterProps) {
  const t = useT();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.55, 1]);

  const marker = (
    <span className="pointer-events-none absolute top-20 left-4 z-30 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-cream/60 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.22em] text-brown-700 uppercase backdrop-blur-sm sm:left-8">
      <span className="tabular-nums">{String(index).padStart(2, "0")}</span>
      <span className="h-px w-4 bg-brown-700/40" aria-hidden />
      {t.chapterLabels[chapter]}
    </span>
  );

  return (
    <section ref={ref} id={id} className={cn("relative min-h-screen", className)}>
      {marker}
      {reduced || noZoom ? (
        children
      ) : (
        <motion.div
          style={{ scale, opacity, transformOrigin: "50% 0%" }}
          className="will-change-transform"
        >
          {children}
        </motion.div>
      )}
    </section>
  );
}
