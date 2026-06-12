"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/magnetic";

const ctaVariants = cva(
  "group/cta relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-[transform,box-shadow,background-color,border-color] duration-300 will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-coral-deep text-cream shadow-[0_14px_30px_-12px_rgba(176,84,13,0.7)] hover:-translate-y-0.5 hover:bg-[#9a4a0b] hover:shadow-[0_20px_44px_-12px_rgba(176,84,13,0.85)] dark:hover:bg-coral",
        gold: "bg-honey text-shell shadow-soft hover:-translate-y-0.5 hover:brightness-105",
        olive:
          "bg-olive text-linen shadow-soft hover:-translate-y-0.5 hover:bg-olive-700",
        outline:
          "border border-ink/15 bg-cream/70 text-ink backdrop-blur-sm hover:border-ink/30 hover:bg-cream",
        ghost: "text-ink hover:bg-ink/5",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-7 text-[0.95rem]",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CommonProps = {
  children: React.ReactNode;
  className?: string;
  magnetic?: boolean;
  shine?: boolean;
} & VariantProps<typeof ctaVariants>;

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };
type AnchorProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    href: string;
  };

export type CtaButtonProps = ButtonProps | AnchorProps;

export function CtaButton(props: CtaButtonProps) {
  const {
    children,
    className,
    variant,
    size,
    magnetic = false,
    shine,
    ...rest
  } = props;

  const showShine = shine ?? (variant !== "outline" && variant !== "ghost");

  const inner = (
    <>
      {showShine ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 translate-x-[-140%] skew-x-[-18deg] bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover/cta:translate-x-[140%]"
        />
      ) : null}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  const classes = cn(ctaVariants({ variant, size }), className);

  const el =
    "href" in rest && rest.href !== undefined ? (
      <a className={classes} {...(rest as AnchorProps)}>
        {inner}
      </a>
    ) : (
      <button className={classes} {...(rest as ButtonProps)}>
        {inner}
      </button>
    );

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
