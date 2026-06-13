// Lighthouse runner for the Akdamar site (mobile + desktop).
// Requires dev-only tooling: `npm i --no-save lighthouse chrome-launcher`.
// Uses Playwright's bundled Chromium so no system Chrome is needed.
//
//   node e2e/lighthouse.mjs mobile  /en /en/faq
//   node e2e/lighthouse.mjs desktop /en
//
// Outputs lh-<formFactor>-<slug>.json (gitignored) and prints the category scores.
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "playwright";
import fs from "node:fs";

const BASE = process.env.BASE_URL || "http://localhost:3100";
const formFactor = process.argv[2] === "desktop" ? "desktop" : "mobile";
const paths = process.argv.slice(3);
if (paths.length === 0) paths.push("/en");

const CHROME_PATH = chromium.executablePath();

// Lighthouse throttling presets. Mobile = Lighthouse defaults (Moto-G class,
// 4x CPU, slow 4G). Desktop = the standard desktop preset.
const mobileSettings = {
  formFactor: "mobile",
  screenEmulation: {
    mobile: true,
    width: 412,
    height: 823,
    deviceScaleFactor: 1.75,
    disabled: false,
  },
  throttling: {
    rttMs: 150,
    throughputKbps: 1638.4,
    cpuSlowdownMultiplier: 4,
    requestLatencyMs: 562.5,
    downloadThroughputKbps: 1474.56,
    uploadThroughputKbps: 675,
  },
};

const desktopSettings = {
  formFactor: "desktop",
  screenEmulation: {
    mobile: false,
    width: 1350,
    height: 940,
    deviceScaleFactor: 1,
    disabled: false,
  },
  throttling: {
    rttMs: 40,
    throughputKbps: 10240,
    cpuSlowdownMultiplier: 1,
    requestLatencyMs: 0,
    downloadThroughputKbps: 0,
    uploadThroughputKbps: 0,
  },
};

async function main() {
  const chrome = await launch({
    chromePath: CHROME_PATH,
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  });

  const summary = [];
  try {
    for (const p of paths) {
      const url = BASE + p;
      const runnerResult = await lighthouse(
        url,
        { port: chrome.port, output: "json", logLevel: "error" },
        {
          extends: "lighthouse:default",
          settings: {
            onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
            ...(formFactor === "desktop" ? desktopSettings : mobileSettings),
          },
        },
      );
      const lhr = runnerResult.lhr;
      const slug = p.replace(/\//g, "_") || "_root";
      fs.writeFileSync(`lh-${formFactor}-${slug}.json`, runnerResult.report);

      const cat = lhr.categories;
      const a = lhr.audits;
      const row = {
        url: p,
        perf: Math.round(cat.performance.score * 100),
        a11y: Math.round(cat.accessibility.score * 100),
        bp: Math.round(cat["best-practices"].score * 100),
        seo: Math.round(cat.seo.score * 100),
        LCP: a["largest-contentful-paint"]?.displayValue,
        TBT: a["total-blocking-time"]?.displayValue,
        CLS: a["cumulative-layout-shift"]?.displayValue,
        FCP: a["first-contentful-paint"]?.displayValue,
        SI: a["speed-index"]?.displayValue,
        TTI: a["interactive"]?.displayValue,
      };
      summary.push(row);
      console.log(
        `\n[${formFactor}] ${p}\n  perf=${row.perf} a11y=${row.a11y} bp=${row.bp} seo=${row.seo}` +
          `\n  LCP=${row.LCP}  TBT=${row.TBT}  CLS=${row.CLS}  FCP=${row.FCP}  SI=${row.SI}  TTI=${row.TTI}`,
      );

      // Top opportunities / diagnostics by wasted ms or bytes.
      const opps = Object.values(a)
        .filter((x) => x.details?.type === "opportunity" && (x.numericValue || 0) > 50)
        .sort((x, y) => (y.numericValue || 0) - (x.numericValue || 0))
        .slice(0, 6)
        .map((x) => `${x.title} (~${Math.round(x.numericValue)}ms)`);
      if (opps.length) console.log("  opportunities:\n   - " + opps.join("\n   - "));
    }
  } finally {
    await chrome.kill();
  }

  console.log("\n==== SUMMARY (" + formFactor + ") ====");
  for (const r of summary) {
    console.log(`${r.url.padEnd(14)} perf ${r.perf}  a11y ${r.a11y}  bp ${r.bp}  seo ${r.seo}`);
  }
}

main().catch((e) => {
  console.error("LIGHTHOUSE RUNNER CRASHED:", e);
  process.exit(2);
});
