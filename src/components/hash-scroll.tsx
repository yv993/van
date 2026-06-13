"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSmoothScroll } from "@/components/motion/smooth-scroll";

// When the path changes and the URL carries a hash (e.g. navigating from
// /tr/about to /tr#menu), smooth-scroll to that section once it's in the DOM.
// usePathname re-runs this on every navigation; same-page hash jumps are
// handled directly by the nav via the Lenis scrollTo.
export function HashScroll() {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;
    const id = setTimeout(() => {
      if (document.querySelector(hash)) scrollTo(hash, -88);
    }, 280);
    return () => clearTimeout(id);
  }, [pathname, scrollTo]);

  return null;
}
