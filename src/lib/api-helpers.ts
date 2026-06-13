import { promises as fs } from "node:fs";
import path from "node:path";

// Local, zero-setup fallback store + spam friction for the form route handlers.
// Used only when no provider keys are configured (see each route).

const DATA_DIR = path.join(process.cwd(), ".data");

/** Append a record (stamped with the server time) as one JSON line to .data/<file>. */
export async function appendJsonl(
  file: string,
  record: Record<string, unknown>,
): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const line = JSON.stringify({ at: new Date().toISOString(), ...record }) + "\n";
  await fs.appendFile(path.join(DATA_DIR, file), line, "utf8");
}

/** Best-effort client IP from proxy headers (Next 16 removed `request.ip`). */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

// Naive in-memory sliding-window limiter. NOTE: per-instance and resets on
// redeploy — enough to blunt casual spam, NOT a security control.
// TODO(prod): swap for Upstash Ratelimit (@upstash/ratelimit + Redis).
const hits = new Map<string, number[]>();
export function rateLimit(key: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false; // blocked
  }
  recent.push(now);
  hits.set(key, recent);
  return true; // allowed
}
