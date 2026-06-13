import { getPaymentProvider } from "@/lib/payments";
import { recordOrderEvent } from "@/lib/orders";

export const runtime = "nodejs";

// Provider webhook → confirms paid orders. Stripe: set the endpoint to
// /api/payment-webhook and STRIPE_WEBHOOK_SECRET (the adapter verifies the
// signature). No provider configured → 400.
export async function POST(req: Request): Promise<Response> {
  const provider = getPaymentProvider();
  if (!provider) return new Response("no payment provider configured", { status: 400 });

  const result = await provider.handleWebhook(req);
  if (result && result.orderId) {
    try {
      await recordOrderEvent(result.orderId, result.paid ? "paid" : "failed");
    } catch (err) {
      console.error("[payment-webhook] failed to record order event:", err);
    }
    console.info(
      `[payment-webhook] order ${result.orderId} → ${result.paid ? "paid" : "failed"}`,
    );
  }
  return new Response("ok");
}
