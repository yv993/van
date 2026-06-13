// Capture the menu upgrades (categories, dietary filter, lightbox) + Visit
// (map, open/closed, tel) in light + dark. Server on BASE_URL (default :3100).
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL || "http://localhost:3100";
const OUT = "screenshots";
mkdirSync(OUT, { recursive: true });

async function scrollToEl(page, sel, topOffset = 90) {
  const y = await page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    return el.getBoundingClientRect().top + window.scrollY;
  }, sel);
  if (y == null) throw new Error("no " + sel);
  const target = Math.max(0, y - topOffset);
  for (let i = 0; i < 60; i++) {
    const cur = await page.evaluate(() => window.scrollY);
    const d = target - cur;
    if (Math.abs(d) < 6) break;
    await page.mouse.wheel(0, Math.max(-1500, Math.min(1500, d)));
    await page.waitForTimeout(140);
  }
  await page.waitForTimeout(600);
}

const run = async () => {
  const browser = await chromium.launch();
  for (const theme of ["light", "dark"]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 940 } });
    await page.goto(BASE, { waitUntil: "load" });
    await page.waitForTimeout(600);
    if (theme === "dark") {
      await page.click('button[aria-label="Switch between light and dark"]');
      await page.waitForTimeout(500);
    }

    // Menu — categories + dietary filter + cards with tag badges
    await scrollToEl(page, "#menu", 80);
    await page.screenshot({ path: `${OUT}/menu-${theme}.png` });

    // Apply a dietary filter (AND-combined with category)
    await page.getByRole("button", { name: "Contains nuts", exact: true }).click();
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${OUT}/menu-filtered-${theme}.png` });
    await page.getByRole("button", { name: "Contains nuts", exact: true }).click();
    await page.waitForTimeout(500);

    // Lightbox — click the first dish card
    await page.locator("#menu ul li button").first().click();
    await page.waitForSelector('[role="dialog"]', { timeout: 4000 });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/lightbox-${theme}.png` });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);

    // Visit — map iframe + open/closed badge + tel link
    await scrollToEl(page, "#visit", 70);
    await page.waitForTimeout(800); // let the maps iframe paint
    await page.screenshot({ path: `${OUT}/visit-${theme}.png` });

    await page.close();
  }
  await browser.close();
  console.log("done");
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
