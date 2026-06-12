// Ad-hoc capture of the Chapter-4 world-map scroll-scrub at controlled
// progress points, in light + dark. Drives scroll via real wheel input so
// Lenis stays in sync; shoots the viewport (the panel scrolls off the top when
// "settled", so an element screenshot's auto-scroll would fight Lenis).
//   node e2e/capture-map.mjs   (server must be on BASE_URL, default :3100)
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL || "http://localhost:3100";
const OUT = "screenshots";
mkdirSync(OUT, { recursive: true });

async function panelMetrics(page) {
  return page.evaluate(() => {
    const panel = [...document.querySelectorAll("div")].find(
      (d) =>
        d.className.includes("shadow-warm") &&
        d.className.includes("bg-[#0a0806]"),
    );
    if (!panel) return null;
    const r = panel.getBoundingClientRect();
    return {
      panelTop: r.top + window.scrollY,
      H: r.height,
      vh: window.innerHeight,
      scrollY: window.scrollY,
    };
  });
}

async function scrollToProgress(page, p) {
  const m = await panelMetrics(page);
  if (!m) throw new Error("panel not found");
  const startY = m.panelTop - 0.85 * m.vh;
  const endY = m.panelTop + m.H - 0.35 * m.vh;
  const targetY = startY + p * (endY - startY);
  for (let i = 0; i < 50; i++) {
    const cur = await page.evaluate(() => window.scrollY);
    const delta = targetY - cur;
    if (Math.abs(delta) < 6) break;
    await page.mouse.wheel(0, Math.max(-1500, Math.min(1500, delta)));
    await page.waitForTimeout(160);
  }
  await page.waitForTimeout(900); // let Lenis + the scrub settle
  // report the actual landed progress
  const cur = await page.evaluate(() => window.scrollY);
  const actual = Math.min(1, Math.max(0, (cur - startY) / (endY - startY)));
  return actual;
}

const FRAMES = [
  { p: 0.46, name: "mid" },
  { p: 0.72, name: "settled" },
];

const run = async () => {
  const browser = await chromium.launch();
  for (const theme of ["light", "dark"]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE, { waitUntil: "load" });
    await page.waitForTimeout(600);
    if (theme === "dark") {
      await page.click('button[aria-label="Switch between light and dark"]');
      await page.waitForTimeout(500);
    }
    // warm the lazy <Image> + mapbox-free fallback in by passing through once
    await page.mouse.move(720, 450);
    for (const f of FRAMES) {
      const actual = await scrollToProgress(page, f.p);
      const file = `${OUT}/map-${f.name}-${theme}.png`;
      await page.screenshot({ path: file });
      console.log(
        `${theme} ${f.name}: target p=${f.p} actual p=${actual.toFixed(3)} -> ${file}`,
      );
    }
    await page.close();
  }
  await browser.close();
  console.log("done");
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
