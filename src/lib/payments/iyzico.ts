import type { PaymentProvider } from "./types";

// iyzico (Turkey-friendly) adapter STUB. Gated on IYZICO_API_KEY +
// IYZICO_SECRET_KEY, and conforms to PaymentProvider so it drops in once
// implemented. Complete the Checkout Form (CF) flow before using in production
// (see TEMPLATE.md). Until then Stripe is the working reference adapter.
export function iyzicoProvider(): PaymentProvider | null {
  if (!process.env.IYZICO_API_KEY || !process.env.IYZICO_SECRET_KEY) {
    return null;
  }
  return {
    id: "iyzico",
    async createCheckout() {
      // TODO: POST an HMAC-SHA256-signed request to
      //   `${IYZICO_BASE_URL}/payment/iyzipos/checkoutform/initialize/auth/ecom`
      // with buyer + basketItems + the order total, then return
      //   { redirectUrl: response.paymentPageUrl }.
      throw new Error(
        "iyzico adapter not implemented — wire the Checkout Form flow (see TEMPLATE.md) or use Stripe.",
      );
    },
    async handleWebhook() {
      // TODO: on the iyzico callback, retrieve the CF result by `token` and
      // verify it, then return { orderId, paid }.
      return null;
    },
  };
}
