"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** vertical travel in px (when from="up") */
  y?: number;
  /** entrance direction: rise from below ("up", default) or glide in from the right */
  from?: "up" | "right";
  /** horizontal travel in px (when from="right") */
  distance?: number;
  /** start scale (e.g. 1.1 to settle a hero into place); 1 = no scale */
  scaleFrom?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * whileInView fade + travel. `from="right"` glides in from the right (used for
 * the cinematic chapter headings/cards). Becomes a no-op under reduced motion.
 */
export function Reveal({
  children,
  className,
  y = 26,
  from = "up",
  distance = 64,
  scaleFrom = 1,
  delay = 0,
  duration = 0.7,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  const initial = {
    opacity: 0,
    ...(from === "right" ? { x: distance } : { y }),
    ...(scaleFrom !== 1 ? { scale: scaleFrom } : {}),
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

/** Container that staggers <RevealItem> children into view. */
export function Stagger({
  children,
  className,
  stagger = 0.1,
  delay = 0,
}: StaggerProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
