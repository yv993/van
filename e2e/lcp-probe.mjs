// Real-Chromium LCP probe (not Lighthouse's Lantern simulation). Applies 4x CPU
// + slow-4G throttling via CDP, loads the page at a mobile viewport, and reports
// FCP, LCP, the LCP element, and its load/render phases.
//   node e2e/lcp-probe.mjs http://localhost:3100/en
import { chromium } from "playwright";

const URL = process.argv[2] || "http://localhost:3100/en";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 412, height: 823 },
  deviceScaleFactor: 1.75,
  isMobile: true,
  userAgent:
    "Mozilla/5.0 (Linux; Android 11; moto g power) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36",
});
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send("Network.enable");
await cdp.send("Network.emulateNetworkConditions", {
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
});
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });

await page.goto(URL, { waitUntil: "load", timeout: 90000 });
// let LCP settle
await page.waitForTimeout(2500);

const metrics = await page.evaluate(
  () =>
    new Promise((resolve) => {
      const out = {};
      for (const e of performance.getEntriesByType("paint")) {
        if (e.name === "first-contentful-paint") out.fcp = Math.round(e.startTime);
      }
      out.nav = Math.round(
        performance.getEntriesByType("navigation")[0]?.responseEnd || 0,
      );
      // LCP entries only surface via a buffered observer.
      const lcps = [];
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) lcps.push(e);
      }).observe({ type: "largest-contentful-paint", buffered: true });
      setTimeout(() => {
        const last = lcps[lcps.length - 1];
        if (last) {
          out.lcp = Math.round(last.startTime);
          out.lcpSize = Math.round(last.size);
          out.lcpElement =
            last.element?.tagName +
            "." +
            (last.element?.className || "").toString().slice(0, 60);
          out.lcpText = (last.element?.textContent || "").slice(0, 50);
          out.lcpUrl = last.url || "(text)";
        } else {
          out.lcp = "none captured";
        }
        resolve(out);
      }, 300);
    }),
);

console.log(JSON.stringify(metrics, null, 2));
await browser.close();
