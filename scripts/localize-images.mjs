// Download the remaining Unsplash placeholder images, optimize them with sharp,
// and self-host under /public/images so the site has ZERO external image
// dependencies (the next/image Unsplash remotePattern can then be removed).
// Unsplash images are licensed for commercial use; attribution is logged for
// CREDITS.md. Re-run after editing the ASSETS map.
//   node scripts/localize-images.mjs
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const OUT = "public/images";
fs.mkdirSync(OUT, { recursive: true });

// id = Unsplash photo id; file = local output; w/h = output box; sq = square crop
const ASSETS = [
  { id: "1486297678162-eb2a19b0a32d", file: "butter.jpg", w: 900, h: 720 },
  { id: "1508061253366-f7da158b6d46", file: "walnut.jpg", w: 900, h: 720 },
  { id: "1498837167922-ddd27525d352", file: "gallery-spread.jpg", w: 1400, h: 1000 },
  { id: "1504754524776-8f4f37790ca0", file: "gallery-dawn.jpg", w: 1400, h: 1000 },
  { id: "1414235077428-338989a2e8c0", file: "gallery-table.jpg", w: 1400, h: 1000 },
  { id: "1452195100486-9cc805987862", file: "menu-cokelek.jpg", w: 800, h: 640 },
  { id: "1504674900247-0877df9cc836", file: "menu-tereyagi.jpg", w: 800, h: 640 },
  { id: "1471943311424-646960669fbc", file: "menu-kavut.jpg", w: 800, h: 640 },
  { id: "1549931319-a545dcf3bc73", file: "menu-corek.jpg", w: 800, h: 640 },
  { id: "1466637574441-749b8f19452f", file: "menu-cacik.jpg", w: 800, h: 640 },
  { id: "1494790108377-be9c29b29330", file: "avatar-1.jpg", w: 200, h: 200, sq: true },
  { id: "1500648767791-00dcc994a43e", file: "avatar-2.jpg", w: 200, h: 200, sq: true },
  { id: "1438761681033-6461ffad8d80", file: "avatar-3.jpg", w: 200, h: 200, sq: true },
  { id: "1507003211169-0a1dd7228f2d", file: "avatar-4.jpg", w: 200, h: 200, sq: true },
  { id: "1544005313-94ddf0286df2", file: "avatar-5.jpg", w: 200, h: 200, sq: true },
];

function srcUrl({ id, w, h }) {
  const p = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(w * 2), // 2x source → crisp after sharp downscale
    h: String(h * 2),
    q: "80",
  });
  return `https://images.unsplash.com/photo-${id}?${p.toString()}`;
}

async function main() {
  let total = 0;
  for (const a of ASSETS) {
    const res = await fetch(srcUrl(a));
    if (!res.ok) throw new Error(`fetch ${a.id} → ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const out = path.join(OUT, a.file);
    await sharp(buf)
      .resize(a.w, a.h, { fit: "cover", position: a.sq ? "centre" : "entropy" })
      .jpeg({ quality: 72, mozjpeg: true })
      .toFile(out);
    const kb = (fs.statSync(out).size / 1024) | 0;
    total += kb;
    console.log(`  ${a.file.padEnd(22)} ${kb}KB`);
  }
  console.log(`\n${ASSETS.length} images, ${total}KB total`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
