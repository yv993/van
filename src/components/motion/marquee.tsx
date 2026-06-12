"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  /** spacing class applied as trailing padding to each item (the "gap") */
  itemClassName?: string;
  reverse?: boolean;
  /** seconds per loop */
  speed?: number;
  pauseOnHover?: boolean;
  /** fade the left/right edges */
  fade?: boolean;
}

/**
 * Seamless infinite marquee. Each item carries its own trailing space so the
 * duplicated half is exactly 50% of the track — translateX(-50%) loops with no
 * jump. Under reduced motion it degrades to a static, scrollable row.
 */
export function Marquee<T>({
  items,
  renderItem,
  className,
  itemClassName,
  reverse = false,
  speed = 38,
  pauseOnHover = true,
  fade = true,
}: MarqueeProps<T>) {
  const reduced = useReducedMotion();

  const maskStyle = fade
    ? {
        maskImage:
          "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
      }
    : undefined;

  if (reduced) {
    return (
      <div
        className={cn("flex w-full overflow-x-auto pb-2", className)}
        style={maskStyle}
      >
        {items.map((item, i) => (
          <div key={i} className={cn("shrink-0 pr-5", itemClassName)}>
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    );
  }

  const trackClass = cn(
    "flex w-max shrink-0 items-stretch",
    reverse ? "animate-marquee-reverse" : "animate-marquee",
    pauseOnHover &&
      "group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]",
  );
  const trackStyle = {
    "--marquee-duration": `${speed}s`,
  } as React.CSSProperties;

  // Two equal halves so translateX(-50%) loops seamlessly; the cloned half is
  // hidden from assistive tech so content is not announced twice.
  return (
    <div className={cn("group flex overflow-hidden", className)} style={maskStyle}>
      <div className={trackClass} style={trackStyle}>
        {[false, true].map((hidden, half) => (
          <div
            key={half}
            className="flex shrink-0 items-stretch"
            aria-hidden={hidden || undefined}
          >
            {items.map((item, i) => (
              <div key={i} className={cn("shrink-0 pr-5", itemClassName)}>
                {renderItem(item, i)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
