"use client";

import { useEffect, useState } from "react";
import { useReducedMotion as useMotionReducedMotion } from "motion/react";

/**
 * Hydration-safe reduced-motion hook.
 *
 * motion's `useReducedMotion()` reads `matchMedia` synchronously, so on the
 * client's first render it can already return `true` while the server rendered
 * `false` — any component that branches its DOM on that value then mismatches
 * during hydration (React #418). This wrapper returns `false` on the server and
 * the first client render, then swaps to the real value after mount.
 */
export function useReducedMotion(): boolean {
  const actual = useMotionReducedMotion();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional mount flag: keeps the first client render identical to SSR, then reveals the real value post-hydration.
  useEffect(() => setMounted(true), []);
  return mounted ? !!actual : false;
}
