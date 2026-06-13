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

const run = async () => {
  const browser = await chromium.launch();

  // Nav navigation from home → About
  {
    const p = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await p.goto(`${BASE}/en`, { waitUntil: "load" });
    await p.waitForTimeout(700);
    await p.getByRole("button", { name: "Necessary only" }).click().catch(() => {});
    await p.getByRole("link", { name: "About", exact: true }).first().click();
    await p.waitForURL(/\/en\/about/, { timeout: 15000 });
    await p.waitForTimeout(700);
    check("nav → /en/about", /\/en\/about/.test(p.url()), p.url());
    check("about h1 visible", await p.locator("h1").first().isVisible());
    await p.screenshot({ path: `${OUT}/page-about-en.png`, fullPage: true });
    await p.close();
  }

  // Journal index → post
  {
    const p = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await p.goto(`${BASE}/en/journal`, { waitUntil: "load" });
    await p.waitForTimeout(600);
    check("journal cards present", (await p.locator("main a[href*='/journal/']").count()) >= 3);
    await p.screenshot({ path: `${OUT}/page-journal-en.png`, fullPage: true });
    await p.locator("main a[href*='/journal/']").first().click();
    await p.waitForURL(/\/en\/journal\/[a-z-]+/, { timeout: 15000 });
    await p.waitForTimeout(600);
    check("journal post renders", await p.locator("article h1").first().isVisible(), p.url());
    await p.screenshot({ path: `${OUT}/page-journal-post-en.png`, fullPage: true });
    await p.close();
  }

  // FAQ accordion (keyboard + click)
  {
    const p = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await p.goto(`${BASE}/en/faq`, { waitUntil: "load" });
    await p.waitForTimeout(500);
    const firstSummary = p.locator("details summary").first();
    await firstSummary.focus();
    await p.keyboard.press("Enter"); // native <details> toggles on Enter
    await p.waitForTimeout(300);
    const opened = await p.locator("details[open]").count();
    check("FAQ accordion opens via keyboard", opened >= 1, `open=${opened}`);
    await p.screenshot({ path: `${OUT}/page-faq-en.png`, fullPage: true });
    await p.close();
  }

  // Armenian content renders (no mojibake) + dark mode FAQ
  {
    const p = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await p.goto(`${BASE}/hy/about`, { waitUntil: "load" });
    await p.waitForTimeout(600);
    const h1 = (await p.locator("h1").first().innerText().catch(() => "")).trim();
    check("hy/about Armenian h1", /[԰-֏]/.test(h1), `h1="${h1.slice(0, 30)}"`);
    await p.screenshot({ path: `${OUT}/page-about-hy.png`, fullPage: false });
    await p.close();
  }
  {
    const p = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await p.addInitScript(() => localStorage.setItem("theme", "dark"));
    await p.goto(`${BASE}/tr/faq`, { waitUntil: "load" });
    await p.waitForTimeout(500);
    check("dark mode active", await p.evaluate(() => document.documentElement.classList.contains("dark")));
    await p.locator("details summary").first().click();
    await p.waitForTimeout(300);
    await p.screenshot({ path: `${OUT}/page-faq-dark.png`, fullPage: false });
    await p.close();
  }

  await browser.close();
  const failed = results.filter((r) => !r[1]);
  console.log(`\n==== ${results.length - failed.length}/${results.length} ====`);
  if (failed.length) process.exit(1);
};
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
