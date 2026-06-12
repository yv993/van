"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";

type ScrollTarget = string | number | HTMLElement;

interface LenisContextValue {
  scrollTo: (target: ScrollTarget, offset?: number) => void;
}

const LenisContext = createContext<LenisContextValue>({ scrollTo: () => {} });

export function useSmoothScroll() {
  return useContext(LenisContext);
}

const NAV_OFFSET = -88; // clear the sticky navbar

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const scrollTo = useCallback(
    (target: ScrollTarget, offset = NAV_OFFSET) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { offset });
        return;
      }
      // Reduced-motion / no-Lenis fallback
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "auto" });
        return;
      }
      const el =
        typeof target === "string"
          ? document.querySelector<HTMLElement>(target)
          : target;
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
      }
    },
    [reduced],
  );

  return (
    <LenisContext.Provider value={{ scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
