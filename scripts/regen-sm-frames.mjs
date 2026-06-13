// Regenerate the lighter tablet cinematic set (`descent-sm`) from the crisp
// 1440px `descent` frames: fewer frames (130 → SMALL_COUNT) + smaller width,
// re-encoded as WebP. Phones don't load frames at all (poster fallback), so
// this set only serves tablets 768–1023px — it just needs to be light + smooth.
//
//   node scripts/regen-sm-frames.mjs
//
// Keep SMALL_COUNT in sync with brand.cinematic.smallFrameCount.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC_DIR = "public/frames/descent";
const OUT_DIR = "public/frames/descent-sm";
const SRC_COUNT = 130; // frames in descent/
const SMALL_COUNT = 66; // == brand.cinematic.smallFrameCount
const WIDTH = 768;
const QUALITY = 55;

const pad = (n) => String(n).padStart(4, "0");

async function main() {
  // Fresh output dir (we're going from 130 → 66 files; clear stale tail).
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let bytes = 0;
  for (let k = 0; k < SMALL_COUNT; k++) {
    // Evenly sample the source timeline so the scrub stays smooth.
    const srcIdx =
      Math.round((k * (SRC_COUNT - 1)) / (SMALL_COUNT - 1)) + 1;
    const srcFile = path.join(SRC_DIR, `frame_${pad(srcIdx)}.webp`);
    const outFile = path.join(OUT_DIR, `frame_${pad(k + 1)}.webp`);
    await sharp(srcFile)
      .resize({ width: WIDTH })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(outFile);
    bytes += fs.statSync(outFile).size;
  }
  console.log(
    `descent-sm: ${SMALL_COUNT} frames @ ${WIDTH}px q${QUALITY} = ${(bytes / 1024 / 1024).toFixed(2)} MB`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
