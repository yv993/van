"use client";

import { useEffect, useState } from "react";

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

/**
 * Should we load HEAVY decorative media on this device — autoplay hero video,
 * the multi-megabyte cinematic frame sequence? No on small screens, Save-Data,
 * and slow connections: they get the static poster instead (which is the LCP
 * element anyway). This is the single biggest mobile-CWV lever — a 1.5 MB
 * autoplay video on a throttled phone wrecks LCP/TTI for zero content value.
 *
 * Pure read of `window` + `navigator.connection`; SSR-safe (returns false).
 */
export function heavyMediaAllowed(minWidth = 768): boolean {
  if (typeof window === "undefined") return false;
  const conn = (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
  const slow =
    conn?.saveData === true ||
    ["slow-2g", "2g", "3g"].includes(conn?.effectiveType ?? "");
  return window.innerWidth >= minWidth && !slow;
}

/**
 * Hook form for render-time gating. Starts `false` (SSR + first client paint,
 * so hydration matches and nothing heavy is requested up front), then flips to
 * the real verdict after mount. Pair with a static poster underneath.
 */
export function useHeavyMedia(minWidth = 768): boolean {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only capability check (viewport + connection); must be false on SSR/first paint for hydration safety.
    setOk(heavyMediaAllowed(minWidth));
  }, [minWidth]);
  return ok;
}
