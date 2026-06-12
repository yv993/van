"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Section } from "@/components/sections/section";
import { Reveal } from "@/components/motion/reveal";
import { CtaButton } from "@/components/ui/cta-button";
import { Wheat, OliveSprig } from "@/components/motifs";
import { useT } from "@/i18n/LanguageProvider";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Closing() {
  const t = useT();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError(t.closing.invalidEmail);
      setDone(false);
      return;
    }
    setError(null);
    setDone(true);
    toast.success(t.closing.success);
  }

  return (
    <Section className="px-4 py-16 sm:px-6 lg:py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-linear-to-br from-coral to-honey px-6 py-16 text-shell shadow-warm sm:px-12 lg:py-24">
        {/* Sun glow */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-linen/30 blur-[120px]"
          aria-hidden
        />
        <Wheat
          className="pointer-events-none absolute top-6 left-6 hidden h-24 text-shell/15 lg:block"
          aria-hidden
        />
        <OliveSprig
          className="pointer-events-none absolute right-6 bottom-6 hidden w-28 text-shell/15 lg:block"
          aria-hidden
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] font-semibold tracking-tight text-shell uppercase">
              {t.closing.titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-md text-lg text-pretty text-shell/80">
              {t.closing.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <div className="flex-1 text-left">
                <label htmlFor="newsletter-email" className="sr-only">
                  {t.closing.emailPlaceholder}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.closing.emailPlaceholder}
                  aria-invalid={!!error}
                  aria-describedby={error ? "newsletter-error" : undefined}
                  className="h-14 w-full rounded-full border border-shell/25 bg-linen/70 px-5 py-3 text-shell placeholder:text-shell/55 backdrop-blur-sm focus-visible:border-shell focus-visible:bg-linen focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shell"
                />
              </div>
              <CtaButton
                type="submit"
                variant="gold"
                size="lg"
                className="shrink-0"
              >
                {t.closing.button}
                <ArrowRight className="size-4" />
              </CtaButton>
            </form>
          </Reveal>

          <div className="mt-3 min-h-5 text-sm" aria-live="polite">
            {error ? (
              <p id="newsletter-error" className="font-medium text-shell">
                {error}
              </p>
            ) : done ? (
              <p className="font-medium text-shell/80">{t.closing.success}</p>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
