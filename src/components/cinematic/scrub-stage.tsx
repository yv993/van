"use client";

import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "motion/react";
import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

interface ScrubStageProps {
  /** intro scroll progress 0..1; the sequence consumes [0, videoEnd] of it */
  progress: MotionValue<number>;
  /** portion of the pinned progress the frame scrub occupies */
  videoEnd?: number;
  className?: string;
}

// The descent clip (earth → stratosphere → golden aerial) sliced to numbered
// WebP frames — see CREDITS.md. 130 frames; the 1440px set (`descent/`, ~13MB)
// serves roomy screens, the 960px set (`descent-sm/`, ~7MB) serves small /
// low-DPI ones.
const FRAME_COUNT = brand.cinematic.frameCount;
const FRAME_BG = "#0a0806";
const framePath = (dir: string, i: number) =>
  `${dir}/frame_${String(i).padStart(4, "0")}.webp`;

/**
 * Scroll-scrubbed cinematic descent — canvas image-sequence engine
 * (the "scroll-cinematic" technique: all frames preloaded as JPGs, the one
 * drawn to <canvas> chosen by scroll progress). Unlike <video> currentTime
 * scrubbing this is rAF-driven, perfectly reversible, identical in every
 * browser, and immune to iOS Low Power Mode.
 *
 * Engine rules (from the scroll-cinematic skill): preload every frame, paint
 * frame 0 on first load, redraw only when the frame index changes, cover-fit
 * draw, HiDPI with devicePixelRatio capped at 2, throttle drawing in a rAF.
 * Layout/pinning stays with IntroStage; progress arrives as a MotionValue
 * already smoothed by Lenis.
 *
 * Cost guards kept from the previous engine: frames are NOT fetched until the
 * user signals intent to descend (first scroll/pointer/key), and Save-Data /
 * 2G connections skip straight to the GlobeStage still-image fallback behind
 * this layer — which also carries the intro until frame 0 has painted, so
 * there is never a black hole in the page.
 */
export function ScrubStage({
  progress,
  videoEnd = 0.72,
  className,
}: ScrubStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [armed, setArmed] = useState(false);
  const [ready, setReady] = useState(false);

  // Arm ONLY on real intent to descend — never on initial paint — so a bounce
  // on the hero never downloads the frame sequence.
  useEffect(() => {
    const events = ["scroll", "pointerdown", "keydown", "touchstart", "wheel"];
    const arm = () => {
      events.forEach((e) => window.removeEventListener(e, arm));
      setArmed(true);
    };
    const opts: AddEventListenerOptions = { passive: true, once: true };
    events.forEach((e) => window.addEventListener(e, arm, opts));
    return () => events.forEach((e) => window.removeEventListener(e, arm));
  }, []);

  useEffect(() => {
    if (!armed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const conn = (
      navigator as Navigator & { connection?: NetworkInformation }
    ).connection;
    // Too costly to fetch the frame set — the fallback carries the intro.
    if (
      conn?.saveData ||
      conn?.effectiveType === "slow-2g" ||
      conn?.effectiveType === "2g" ||
      conn?.effectiveType === "3g"
    ) {
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Small / low-DPI viewports load the lighter 960px set; roomy screens the
    // crisp 1440px set. Decided once, at the moment the user arms the descent.
    const dir =
      window.innerWidth < 1024
        ? brand.cinematic.smallDir
        : brand.cinematic.framesDir;

    let cancelled = false;
    let rafId = 0;
    let current = -1; // last drawn frame index
    let target = 0; // latest requested frame index

    // Preload every frame (skill rule). Browsers pipeline the requests; the
    // canvas reveals as soon as frame 0 paints and catches up as frames land.
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(dir, i + 1);
      images[i] = img;
    }

    const draw = (index: number) => {
      const img = images[index];
      // Not decoded yet → keep the last painted frame (skill behavior);
      // redraw this index when it lands if it's still wanted.
      if (!img?.complete || !img.naturalWidth) {
        if (img) {
          img.onload = () => {
            if (!cancelled && target === index) draw(index);
          };
        }
        return;
      }
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw: number, dh: number, dx: number, dy: number;
      if (ir > cr) {
        dh = ch;
        dw = ch * ir;
        dx = (cw - dw) / 2;
        dy = 0;
      } else {
        dw = cw;
        dh = cw / ir;
        dx = 0;
        dy = (ch - dh) / 2;
      }
      ctx.fillStyle = FRAME_BG;
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
      current = index;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(current < 0 ? 0 : current);
    };

    // rAF-throttled: progress changes only record the wanted index; one draw
    // per animation frame, and only when the index actually changed.
    const render = () => {
      rafId = 0;
      if (cancelled) return;
      if (target !== current) draw(target);
    };
    const requestRender = () => {
      if (!rafId) rafId = requestAnimationFrame(render);
    };

    const toIndex = (v: number) =>
      Math.min(
        FRAME_COUNT - 1,
        Math.floor(clamp01(v / videoEnd) * (FRAME_COUNT - 1)),
      );

    const unsub = progress.on("change", (v) => {
      target = toIndex(v);
      requestRender();
    });

    images[0].onload = () => {
      if (cancelled) return;
      resize();
      target = toIndex(progress.get());
      draw(0);
      requestRender();
      setReady(true);
    };
    // If frame 0 came from cache, onload may have already fired.
    if (images[0].complete && images[0].naturalWidth) {
      images[0].onload = null;
      resize();
      target = toIndex(progress.get());
      draw(target);
      setReady(true);
    }

    window.addEventListener("resize", resize);
    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      unsub();
      images.forEach((img) => {
        img.onload = null;
      });
      images.length = 0;
    };
  }, [armed, progress, videoEnd]);

  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#0a0806] transition-opacity duration-700",
        ready ? "opacity-100" : "pointer-events-none opacity-0",
        className,
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
