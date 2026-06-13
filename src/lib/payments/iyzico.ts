import crypto from "node:crypto";
import type { Order, PaymentProvider } from "./types";

// iyzico (Turkey-friendly) adapter — Checkout Form (CF) flow with the newer
// IYZWSv2 HMAC-SHA256 authentication. Card data never touches this server:
// iyzico hosts the payment page (paymentPageUrl) and POSTs the result token back
// to our callbackUrl. Gated on IYZICO_API_KEY + IYZICO_SECRET_KEY; conforms to
// PaymentProvider so it drops in behind the env selector next to Stripe.
//
// Env:
//   IYZICO_API_KEY, IYZICO_SECRET_KEY        — required (sandbox or production)
//   IYZICO_BASE_URL   (default sandbox)      — https://api.iyzipay.com in prod
//   IYZICO_CALLBACK_URL (optional)           — where iyzico POSTs the token;
//                                              defaults to <origin>/api/payment-webhook
//
// NOTE: iyzico requires buyer + address fields the cart doesn't collect; until a
// checkout form gathers them, sensible placeholders are sent (accepted by the
// sandbox). Verify end-to-end in sandbox before going live.

const DEFAULT_BASE = "https://sandbox-api.iyzipay.com";

/**
 * IYZWSv2 authorization header. signature = HMAC-SHA256(randomKey + uriPath +
 * requestBody, secretKey) as hex; the header payload `apiKey:…&randomKey:…&
 * signature:…` is base64-encoded. The same randomKey is echoed in x-iyzi-rnd.
 */
function v2Auth(
  apiKey: string,
  secretKey: string,
  uriPath: string,
  body: string,
) {
  const randomKey = `${Date.now()}${Math.floor(Math.random() * 1e6)}`;
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(randomKey + uriPath + body, "utf8")
    .digest("hex");
  const authParams = `apiKey:${apiKey}&randomKey:${randomKey}&signature:${signature}`;
  const authorization =
    "IYZWSv2 " + Buffer.from(authParams, "utf8").toString("base64");
  return { authorization, randomKey };
}

async function iyziPost(
  base: string,
  uriPath: string,
  apiKey: string,
  secretKey: string,
  payload: unknown,
): Promise<Record<string, unknown>> {
  const body = JSON.stringify(payload);
  const { authorization, randomKey } = v2Auth(apiKey, secretKey, uriPath, body);
  const res = await fetch(base + uriPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
      "x-iyzi-rnd": randomKey,
    },
    body,
  });
  return (await res.json()) as Record<string, unknown>;
}

export function iyzicoProvider(): PaymentProvider | null {
  const apiKey = process.env.IYZICO_API_KEY;
  const secretKey = process.env.IYZICO_SECRET_KEY;
  if (!apiKey || !secretKey) return null;
  const base = process.env.IYZICO_BASE_URL || DEFAULT_BASE;

  return {
    id: "iyzico",

    async createCheckout(order: Order, { successUrl }) {
      const uriPath = "/payment/iyzipos/checkoutform/initialize/auth/ecom";
      const callbackUrl =
        process.env.IYZICO_CALLBACK_URL ||
        new URL(successUrl).origin + "/api/payment-webhook";

      // Each line becomes a basket item priced at line.price × qty; iyzico
      // requires `price` to equal the sum of basket-item prices exactly.
      const basketItems = order.lines.map((l) => ({
        id: l.id,
        name: l.name,
        category1: "Breakfast",
        itemType: "PHYSICAL",
        price: (l.price * l.qty).toFixed(2),
      }));
      const price = basketItems
        .reduce((sum, i) => sum + Number(i.price), 0)
        .toFixed(2);

      // TODO: collect real buyer + address in a checkout form. These are valid
      // placeholders accepted by the iyzico sandbox so the flow works keyless-ish.
      const buyer = {
        id: order.id,
        name: "Misafir",
        surname: "Müşteri",
        gsmNumber: "+905350000000",
        email: order.email || "guest@example.com",
        identityNumber: "11111111111",
        registrationAddress: "Kahvaltı Sokağı, Van",
        ip: "85.34.78.112",
        city: "Van",
        country: "Turkey",
        zipCode: "65100",
      };
      const address = {
        contactName: "Misafir Müşteri",
        city: "Van",
        country: "Turkey",
        address: "Kahvaltı Sokağı, Van",
        zipCode: "65100",
      };

      const data = await iyziPost(base, uriPath, apiKey, secretKey, {
        locale: order.locale === "tr" ? "tr" : "en",
        conversationId: order.id,
        price,
        paidPrice: price,
        currency: order.currency,
        basketId: order.id,
        paymentGroup: "PRODUCT",
        callbackUrl,
        enabledInstallments: [1],
        buyer,
        shippingAddress: address,
        billingAddress: address,
        basketItems,
      });

      if (data.status !== "success" || typeof data.paymentPageUrl !== "string") {
        throw new Error(
          `iyzico checkoutform initialize failed: ${
            (data.errorMessage as string) || data.status || "unknown error"
          }`,
        );
      }
      return { redirectUrl: data.paymentPageUrl };
    },

    async handleWebhook(req: Request) {
      // iyzico POSTs the CF result token to callbackUrl (form-encoded, or JSON).
      let token: string | undefined;
      const contentType = req.headers.get("content-type") || "";
      try {
        if (contentType.includes("application/json")) {
          const j = (await req.json()) as { token?: string };
          token = j.token;
        } else {
          const form = await req.formData();
          const t = form.get("token");
          token = typeof t === "string" ? t : undefined;
        }
      } catch {
        return null;
      }
      if (!token) return null;

      // Retrieve the authoritative CF result by token (don't trust the callback).
      const uriPath = "/payment/iyzipos/checkoutform/auth/ecom/detail";
      const data = await iyziPost(base, uriPath, apiKey, secretKey, {
        locale: "tr",
        token,
      });
      if (data.status !== "success") return null;

      const orderId =
        (typeof data.basketId === "string" && data.basketId) ||
        (typeof data.conversationId === "string" && data.conversationId) ||
        "";
      return { orderId, paid: data.paymentStatus === "SUCCESS" };
    },
  };
}
