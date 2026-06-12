"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useT } from "@/i18n/LanguageProvider";
import { useSmoothScroll } from "@/components/motion/smooth-scroll";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { interpolate } from "@/i18n/format";
import { SECTION, SOCIALS } from "@/lib/site";
import {
  AkhtamarChurch,
  AraratSilhouette,
  PomegranateSeeds,
} from "@/components/motifs";

// lucide-react v1 dropped brand icons, so we hand-roll small social glyphs.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.6-1.5H16.4V5.1C16 5 15 5 13.9 5c-2.3 0-3.9 1.4-3.9 4v2H7.5v3H10v7h3.5Z" />
    </svg>
  );
}
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect x="2.5" y="6" width="19" height="12" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M10.5 9.5v5l4-2.5-4-2.5Z" fill="currentColor" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
} as const;

const NETWORK_NAMES = {
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
} as const;

export function Footer() {
  const t = useT();
  const { scrollTo } = useSmoothScroll();
  const reduced = useReducedMotion();
  const year = useMemo(() => new Date().getFullYear(), []);

  // Curtain-reveal parallax: the footer is FIXED at the viewport bottom
  // BEHIND the opaque page (main is relative z-10 bg-paper); a spacer of
  // exactly the footer's height after main gives the document the scroll room,
  // so the last screenful of scrolling lifts the page away like a curtain and
  // exposes the footer. Progress is measured on the SPACER (in normal flow) —
  // the fixed footer's own rect never moves, so it can't be the target.
  const wrapRef = useRef<HTMLDivElement>(null);
  const footRef = useRef<HTMLElement>(null);
  const [footerH, setFooterH] = useState(0);

  useEffect(() => {
    const el = footRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => {
      // border-box height — contentRect excludes the footer's vertical padding
      // and would leave the spacer (and thus the reveal) short by exactly that.
      const h =
        entry.borderBoxSize?.[0]?.blockSize ??
        entry.target.getBoundingClientRect().height;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- post-mount measurement; spacer height === natural footer height, so no visual shift.
      setFooterH(Math.round(h));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end end"],
  });
  // Depth layers settle while the curtain lifts.
  const araratY = useTransform(scrollYProgress, [0, 1], [44, 0]);
  const churchY = useTransform(scrollYProgress, [0, 1], [70, -26]);
  const seedsY = useTransform(scrollYProgress, [0, 1], [90, -12]);
  const contentY = useTransform(scrollYProgress, [0, 0.8], [36, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [0.5, 1]);

  // The reveal needs a measured height; until then (and under reduced motion)
  // the footer renders in normal flow.
  const reveal = !reduced && footerH > 0;

  const links = [
    { id: SECTION.menu, label: t.nav.menu },
    { id: SECTION.shop, label: t.nav.shop },
    { id: SECTION.story, label: t.nav.story },
    { id: SECTION.heritage, label: t.nav.heritage },
    { id: SECTION.visit, label: t.nav.visit },
  ];

  return (
    <>
      {/* Spacer: holds the footer's room in the document flow while the
          footer itself is fixed behind the page. Also the scroll target. */}
      <div
        ref={wrapRef}
        aria-hidden
        style={reveal ? { height: footerH } : undefined}
      />
      <footer
        ref={footRef}
        className={
          reveal
            ? "fixed inset-x-0 bottom-0 z-0 overflow-hidden bg-shell px-4 pt-16 pb-8 text-linen/80 sm:px-6"
            : "relative overflow-hidden bg-shell px-4 pt-16 pb-8 text-linen/80 sm:px-6"
        }
      >
      {/* Parallax depth layers (slow horizon → faster foreground) */}
      <motion.div
        style={reduced ? undefined : { y: araratY }}
        className="pointer-events-none absolute inset-x-0 -bottom-3"
        aria-hidden
      >
        <AraratSilhouette className="mx-auto h-36 w-full max-w-5xl text-linen/[0.05] sm:h-44" />
      </motion.div>
      <motion.div
        style={reduced ? undefined : { y: churchY }}
        className="pointer-events-none absolute -top-2 right-6"
        aria-hidden
      >
        <AkhtamarChurch className="h-40 text-linen/[0.06]" />
      </motion.div>
      <motion.div
        style={reduced ? undefined : { y: seedsY }}
        className="pointer-events-none absolute bottom-16 left-[4%]"
        aria-hidden
      >
        <PomegranateSeeds className="size-20 text-pomegranate/15 sm:size-28" />
      </motion.div>

      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto max-w-7xl"
      >
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-full bg-coral-deep text-linen">
                <span className="font-display text-lg leading-none font-semibold">
                  A
                </span>
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold tracking-tight text-linen">
                  {t.common.brand}
                </span>
                <span className="text-[0.62rem] font-medium tracking-wide text-linen/55 uppercase">
                  {t.common.brandTagline}
                </span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-linen/65">
              {t.footer.tagline}
            </p>
          </div>

          {/* Explore */}
          <nav aria-label={t.footer.exploreTitle}>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-linen/60 uppercase">
              {t.footer.exploreTitle}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(`#${link.id}`)}
                    className="text-sm text-linen/75 transition-colors hover:text-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language */}
          <div>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-linen/60 uppercase">
              {t.footer.languagesTitle}
            </h2>
            <div className="mt-4">
              <LanguageSwitcher className="border-linen/15 bg-linen/5 text-linen/80 hover:border-linen/30 hover:text-linen" />
            </div>
          </div>

          {/* Follow */}
          <div>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-linen/60 uppercase">
              {t.footer.followTitle}
            </h2>
            <div className="mt-4 flex gap-3">
              {SOCIALS.map((social) => {
                const Icon = SOCIAL_ICONS[social.id];
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${t.footer.followTitle} — ${NETWORK_NAMES[social.id]}`}
                    className="grid size-10 place-items-center rounded-full border border-linen/15 bg-linen/5 text-linen/75 transition-colors hover:border-coral hover:text-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
                  >
                    <Icon className="size-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Signoff */}
        <div className="mt-12 flex flex-col items-center gap-2 border-t border-linen/10 pt-8 text-center">
          <p className="font-armenian text-lg text-honey">
            {t.footer.signoffArmenian}
            {t.footer.signoffTurkish ? (
              <span className="ml-2 font-display text-base text-honey/90 italic">
                · {t.footer.signoffTurkish}
              </span>
            ) : null}
            <span className="ml-2 font-sans text-sm text-linen/55">
              — {t.footer.signoffGloss}
            </span>
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 text-xs text-linen/60 sm:flex-row">
          <p>{interpolate(t.footer.rights, { year })}</p>
          <p>{t.footer.credit}</p>
        </div>
      </motion.div>
      </footer>
    </>
  );
}
