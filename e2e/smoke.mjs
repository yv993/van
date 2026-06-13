// Functional smoke test for the Akdamar site.
// Verifies: render, language switch + persistence, add-to-cart (drawer/badge/toast),
// reservation form validation + success, reduced-motion, and console cleanliness.
// Run against a server on http://localhost:3100.
import { chromium } from "playwright";
import fs from "node:fs";

const BASE = process.env.BASE_URL || "http://localhost:3100";
const SHOTS = "screenshots";
fs.mkdirSync(SHOTS, { recursive: true });

const results = [];
function check(name, cond, extra = "") {
  results.push({ name, ok: !!cond, extra });
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${extra ? " — " + extra : ""}`);
}

const consoleErrors = [];

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => consoleErrors.push("PAGEERROR: " + e.message));

  await page.goto(BASE, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(800);

  // 0. "/" redirects to a locale route (proxy)
  check("/ redirects to a locale route", /\/(en|tr|hy|ru)(\/|$)/.test(page.url()), page.url());

  // 1. Render
  check("hero renders (EN)", await page.getByText("THE MORNING", { exact: false }).first().isVisible());

  // 1b. Dismiss the KVKK consent banner ("Necessary only" → analytics stays off,
  // so no third-party script and a clean console below).
  const necessaryBtn = page.getByRole("button", { name: "Necessary only" });
  if (await necessaryBtn.isVisible().catch(() => false)) {
    await necessaryBtn.click();
    await page.waitForTimeout(300);
  }
  check("consent banner dismissed", !(await necessaryBtn.isVisible().catch(() => false)));

  // 2. Language switch EN -> TR
  await page.getByRole("button", { name: "Language" }).first().click();
  await page.getByRole("menuitem", { name: "Türkçe" }).click();
  await page.waitForURL(/\/tr(\/|$)/, { timeout: 15000 });
  await page.waitForLoadState("load");
  await page.waitForTimeout(500);
  const trVisible = await page.getByText("İMPARATORLUKLARI", { exact: false }).first().isVisible().catch(() => false);
  check("switched to Turkish (route /tr)", trVisible);

  // 3. Persistence across reload (URL is the source of truth now)
  await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(700);
  const trPersist = await page.getByText("İMPARATORLUKLARI", { exact: false }).first().isVisible().catch(() => false);
  check("Turkish persists after reload", trPersist);
  const htmlLang = await page.evaluate(() => document.documentElement.lang);
  check("html lang attr updated", htmlLang === "tr", `lang=${htmlLang}`);

  // 4. Switch to Armenian
  await page.getByRole("button", { name: "Dil" }).first().click(); // "Language" in TR
  await page.getByRole("menuitem", { name: "Հայերեն" }).click();
  await page.waitForURL(/\/hy(\/|$)/, { timeout: 15000 });
  await page.waitForLoadState("load");
  await page.waitForTimeout(400);
  const hyLang = await page.evaluate(() => document.documentElement.lang);
  check("switched to Armenian (route /hy, html lang=hy)", hyLang === "hy", `lang=${hyLang}`);

  // 5. Switch to Russian then back to English
  await page.getByRole("button", { name: "Լեզու" }).first().click();
  await page.getByRole("menuitem", { name: "Русский" }).click();
  await page.waitForURL(/\/ru(\/|$)/, { timeout: 15000 });
  await page.waitForLoadState("load");
  await page.waitForTimeout(400);
  const ruLang = await page.evaluate(() => document.documentElement.lang);
  check("switched to Russian (route /ru)", ruLang === "ru", `lang=${ruLang}`);
  await page.getByRole("button", { name: "Язык" }).first().click();
  await page.getByRole("menuitem", { name: "English" }).click();
  await page.waitForURL(/\/en(\/|$)/, { timeout: 15000 });
  await page.waitForLoadState("load");
  await page.waitForTimeout(400);

  // 6. Add to cart
  const addBtn = page.getByRole("button", { name: /Add —/ }).first();
  await addBtn.scrollIntoViewIfNeeded();
  await addBtn.click();
  await page.waitForTimeout(600);
  const drawerOpen = await page.getByText("Your basket", { exact: false }).first().isVisible().catch(() => false);
  check("cart drawer opens on add", drawerOpen);
  const toastSeen = await page.getByText("added to your basket", { exact: false }).first().isVisible().catch(() => false);
  check("toast shows on add", toastSeen);
  // badge: close drawer, read cart button label
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  const cartLabel = await page.getByRole("button", { name: /Basket —/ }).first().getAttribute("aria-label");
  check("cart badge incremented", /—\s*[1-9]/.test(cartLabel || ""), `label=${cartLabel}`);

  // 7. Reservation form validation
  const form = page.locator("form").filter({ has: page.getByLabel("Your name") });
  const submit = form.getByRole("button", { name: "Reserve a table" });
  await submit.scrollIntoViewIfNeeded();
  await submit.click();
  await page.waitForTimeout(300);
  const nameErr = await page.getByText("Please tell us your name.", { exact: false }).isVisible().catch(() => false);
  check("form shows validation error when empty", nameErr);

  // valid submit (now also needs email + KVKK consent; POSTs to /api/reservations)
  await page.getByLabel("Your name").fill("Araxie");
  await form.getByLabel("Email", { exact: true }).fill("araxie@example.com");
  await page.getByLabel("Date").fill("2026-09-20");
  await page.getByLabel("Time").fill("09:00");
  await form.getByRole("checkbox").check(); // KVKK consent
  await submit.click();
  await page.waitForTimeout(1500); // POST round-trip + .data write
  const success = await page.getByText("A table for 2 is requested", { exact: false }).first().isVisible().catch(() => false);
  check("form submits successfully", success);

  // 8. Screenshots at 3 widths
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${SHOTS}/desktop-1280.png`, fullPage: true });
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${SHOTS}/tablet-768.png`, fullPage: true });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${SHOTS}/mobile-375.png`, fullPage: true });

  // 9. Reduced motion run (fresh context)
  const rmContext = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: "reduce",
  });
  const rmPage = await rmContext.newPage();
  const rmErrors = [];
  rmPage.on("pageerror", (e) => rmErrors.push(e.message));
  await rmPage.goto(BASE, { waitUntil: "load", timeout: 60000 });
  await rmPage.waitForTimeout(600);
  const rmRender = await rmPage.getByText("THE MORNING", { exact: false }).first().isVisible().catch(() => false);
  check("reduced-motion renders without crash", rmRender && rmErrors.length === 0, rmErrors.join("; "));
  await rmPage.screenshot({ path: `${SHOTS}/reduced-motion-1280.png`, fullPage: false });
  await rmContext.close();

  // 10. Console cleanliness
  check("no console/page errors", consoleErrors.length === 0, consoleErrors.slice(0, 6).join(" | "));

  await browser.close();

  const failed = results.filter((r) => !r.ok);
  console.log(`\n==== ${results.length - failed.length}/${results.length} checks passed ====`);
  if (failed.length) {
    console.log("FAILURES:", failed.map((f) => f.name).join(", "));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("SMOKE TEST CRASHED:", e);
  process.exit(2);
});
