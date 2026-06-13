import "server-only";
import { appendJsonl } from "@/lib/api-helpers";
import type { Order } from "@/lib/payments/types";

// Lightweight append-only order log (.data/orders.jsonl). Each line is an event;
// the latest event per `id` wins. Enough to keep orders as real records without
// a database. TODO(prod): move to a real DB (Postgres/Upstash) for queries.

export async function saveOrder(order: Order): Promise<void> {
  await appendJsonl("orders.jsonl", { event: "created", ...order });
}

export async function recordOrderEvent(
  id: string,
  status: Order["status"],
): Promise<void> {
  await appendJsonl("orders.jsonl", { event: "status", id, status });
}
