// Decorative inline-SVG motifs. All use currentColor so they tint with text
// color; size them with a className (e.g. "size-24 text-coral/15"). They are
// purely ornamental and marked aria-hidden by default.

import { cn } from "@/lib/utils";

type MotifProps = React.SVGProps<SVGSVGElement> & { className?: string };

function base(className?: string) {
  return cn("pointer-events-none select-none", className);
}

export function PomegranateSeeds({ className, ...props }: MotifProps) {
  const seeds: [number, number][] = [
    [32, 18],
    [22, 30],
    [42, 30],
    [16, 44],
    [32, 42],
    [48, 44],
    [26, 54],
    [40, 54],
  ];
  return (
    <svg
      viewBox="0 0 64 72"
      fill="none"
      aria-hidden
      className={base(className)}
      {...props}
    >
      {seeds.map(([x, y], i) => (
        <path
          key={i}
          d={`M${x} ${y - 6} C ${x + 5} ${y - 3}, ${x + 5} ${y + 4}, ${x} ${y + 7} C ${x - 5} ${y + 4}, ${x - 5} ${y - 3}, ${x} ${y - 6} Z`}
          fill="currentColor"
        />
      ))}
      <path
        d="M32 10c2-4 6-6 9-6-1 4-4 6-7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Walnut({ className, ...props }: MotifProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      className={base(className)}
      {...props}
    >
      <ellipse
        cx="32"
        cy="32"
        rx="24"
        ry="27"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path
        d="M32 7v50M32 24c-9 0-14 5-19 9M32 24c9 0 14 5 19 9M32 40c-7 1-11 5-15 10M32 40c7 1 11 5 15 10M32 14c-5 2-8 5-11 9M32 14c5 2 8 5 11 9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Apricot({ className, ...props }: MotifProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      className={base(className)}
      {...props}
    >
      <path
        d="M32 14c11 0 20 8 20 20s-9 20-20 20-20-8-20-20 9-20 20-20Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      <path
        d="M32 16c-3 6-3 30 0 36"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.6"
        className="mix-blend-multiply"
      />
      <path
        d="M33 15c1-5 5-8 10-8-1 5-4 8-9 9"
        fill="currentColor"
        fillOpacity="0.7"
      />
    </svg>
  );
}

export function OliveSprig({ className, ...props }: MotifProps) {
  return (
    <svg
      viewBox="0 0 96 64"
      fill="none"
      aria-hidden
      className={base(className)}
      {...props}
    >
      <path
        d="M6 50C30 46 58 40 90 14"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {[
        [26, 44, -28],
        [44, 38, -34],
        [62, 30, -40],
        [78, 22, -46],
      ].map(([x, y, r], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="11"
          ry="5"
          fill="currentColor"
          fillOpacity="0.85"
          transform={`rotate(${r} ${x} ${y})`}
        />
      ))}
      <circle cx="38" cy="50" r="5" fill="currentColor" />
      <circle cx="56" cy="46" r="5" fill="currentColor" />
    </svg>
  );
}

export function Wheat({ className, ...props }: MotifProps) {
  return (
    <svg
      viewBox="0 0 40 72"
      fill="none"
      aria-hidden
      className={base(className)}
      {...props}
    >
      <path
        d="M20 70V26"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {[26, 34, 42, 50, 58].map((y, i) => (
        <g key={i}>
          <path
            d={`M20 ${y} C12 ${y - 2} 9 ${y - 8} 9 ${y - 12} C15 ${y - 10} 19 ${y - 6} 20 ${y - 2}`}
            fill="currentColor"
            fillOpacity="0.9"
          />
          <path
            d={`M20 ${y} C28 ${y - 2} 31 ${y - 8} 31 ${y - 12} C25 ${y - 10} 21 ${y - 6} 20 ${y - 2}`}
            fill="currentColor"
            fillOpacity="0.9"
          />
        </g>
      ))}
      <path
        d="M20 18 C14 16 11 10 11 5 C17 7 20 12 20 16"
        fill="currentColor"
      />
      <path d="M20 18 C26 16 29 10 29 5 C23 7 20 12 20 16" fill="currentColor" />
    </svg>
  );
}

/** Wide double-peak Ararat silhouette — fills with currentColor. */
export function AraratSilhouette({ className, ...props }: MotifProps) {
  return (
    <svg
      viewBox="0 0 600 200"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
      className={base(className)}
      {...props}
    >
      <path
        d="M0 200 L150 96 L210 132 L300 40 L360 86 L430 120 L470 150 L600 70 L600 200 Z"
        fill="currentColor"
      />
      <path
        d="M300 40 L274 64 L288 70 L300 60 L312 70 L326 64 Z"
        fill="#fffdf7"
        fillOpacity="0.85"
      />
      <path
        d="M470 150 L484 138 L498 146 L512 134 L470 150 Z"
        fill="#fffdf7"
        fillOpacity="0.5"
      />
    </svg>
  );
}

/** Fine line illustration of the Akhtamar (Akdamar) island church. */
export function AkhtamarChurch({ className, ...props }: MotifProps) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      aria-hidden
      className={base(className)}
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* cross */}
        <path d="M60 8v16M53 14h14" />
        {/* conical dome */}
        <path d="M60 24 L44 64 H76 Z" />
        {/* drum */}
        <path d="M48 64 h24 v10 h-24 z" />
        <path d="M54 64 v10 M60 64 v10 M66 64 v10" />
        {/* main body */}
        <path d="M30 74 h60 v66 h-60 z" />
        {/* apse arches */}
        <path d="M40 140 v-20 a8 8 0 0 1 16 0 v20" />
        <path d="M64 140 v-20 a8 8 0 0 1 16 0 v20" />
        {/* windows */}
        <path d="M37 88 v-6 a4 4 0 0 1 8 0 v6 z" />
        <path d="M75 88 v-6 a4 4 0 0 1 8 0 v6 z" />
        {/* ground line */}
        <path d="M20 140 h80" />
      </g>
    </svg>
  );
}

/** Convenience: a softly-floating decorative motif positioned behind content. */
export function FloatMotif({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("pointer-events-none absolute select-none", className)} aria-hidden>
      {children}
    </div>
  );
}
