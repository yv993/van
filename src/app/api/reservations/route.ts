import { Resend } from "resend";
import { reservationSchema } from "@/lib/schemas";
import { appendJsonl, clientIp, rateLimit } from "@/lib/api-helpers";
import { guestConfirmation, staffNotification } from "@/lib/emails";

// fs + Resend need the Node runtime (not edge).
export const runtime = "nodejs";

type ApiResult = { ok: true } | { ok: false; error: string };

const json = (body: ApiResult, status = 200) =>
  Response.json(body, { status });

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Honeypot: a filled hidden field means a bot. Return success without doing
  // anything (don't tip them off), so they don't retry.
  if (body && typeof body === "object") {
    const hp = (body as Record<string, unknown>).website;
    if (typeof hp === "string" && hp.length > 0) return json({ ok: true });
  }

  // Per-IP spam friction (see api-helpers — resets on redeploy; Upstash TODO).
  const ip = clientIp(request);
  if (!rateLimit(`reservation:${ip}`)) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  const parsed = reservationSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, error: "validation" }, 400);
  }
  const data = parsed.data;
  const locale = data.locale ?? "en";

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESERVATION_TO_EMAIL;

  // With keys: email the restaurant + confirm to the guest. Without: fall back.
  if (apiKey && to) {
    try {
      const resend = new Resend(apiKey);
      // TODO(prod): use a verified sending domain, e.g. "Akdamar Kahvaltı Evi
      // <rezervasyon@your-domain.com>". onboarding@resend.dev only mails the
      // account owner.
      const from =
        process.env.RESEND_FROM_EMAIL ??
        "Akdamar Kahvaltı Evi <onboarding@resend.dev>";
      const staff = staffNotification(data, locale);
      const guest = guestConfirmation(data, locale);
      await resend.emails.send({
        from,
        to,
        replyTo: data.email,
        subject: staff.subject,
        html: staff.html,
      });
      await resend.emails.send({
        from,
        to: data.email,
        subject: guest.subject,
        html: guest.html,
      });
      return json({ ok: true });
    } catch (err) {
      // Don't drop the booking — record it locally and still succeed.
      console.error("[reservations] email send failed; falling back to file:", err);
    }
  }

  try {
    await appendJsonl("reservations.jsonl", { ...data, ip });
  } catch (err) {
    console.error("[reservations] file append failed:", err);
    return json({ ok: false, error: "store_failed" }, 500);
  }
  console.info(
    `[reservations] saved to .data/reservations.jsonl (set RESEND_API_KEY + RESERVATION_TO_EMAIL to email instead) — ${data.name} · ${data.date} ${data.time} · ${data.guests}p`,
  );
  return json({ ok: true });
}
