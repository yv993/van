import { z } from "zod";

// Shared validation for the reservation + newsletter forms. The SAME schema is
// imported by the client (instant field errors) and the route handlers (the
// real trust boundary) — so the two can never drift.

export const LOCALES = ["en", "tr", "hy", "ru"] as const;

// Honeypot: a hidden field real users never see/fill. Bots that auto-fill every
// input trip it. Must be empty or absent.
const honeypot = z
  .string()
  .max(0, "bot")
  .optional()
  .or(z.literal(""));

// Server-side "not in the past" guard with a 1-day grace so a timezone gap
// between the visitor and the server can't reject a valid same-day booking.
function notBeforeYesterday(date: string): boolean {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return date >= d.toISOString().slice(0, 10);
}

export const reservationSchema = z.object({
  name: z.string().trim().min(1, "name").max(80),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "date")
    .refine(notBeforeYesterday, { message: "date_past" }),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "time"),
  guests: z.coerce.number().int().min(1).max(12),
  // Email is REQUIRED now so we can send a confirmation.
  email: z.email().max(120),
  // Optional, Türkiye-friendly: digits, spaces, +, -, parentheses.
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+()\-\s]{5,30}$/, "phone")
    .optional()
    .or(z.literal("")),
  consent: z.literal(true),
  website: honeypot,
  locale: z.enum(LOCALES).optional(),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

export const newsletterSchema = z.object({
  email: z.email().max(120),
  consent: z.literal(true),
  website: honeypot,
  locale: z.enum(LOCALES).optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

// Shop checkout. Only ids + quantities are trusted from the client — the route
// looks prices up server-side (never trust client prices).
export const orderSchema = z.object({
  lines: z
    .array(
      z.object({
        id: z.string().min(1).max(60),
        qty: z.coerce.number().int().min(1).max(50),
      }),
    )
    .min(1)
    .max(50),
  email: z.email().max(120).optional().or(z.literal("")),
  locale: z.enum(LOCALES).optional(),
  website: honeypot,
});

export type OrderInput = z.infer<typeof orderSchema>;
