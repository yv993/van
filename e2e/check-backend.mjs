// Checks the KVKK consent banner + analytics gating, legal pages per locale,
// and the reservation consent-required path. Server on BASE_URL (default :3100).
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL || "http://localhost:3100";
const OUT = "screenshots";
mkdirSync(OUT, { recursive: true });

const results = [];
const check = (n, c, x = "") => {
  results.push([n, c]);
  console.log(`${c ? "PASS" : "FAIL"}  ${n}${x ? " — " + x : ""}`);
};
const hasAnalytics = (page) =>
  page.evaluate(
    () =>
      !!document.querySelector('script[src*="insights"],script[src*="plausible"]'),
  );

const run = async () => {
  const browser = await chromium.launch();

  // A) Banner appears; analytics off before any choice.
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "load" });
    await page.waitForTimeout(800);
    check(
      "consent banner appears",
      await page.getByRole("button", { name: "Accept" }).isVisible().catch(() => false),
    );
    await page.screenshot({ path: `${OUT}/consent-banner.png` });
    check("analytics OFF before consent", !(await hasAnalytics(page)));
    await ctx.close();
  }

  // B) "Necessary only" → dismiss + analytics stays off + persisted.
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "load" });
    await page.waitForTimeout(800);
    await page.getByRole("button", { name: "Necessary only" }).click();
    await page.waitForTimeout(900);
    check(
      "Necessary only dismisses banner",
      !(await page.getByRole("button", { name: "Necessary only" }).isVisible().catch(() => false)),
    );
    check("Necessary only keeps analytics OFF", !(await hasAnalytics(page)));
    const stored = await page.evaluate(() => localStorage.getItem("akdamar.consent"));
    check("consent persisted = necessary", stored === "necessary", `stored=${stored}`);
    await ctx.close();
  }

  // C) "Accept" → analytics loads.
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "load" });
    await page.waitForTimeout(800);
    await page.getByRole("button", { name: "Accept" }).click();
    await page.waitForTimeout(1200);
    check("Accept enables analytics", await hasAnalytics(page));
    await ctx.close();
  }

  // D) Legal pages per locale.
  for (const loc of ["tr", "en", "hy"]) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
    const page = await ctx.newPage();
    await page.addInitScript((l) => localStorage.setItem("akdamar.locale", l), loc);
    await page.goto(`${BASE}/gizlilik`, { waitUntil: "load" });
    await page.waitForTimeout(600);
    const h1 = (await page.locator("h1").first().innerText().catch(() => "")).trim();
    check(`/gizlilik renders (${loc})`, h1.length > 5, `h1="${h1.slice(0, 44)}"`);
    check(
      `/gizlilik TEMPLATE notice (${loc})`,
      await page.getByText(/ŞABLON|TEMPLATE/i).first().isVisible().catch(() => false),
    );
    if (loc === "tr") await page.screenshot({ path: `${OUT}/gizlilik-tr.png`, fullPage: true });
    if (loc === "hy") {
      check(
        "hy legal shows TR/EN note",
        await page.getByText(/թրքերէն|Turkish|Türkçe/).first().isVisible().catch(() => false),
      );
    }
    await ctx.close();
  }

  // E) Cookie policy page.
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/cerez-politikasi`, { waitUntil: "load" });
    await page.waitForTimeout(500);
    const h1 = (await page.locator("h1").first().innerText().catch(() => "")).trim();
    check("/cerez-politikasi renders", /Çerez|Cookie/i.test(h1), `h1="${h1}"`);
    await ctx.close();
  }

  // F) Reservation requires consent.
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "load" });
    await page.waitForTimeout(800);
    await page.getByRole("button", { name: "Necessary only" }).click().catch(() => {});
    const form = page.locator("form").filter({ has: page.getByLabel("Your name") });
    await form.getByLabel("Your name").fill("Test");
    await form.getByLabel("Email", { exact: true }).fill("t@example.com");
    await form.getByLabel("Date").fill("2026-09-20");
    await form.getByLabel("Time").fill("09:00");
    // intentionally NOT checking consent
    const submit = form.getByRole("button", { name: "Reserve a table" });
    await submit.scrollIntoViewIfNeeded();
    await submit.click();
    await page.waitForTimeout(500);
    check(
      "reservation blocks + shows consent error when unchecked",
      await page.getByText("Please accept the privacy notice", { exact: false }).isVisible().catch(() => false),
    );
    await page.screenshot({ path: `${OUT}/reservation-consent-error.png` });
    await ctx.close();
  }

  await browser.close();
  const failed = results.filter((r) => !r[1]);
  console.log(`\n==== ${results.length - failed.length}/${results.length} checks ====`);
  if (failed.length) {
    console.log("FAIL:", failed.map((f) => f[0]).join(", "));
    process.exit(1);
  }
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
