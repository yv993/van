"use client";

import { useEffect, useId, useState } from "react";
import { Clock, MapPin, Phone, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Section, Eyebrow } from "@/components/sections/section";
import { Reveal } from "@/components/motion/reveal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CtaButton } from "@/components/ui/cta-button";
import { ConsentCheckbox } from "@/components/consent-checkbox";
import { useLanguage } from "@/i18n/LanguageProvider";
import { interpolate } from "@/i18n/format";
import { reservationSchema } from "@/lib/schemas";
import { SECTION } from "@/lib/site";
import { brand, hoursToMinutes } from "@/config/brand";
import { cn } from "@/lib/utils";

interface FormErrors {
  name?: string;
  email?: string;
  date?: string;
  time?: string;
  guests?: string;
  consent?: string;
}

const PHONE_RE = /^[0-9+()\-\s]{5,30}$/;
const cleanPhone = (v: string) => (PHONE_RE.test(v.trim()) ? v.trim() : "");

export function Visit() {
  const { t, locale } = useLanguage();
  const ids = useId();
  // Computed after mount in the user's LOCAL timezone — avoids both the
  // static-prerender hydration freeze and a UTC off-by-one near midnight.
  const [todayStr, setTodayStr] = useState("");
  useEffect(() => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- compute "today" in the user's local timezone after mount (avoids a prerender/UTC hydration mismatch).
    setTodayStr(local.toISOString().slice(0, 10));
  }, []);

  // "Open now / Closed" — hours come from the brand config, computed in the
  // visitor's LOCAL time after mount (SSR-safe: null until mounted).
  const [openNow, setOpenNow] = useState<boolean | null>(null);
  useEffect(() => {
    const opens = hoursToMinutes(brand.hours.opens);
    const closes = hoursToMinutes(brand.hours.closes);
    const compute = () => {
      const now = new Date();
      const mins = now.getHours() * 60 + now.getMinutes();
      // Local-time open/closed, computed post-mount to avoid a prerender/UTC mismatch.
      setOpenNow(mins >= opens && mins < closes);
    };
    compute();
    const id = setInterval(compute, 60_000); // keep fresh across the open/close edges
    return () => clearInterval(id);
  }, []);

  // Keyless Google Maps embed for the address (no API key needed).
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    brand.mapQuery,
  )}&output=embed`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot — real users never fill
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [success, setSuccess] = useState<string | null>(null);

  const reset = () => {
    setSuccess(null);
    if (status === "error") setStatus("idle");
  };

  // Validate with the SHARED zod schema (same rules the server enforces), then
  // map issues to localized field errors.
  function collectErrors(): FormErrors {
    const result = reservationSchema.safeParse({
      name: name.trim(),
      email: email.trim(),
      phone: cleanPhone(phone),
      date,
      time,
      guests: Number(guests),
      consent,
      website,
      locale,
    });
    if (result.success) return {};
    const fe: FormErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (field === "name") fe.name ??= t.visit.form.errors.name;
      else if (field === "email") fe.email ??= t.visit.form.errors.email;
      else if (field === "date")
        fe.date ??= date ? t.visit.form.errors.datePast : t.visit.form.errors.date;
      else if (field === "time") fe.time ??= t.visit.form.errors.time;
      else if (field === "guests") fe.guests ??= t.visit.form.errors.guests;
      else if (field === "consent") fe.consent ??= t.visit.form.errors.consent;
    }
    return fe;
  }

  function focusFirstError(fe: FormErrors) {
    const order: (keyof FormErrors)[] = [
      "name",
      "email",
      "date",
      "time",
      "guests",
      "consent",
    ];
    const first = order.find((k) => fe[k]);
    if (first) document.getElementById(`${ids}-${first}`)?.focus();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fe = collectErrors();
    setErrors(fe);
    if (Object.keys(fe).length > 0) {
      setSuccess(null);
      setStatus("idle");
      focusFirstError(fe);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: cleanPhone(phone),
          date,
          time,
          guests: Number(guests),
          consent,
          website,
          locale,
        }),
      });
      const data: { ok: boolean; error?: string } = await res
        .json()
        .catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) throw new Error(data.error ?? "failed");

      const when = new Date(`${date}T${time}`);
      const dateStr = new Intl.DateTimeFormat(locale, {
        dateStyle: "long",
      }).format(when);
      const timeStr = new Intl.DateTimeFormat(locale, {
        timeStyle: "short",
      }).format(when);
      const message = interpolate(t.visit.form.success, {
        name: name.trim(),
        guests,
        date: dateStr,
        time: timeStr,
      });
      setSuccess(message);
      setStatus("idle");
      toast.success(message);
    } catch {
      setStatus("error");
      toast.error(t.visit.form.errorGeneric);
    }
  }

  const sending = status === "sending";

  const info = [
    {
      id: "hours",
      icon: Clock,
      label: t.visit.hoursLabel,
      value: t.visit.hoursValue,
      detail: t.visit.hoursDetail,
    },
    {
      id: "address",
      icon: MapPin,
      label: t.visit.addressLabel,
      value: t.visit.addressValue,
      detail: t.visit.addressDetail,
    },
    {
      id: "phone",
      icon: Phone,
      label: t.visit.phoneLabel,
      value: t.visit.phoneValue,
      detail: "",
    },
  ];

  return (
    <Section id={SECTION.visit} className="bg-cream px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Info + map */}
        <div>
          <Reveal>
            <Eyebrow>{t.visit.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
              {t.visit.title}
            </h2>
            <p className="mt-4 max-w-md text-lg text-pretty text-brown-700">
              {t.visit.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {info.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border bg-paper/60 p-4"
                >
                  <dt className="flex items-center gap-2 text-xs font-semibold tracking-wide text-brown-500 uppercase">
                    <item.icon className="size-4 text-coral-deep" />
                    {item.label}
                  </dt>
                  <dd className="mt-2 font-medium text-ink">
                    {item.id === "phone" ? (
                      <a
                        href={`tel:${item.value.replace(/\s+/g, "")}`}
                        className="rounded-sm transition-colors hover:text-coral-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                  {item.detail ? (
                    <dd className="text-sm text-brown-500">{item.detail}</dd>
                  ) : null}
                  {item.id === "hours" && openNow !== null ? (
                    <dd className="mt-2">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                          openNow
                            ? "bg-olive/15 text-olive-700"
                            : "bg-brown-500/10 text-brown-700",
                        )}
                        role="status"
                      >
                        <span
                          className={cn(
                            "size-1.5 rounded-full",
                            openNow ? "bg-olive" : "bg-brown-500",
                          )}
                          aria-hidden
                        />
                        {openNow ? t.visit.openNow : t.visit.closedNow}
                      </span>
                    </dd>
                  ) : null}
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Live map — keyless Google Maps embed for the address */}
          <Reveal delay={0.14}>
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-3xl border border-border bg-olive/10">
              <iframe
                title={t.visit.mapLabel}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 size-full border-0"
              />
            </div>
          </Reveal>
        </div>

        {/* Reservation form */}
        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="relative rounded-3xl border border-border bg-card p-6 shadow-warm sm:p-8"
          >
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
              {t.visit.form.title}
            </h3>

            {/* Live region announces success / pending / error to screen readers */}
            <div aria-live="polite" className="contents">
              {success ? (
                <p
                  role="status"
                  className="mt-4 flex items-start gap-2 rounded-2xl border border-olive/25 bg-olive/10 p-4 text-sm text-olive-700"
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-olive" />
                  {success}
                </p>
              ) : null}
              {status === "error" ? (
                <p
                  role="alert"
                  className="mt-4 rounded-2xl border border-pomegranate/30 bg-pomegranate/10 p-4 text-sm text-pomegranate"
                >
                  {t.visit.form.errorGeneric}
                </p>
              ) : null}
            </div>

            <div className="mt-6 flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <Label htmlFor={`${ids}-name`}>{t.visit.form.name}</Label>
                <Input
                  id={`${ids}-name`}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    reset();
                  }}
                  placeholder={t.visit.form.namePlaceholder}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${ids}-name-err` : undefined}
                  className="h-12 rounded-xl bg-paper/50"
                />
                {errors.name ? (
                  <p id={`${ids}-name-err`} className="text-sm text-pomegranate">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              {/* Email (required) */}
              <div className="flex flex-col gap-2">
                <Label htmlFor={`${ids}-email`}>{t.visit.form.email}</Label>
                <Input
                  id={`${ids}-email`}
                  type="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    reset();
                  }}
                  placeholder={t.visit.form.emailPlaceholder}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? `${ids}-email-err` : undefined}
                  className="h-12 rounded-xl bg-paper/50"
                />
                {errors.email ? (
                  <p id={`${ids}-email-err`} className="text-sm text-pomegranate">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              {/* Phone (optional) */}
              <div className="flex flex-col gap-2">
                <Label htmlFor={`${ids}-phone`}>
                  {t.visit.form.phone}{" "}
                  <span className="font-normal text-brown-500">
                    ({t.visit.form.optional})
                  </span>
                </Label>
                <Input
                  id={`${ids}-phone`}
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    reset();
                  }}
                  placeholder={t.visit.form.phonePlaceholder}
                  className="h-12 rounded-xl bg-paper/50"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Date */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`${ids}-date`}>{t.visit.form.date}</Label>
                  <Input
                    id={`${ids}-date`}
                    type="date"
                    min={todayStr}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      reset();
                    }}
                    aria-invalid={!!errors.date}
                    aria-describedby={
                      errors.date ? `${ids}-date-err` : undefined
                    }
                    className="h-12 rounded-xl bg-paper/50"
                  />
                  {errors.date ? (
                    <p
                      id={`${ids}-date-err`}
                      className="text-sm text-pomegranate"
                    >
                      {errors.date}
                    </p>
                  ) : null}
                </div>

                {/* Time */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`${ids}-time`}>{t.visit.form.time}</Label>
                  <Input
                    id={`${ids}-time`}
                    type="time"
                    value={time}
                    onChange={(e) => {
                      setTime(e.target.value);
                      reset();
                    }}
                    aria-invalid={!!errors.time}
                    aria-describedby={
                      errors.time ? `${ids}-time-err` : undefined
                    }
                    className="h-12 rounded-xl bg-paper/50"
                  />
                  {errors.time ? (
                    <p
                      id={`${ids}-time-err`}
                      className="text-sm text-pomegranate"
                    >
                      {errors.time}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Guests */}
              <div className="flex flex-col gap-2">
                <Label htmlFor={`${ids}-guests`}>{t.visit.form.guests}</Label>
                <Select
                  value={guests}
                  onValueChange={(v) => {
                    setGuests(v);
                    reset();
                  }}
                >
                  <SelectTrigger
                    id={`${ids}-guests`}
                    className="h-12 w-full rounded-xl bg-paper/50"
                    aria-invalid={!!errors.guests}
                    aria-describedby={
                      errors.guests ? `${ids}-guests-err` : undefined
                    }
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}{" "}
                        {n === 1 ? t.visit.form.guest : t.visit.form.guestsPlural}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.guests ? (
                  <p
                    id={`${ids}-guests-err`}
                    className="text-sm text-pomegranate"
                  >
                    {errors.guests}
                  </p>
                ) : null}
              </div>

              {/* KVKK consent (required) */}
              <ConsentCheckbox
                id={`${ids}-consent`}
                checked={consent}
                onChange={(v) => {
                  setConsent(v);
                  reset();
                }}
                text={t.visit.form.consent}
                linkLabel={t.visit.form.consentLink}
                href={`/${locale}/gizlilik`}
                error={errors.consent}
              />

              {/* Honeypot — visually + a11y hidden; bots that fill it are dropped */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
              >
                <label htmlFor={`${ids}-website`}>Website</label>
                <input
                  id={`${ids}-website`}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <CtaButton
                type="submit"
                variant="primary"
                size="lg"
                disabled={sending}
                aria-busy={sending}
                className={cn("mt-1 w-full", sending && "opacity-80")}
              >
                {sending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    {t.visit.form.sending}
                  </>
                ) : (
                  t.visit.form.submit
                )}
              </CtaButton>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
