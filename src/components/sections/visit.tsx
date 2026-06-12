"use client";

import { useEffect, useId, useState } from "react";
import { Clock, MapPin, Phone, CheckCircle2, Navigation } from "lucide-react";
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
import { useLanguage } from "@/i18n/LanguageProvider";
import { interpolate } from "@/i18n/format";
import { SECTION } from "@/lib/site";
import { cn } from "@/lib/utils";

interface FormErrors {
  name?: string;
  date?: string;
  time?: string;
  guests?: string;
}

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

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState<string | null>(null);

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!name.trim()) next.name = t.visit.form.errors.name;
    if (!date) next.date = t.visit.form.errors.date;
    else if (date < todayStr) next.date = t.visit.form.errors.datePast;
    if (!time) next.time = t.visit.form.errors.time;
    const g = Number(guests);
    if (!Number.isFinite(g) || g < 1 || g > 12)
      next.guests = t.visit.form.errors.guests;
    return next;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setSuccess(null);
      return;
    }
    const when = new Date(`${date}T${time}`);
    const dateStr = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
      when,
    );
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
    toast.success(message);
  }

  const info = [
    {
      icon: Clock,
      label: t.visit.hoursLabel,
      value: t.visit.hoursValue,
      detail: t.visit.hoursDetail,
    },
    {
      icon: MapPin,
      label: t.visit.addressLabel,
      value: t.visit.addressValue,
      detail: t.visit.addressDetail,
    },
    {
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
                  <dd className="mt-2 font-medium text-ink">{item.value}</dd>
                  {item.detail ? (
                    <dd className="text-sm text-brown-500">{item.detail}</dd>
                  ) : null}
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Map placeholder */}
          <Reveal delay={0.14}>
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-3xl border border-border bg-olive/10">
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  backgroundImage:
                    "linear-gradient(0deg, rgba(68,82,31,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(68,82,31,0.10) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
                aria-hidden
              />
              <div className="absolute inset-0 grid place-items-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-cream/90 px-4 py-2 text-sm font-medium text-brown-700 shadow-soft backdrop-blur-sm">
                  <Navigation className="size-4 text-coral-deep" />
                  {t.visit.mapPlaceholder}
                </span>
              </div>
              <span className="absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-full place-items-center rounded-full bg-coral-deep text-cream shadow-warm">
                <MapPin className="size-5" />
              </span>
            </div>
          </Reveal>
        </div>

        {/* Reservation form */}
        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-3xl border border-border bg-card p-6 shadow-warm sm:p-8"
          >
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
              {t.visit.form.title}
            </h3>

            {success ? (
              <p
                role="status"
                className="mt-4 flex items-start gap-2 rounded-2xl border border-olive/25 bg-olive/10 p-4 text-sm text-olive-700"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-olive" />
                {success}
              </p>
            ) : null}

            <div className="mt-6 flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <Label htmlFor={`${ids}-name`}>{t.visit.form.name}</Label>
                <Input
                  id={`${ids}-name`}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setSuccess(null);
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
                      setSuccess(null);
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
                      setSuccess(null);
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
                    setSuccess(null);
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

              <CtaButton
                type="submit"
                variant="primary"
                size="lg"
                className={cn("mt-1 w-full")}
              >
                {t.visit.form.submit}
              </CtaButton>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
