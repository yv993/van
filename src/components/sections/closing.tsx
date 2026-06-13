"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Section } from "@/components/sections/section";
import { Reveal } from "@/components/motion/reveal";
import { CtaButton } from "@/components/ui/cta-button";
import { ConsentCheckbox } from "@/components/consent-checkbox";
import { Wheat, OliveSprig } from "@/components/motifs";
import { useLanguage } from "@/i18n/LanguageProvider";
import { newsletterSchema } from "@/lib/schemas";

export function Closing() {
  const { t, locale } = useLanguage();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [emailError, setEmailError] = useState<string | null>(null);
  const [consentError, setConsentError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Shared schema — same rules as the /api/newsletter route.
    const result = newsletterSchema.safeParse({
      email: email.trim(),
      consent,
      website,
      locale,
    });
    if (!result.success) {
      let eErr: string | null = null;
      let cErr: string | null = null;
      for (const issue of result.error.issues) {
        if (issue.path[0] === "email") eErr ??= t.closing.invalidEmail;
        else if (issue.path[0] === "consent")
          cErr ??= t.visit.form.errors.consent;
      }
      setEmailError(eErr);
      setConsentError(cErr);
      setDone(false);
      if (status === "error") setStatus("idle");
      return;
    }

    setEmailError(null);
    setConsentError(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), consent, website, locale }),
      });
      const data: { ok: boolean; error?: string } = await res
        .json()
        .catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) throw new Error(data.error ?? "failed");
      setDone(true);
      setStatus("idle");
      toast.success(t.closing.success);
    } catch {
      setStatus("error");
      toast.error(t.closing.error);
    }
  }

  const sending = status === "sending";

  return (
    <Section className="px-4 py-16 sm:px-6 lg:py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-linear-to-br from-coral to-honey px-6 py-16 text-shell shadow-warm sm:px-12 lg:py-24">
        {/* Sun glow */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-linen/30 blur-[120px]"
          aria-hidden
        />
        <Wheat
          className="animate-drift pointer-events-none absolute top-6 left-6 hidden h-24 text-shell/15 will-change-transform lg:block"
          aria-hidden
        />
        <OliveSprig
          className="animate-drift-slow pointer-events-none absolute right-6 bottom-6 hidden w-28 text-shell/15 will-change-transform lg:block"
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
              className="mx-auto mt-8 flex max-w-md flex-col gap-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1 text-left">
                  <label htmlFor="newsletter-email" className="sr-only">
                    {t.closing.emailPlaceholder}
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setDone(false);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder={t.closing.emailPlaceholder}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "newsletter-error" : undefined}
                    className="h-14 w-full rounded-full border border-shell/25 bg-linen/70 px-5 py-3 text-shell placeholder:text-shell/55 backdrop-blur-sm focus-visible:border-shell focus-visible:bg-linen focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shell"
                  />
                </div>
                <CtaButton
                  type="submit"
                  variant="gold"
                  size="lg"
                  disabled={sending}
                  aria-busy={sending}
                  className="shrink-0"
                >
                  {sending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                      {t.closing.sending}
                    </>
                  ) : (
                    <>
                      {t.closing.button}
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </CtaButton>
              </div>

              {/* Consent (required) */}
              <ConsentCheckbox
                id="newsletter-consent"
                checked={consent}
                onChange={(v) => {
                  setConsent(v);
                  setDone(false);
                  if (status === "error") setStatus("idle");
                }}
                text={t.closing.consent}
                linkLabel={t.closing.consentLink}
                href={`/${locale}/gizlilik`}
                error={consentError ?? undefined}
                className="text-shell/85"
                linkClassName="text-shell font-medium hover:text-shell"
                inputClassName="accent-shell"
                errorClassName="text-shell font-semibold"
              />

              {/* Honeypot */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
              >
                <label htmlFor="newsletter-website">Website</label>
                <input
                  id="newsletter-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </form>
          </Reveal>

          <div
            className="mt-3 min-h-5 text-sm"
            aria-live="polite"
            role="status"
          >
            {emailError ? (
              <p id="newsletter-error" className="font-medium text-shell">
                {emailError}
              </p>
            ) : status === "error" ? (
              <p className="font-medium text-shell">{t.closing.error}</p>
            ) : done ? (
              <p className="font-medium text-shell/80">{t.closing.success}</p>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
