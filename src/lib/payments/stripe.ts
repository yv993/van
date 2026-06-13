import Stripe from "stripe";
import type { PaymentProvider } from "./types";

// Stripe Checkout adapter (reference implementation). Card data never touches
// this server — Stripe hosts the payment page. Active only when
// STRIPE_SECRET_KEY is set; the webhook needs STRIPE_WEBHOOK_SECRET.
export function stripeProvider(): PaymentProvider | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  const stripe = new Stripe(key);

  return {
    id: "stripe",

    async createCheckout(order, { successUrl, cancelUrl }) {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        client_reference_id: order.id,
        metadata: { orderId: order.id },
        customer_email: order.email,
        line_items: order.lines.map((l) => ({
          quantity: l.qty,
          price_data: {
            currency: order.currency.toLowerCase(),
            unit_amount: Math.round(l.price * 100), // minor units
            product_data: { name: l.name },
          },
        })),
        success_url: successUrl,
        cancel_url: cancelUrl,
      });
      if (!session.url) throw new Error("stripe: checkout session has no url");
      return { redirectUrl: session.url };
    },

    async handleWebhook(req) {
      const whsec = process.env.STRIPE_WEBHOOK_SECRET;
      const sig = req.headers.get("stripe-signature");
      if (!whsec || !sig) return null;
      const body = await req.text();
      let event: Stripe.Event;
      try {
        event = stripe.webhooks.constructEvent(body, sig, whsec);
      } catch {
        return null; // bad signature
      }
      if (event.type === "checkout.session.completed") {
        const s = event.data.object;
        const orderId =
          (typeof s.metadata?.orderId === "string" && s.metadata.orderId) ||
          s.client_reference_id ||
          "";
        return { orderId, paid: s.payment_status === "paid" };
      }
      return null;
    },
  };
}
