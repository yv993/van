"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

function groupThousands(n: number): string {
  // 1000 -> "1.000" (matches the reference "1.000+ mornings")
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/** Counts up from 0 to `value` when scrolled into view. */
export function Counter({
  value,
  suffix = "",
  className,
  duration = 1.6,
}: CounterProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  // Reduced motion shows the final figure immediately (no state churn).
  const shown = reduced ? value : display;

  return (
    <span ref={ref} className={className}>
      {groupThousands(shown)}
      {suffix}
    </span>
  );
}
