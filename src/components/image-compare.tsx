"use client";

import { useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageCompareProps {
  beforeSrc: string;
  beforeAlt: string;
  beforeLabel: string;
  afterSrc: string;
  afterAlt: string;
  afterLabel: string;
  hint: string;
  className?: string;
}

export function ImageCompare({
  beforeSrc,
  beforeAlt,
  beforeLabel,
  afterSrc,
  afterAlt,
  afterLabel,
  hint,
  className,
}: ImageCompareProps) {
  const [pos, setPos] = useState(50);
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={cn(
        "group relative aspect-[4/3] w-full select-none overflow-hidden rounded-3xl border border-border shadow-warm",
        className,
      )}
    >
      {/* After (full) image — bottom layer */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes="(max-width: 768px) 100vw, 60vw"
        className="object-cover"
        // TODO: swap for the client's real photos
      />
      <span className="absolute right-4 top-4 z-20 rounded-full bg-shell/65 px-3 py-1 text-xs font-medium text-linen backdrop-blur-sm">
        {afterLabel}
      </span>

      {/* Before image — clipped to the slider position */}
      <div
        className="absolute inset-0 z-10"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
          // TODO: swap for the client's real photos
        />
        <span className="absolute left-4 top-4 rounded-full bg-shell/65 px-3 py-1 text-xs font-medium text-linen backdrop-blur-sm">
          {beforeLabel}
        </span>
      </div>

      {/* Divider + knob */}
      <div
        className="pointer-events-none absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-linen/90 shadow-[0_0_0_1px_rgba(42,26,17,0.15)]"
        style={{ left: `${pos}%` }}
      >
        <span
          className={cn(
            "absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-linen text-shell shadow-warm transition-[box-shadow]",
            focused ? "ring-4 ring-coral-deep" : "ring-1 ring-ink/10",
          )}
        >
          <MoveHorizontal className="size-5" />
        </span>
      </div>

      {/* Range input drives position (drag + keyboard) */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={hint}
        aria-valuetext={`${pos}%`}
        className="absolute inset-0 z-30 size-full cursor-ew-resize appearance-none bg-transparent opacity-0"
      />
      <span className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-shell/55 px-3 py-1 text-[0.7rem] font-medium text-linen opacity-90 backdrop-blur-sm transition-opacity group-hover:opacity-0">
        {hint}
      </span>
    </div>
  );
}
