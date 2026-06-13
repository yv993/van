import { Resend } from "resend";
import { newsletterSchema } from "@/lib/schemas";
import { appendJsonl, clientIp, rateLimit } from "@/lib/api-helpers";

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

  if (body && typeof body === "object") {
    const hp = (body as Record<string, unknown>).website;
    if (typeof hp === "string" && hp.length > 0) return json({ ok: true });
  }

  const ip = clientIp(request);
  if (!rateLimit(`newsletter:${ip}`)) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, error: "validation" }, 400);
  }
  const { email, locale } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  // With keys: add the contact to the Resend audience. Without: fall back.
  if (apiKey && audienceId) {
    try {
      const resend = new Resend(apiKey);
      await resend.contacts.create({ audienceId, email, unsubscribed: false });
      return json({ ok: true });
    } catch (err) {
      console.error("[newsletter] contact create failed; falling back to file:", err);
    }
  }

  try {
    await appendJsonl("newsletter.jsonl", { email, locale: locale ?? "en", ip });
  } catch (err) {
    console.error("[newsletter] file append failed:", err);
    return json({ ok: false, error: "store_failed" }, 500);
  }
  console.info(
    `[newsletter] saved to .data/newsletter.jsonl (set RESEND_API_KEY + RESEND_AUDIENCE_ID to use a Resend audience) — ${email}`,
  );
  return json({ ok: true });
}
