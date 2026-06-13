// Provider-agnostic payment + order model for shop checkout. A new payment
// provider = implement PaymentProvider; nothing else changes.

export interface OrderLine {
  id: string;
  name: string;
  price: number; // per-unit, major units (e.g. ₺)
  qty: number;
}

export interface Order {
  id: string;
  lines: OrderLine[];
  currency: string; // ISO-4217
  total: number;
  email?: string;
  locale?: string;
  status: "pending" | "paid" | "pay_on_arrival" | "failed";
  provider: string; // "stripe" | "iyzico" | "demo"
  createdAt: string;
  paidAt?: string;
}

export interface CheckoutSession {
  /** Provider-hosted page to redirect the browser to in order to pay. */
  redirectUrl: string;
}

export interface WebhookResult {
  orderId: string;
  paid: boolean;
}

export interface PaymentProvider {
  readonly id: string;
  /** Create a hosted checkout session and return a redirect URL. */
  createCheckout(
    order: Order,
    urls: { successUrl: string; cancelUrl: string },
  ): Promise<CheckoutSession>;
  /** Verify + parse a webhook request; null if not a relevant/valid event. */
  handleWebhook(req: Request): Promise<WebhookResult | null>;
}
