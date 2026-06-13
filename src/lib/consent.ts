"use client";

import { useEffect, useState } from "react";

// Tiny consent store backing the cookie banner + consent-gated analytics.
// "accepted" → optional (analytics) processing allowed; "necessary" → only
// strictly-necessary; null → not chosen yet (show the banner).

export type Consent = "accepted" | "necessary";
const KEY = "akdamar.consent";

const listeners = new Set<() => void>();
let current: Consent | null = null;
let hydrated = false;

function read(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "accepted" || v === "necessary" ? v : null;
  } catch {
    return null;
  }
}

function ensureHydrated() {
  if (!hydrated) {
    current = read();
    hydrated = true;
  }
}

export function getConsent(): Consent | null {
  return current;
}

export function setConsent(value: Consent): void {
  current = value;
  hydrated = true;
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* storage unavailable — keep in-memory only */
  }
  listeners.forEach((l) => l());
}

/**
 * `consent` is null until the visitor chooses; `ready` is false on SSR + the
 * first client render (read localStorage only after mount, so no hydration
 * mismatch), then true. Updating consent anywhere notifies every consumer.
 */
export function useConsent() {
  const [snap, setSnap] = useState<{ consent: Consent | null; ready: boolean }>(
    { consent: null, ready: false },
  );
  useEffect(() => {
    ensureHydrated();
    // Post-mount hydration read: SSR + first render stay {null,false} so there's
    // no hydration mismatch, then the persisted choice is revealed.
    const update = () => setSnap({ consent: getConsent(), ready: true });
    update();
    listeners.add(update);
    return () => {
      listeners.delete(update);
    };
  }, []);
  return { consent: snap.consent, setConsent, ready: snap.ready };
}
