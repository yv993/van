import { chromium } from "playwright";
const BASE = process.env.BASE_URL || "http://localhost:3100";
const browser = await chromium.launch();

async function shot(name, w, h, scrollSel) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "load" });
  await page.waitForTimeout(900);
  if (scrollSel) {
    await page.locator(scrollSel).first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
  }
  await page.screenshot({ path: `screenshots/${name}.png` });
  await ctx.close();
  console.log("shot", name);
}

await shot("d-hero", 1440, 900, null);
await shot("d-shop", 1440, 900, "#shop");
await shot("d-menu", 1440, 900, "#menu");
await shot("d-heritage", 1440, 900, "#heritage");
await shot("d-visit", 1440, 900, "#visit");
await shot("m-hero", 390, 844, null);
await shot("m-menu", 390, 844, "#menu");
await browser.close();
