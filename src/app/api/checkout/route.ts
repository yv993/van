import { orderSchema } from "@/lib/schemas";
import { shopProducts } from "@/content/shop";
import { en } from "@/i18n/dictionaries/en";
import type { ShopProductId } from "@/i18n/types";
import { getPaymentProvider } from "@/lib/payments";
import { saveOrder } from "@/lib/orders";
import { clientIp, rateLimit } from "@/lib/api-helpers";
import { brand } from "@/config/brand";
import type { Order } from "@/lib/payments/types";

export const runtime = "nodejs";

type ApiResult =
  | { ok: true; orderId: string; redirectUrl?: string; payOnArrival?: boolean }
  | { ok: false; error: string };

const json = (body: ApiResult, status = 200) => Response.json(body, { status });

export async function POST(req: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  if (body && typeof body === "object") {
    const hp = (body as Record<string, unknown>).website;
    if (typeof hp === "string" && hp.length > 0)
      return json({ ok: true, orderId: "" });
  }

  const ip = clientIp(req);
  if (!rateLimit(`checkout:${ip}`)) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) return json({ ok: false, error: "validation" }, 400);
  const { lines: rawLines, email, locale } = parsed.data;

  // Trust ONLY ids + qty from the client; resolve price + name server-side.
  const orderLines = rawLines.flatMap((l) => {
    const product = shopProducts.find((p) => p.id === l.id);
    if (!product) return [];
    return [
      {
        id: l.id,
        name: en.shop.products[l.id as ShopProductId].name,
        price: product.price,
        qty: l.qty,
      },
    ];
  });
  if (orderLines.length === 0) return json({ ok: false, error: "empty" }, 400);

  const total = orderLines.reduce((s, l) => s + l.price * l.qty, 0);
  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const provider = getPaymentProvider();
  const loc = locale ?? brand.defaultLocale;

  const order: Order = {
    id,
    lines: orderLines,
    currency: brand.currency,
    total,
    email: email || undefined,
    locale: loc,
    status: provider ? "pending" : "pay_on_arrival",
    provider: provider?.id ?? "demo",
    createdAt: new Date().toISOString(),
  };

  try {
    await saveOrder(order);
  } catch (err) {
    console.error("[checkout] order save failed:", err);
  }

  // Provider configured → hosted checkout; else demo "pay on arrival".
  if (provider) {
    try {
      const origin = new URL(req.url).origin;
      const { redirectUrl } = await provider.createCheckout(order, {
        successUrl: `${origin}/${loc}?order=success`,
        cancelUrl: `${origin}/${loc}?order=cancel`,
      });
      return json({ ok: true, orderId: id, redirectUrl });
    } catch (err) {
      console.error("[checkout] provider error:", err);
      return json({ ok: false, error: "payment_init_failed" }, 502);
    }
  }

  console.info(
    `[checkout] order ${id} recorded — pay on arrival (set STRIPE_SECRET_KEY or iyzico keys to take card payments) — ${orderLines.length} line(s), ${brand.currencySymbol}${total}`,
  );
  return json({ ok: true, orderId: id, payOnArrival: true });
}
