import "server-only";
import type { PaymentProvider } from "./types";
import { stripeProvider } from "./stripe";
import { iyzicoProvider } from "./iyzico";

/**
 * The configured payment provider, or `null` → the demo / pay-on-arrival flow.
 * Stripe takes precedence (the working reference adapter); iyzico is the
 * Turkey-friendly option once its adapter is completed.
 */
export function getPaymentProvider(): PaymentProvider | null {
  return stripeProvider() ?? iyzicoProvider() ?? null;
}

export type { PaymentProvider, Order, OrderLine } from "./types";
