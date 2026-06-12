// Central registry of imagery.
// Entries that start with "/" are LOCAL files in /public/images (real,
// commercially-licensed photos downloaded for self-hosting — see CREDITS.md).
// The rest are Unsplash photo ids turned into URLs by `unsplash(id, w, h)`.
//
// TODO: swap for the client's real photos — drop a file in /public/images and
// point the slot at "/images/your-file.jpg" (it passes straight through).

export function unsplash(id: string, w = 1200, h?: number, q = 80): string {
  // Local assets (under /public) pass straight through — next/image serves them
  // without a remotePatterns entry. Lets us mix real local photos with Unsplash.
  if (id.startsWith("/")) return id;
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(w),
    q: String(q),
  });
  if (h) params.set("h", String(h));
  return `https://images.unsplash.com/photo-${id}?${params.toString()}`;
}

export const IMG = {
  // Hero + signature thumbnails
  heroSpread: "/images/hero-spread.jpg", // local — hero video poster source
  heroThumbCheese: "/images/plate-otlu-peynir.jpg",
  heroThumbHoneyCream: "/images/bowl-bal-kaymak.jpg",
  heroThumbHoney: "/images/jar-honey.jpg",

  // Shop — real local product/food photos
  shopHoney: "/images/jar-honey.jpg",
  shopCheese: "/images/plate-otlu-peynir.jpg",
  shopMurtuga: "/images/jar-murtuga.jpg",
  shopBalKaymak: "/images/bowl-bal-kaymak.jpg",
  shopBox: "/images/box-breakfast.jpg",

  // Honest ingredients
  ingredientsHero: "/images/macro-honey.jpg",
  ingredientCheese: "/images/plate-otlu-peynir.jpg",
  ingredientHerbs: "/images/herbs.jpg",
  ingredientButter: "1486297678162-eb2a19b0a32d", // Unsplash placeholder
  ingredientWalnut: "1508061253366-f7da158b6d46", // Unsplash placeholder
  ingredientHoney: "/images/jar-honey.jpg",

  // Zero tricks feature cards
  zeroLake: "/images/lake-van.jpg", // REAL: Lake Van (CC BY 2.5) — see CREDITS.md
  zeroHoney: "/images/macro-honey.jpg",
  zeroHerbs: "/images/herbs.jpg",

  // Ritual (toast stack)
  ritualStack: "/images/tandir-bread.jpg",
  ritualSide: "/images/bowl-bal-kaymak.jpg",

  // Heritage — REAL licensed landmark photos (see CREDITS.md)
  heritageLake: "/images/lake-van.jpg",
  heritageChurch: "/images/akhtamar-church.jpg",

  // Gallery + compare slider
  galleryFull: "1498837167922-ddd27525d352", // Unsplash placeholder
  galleryDawn: "1504754524776-8f4f37790ca0", // Unsplash placeholder
  galleryLake: "/images/lake-van.jpg", // REAL
  galleryChurch: "/images/akhtamar-church.jpg", // REAL
  galleryPomegranate: "/images/pomegranate.jpg",
  galleryWalnut: "1508061253366-f7da158b6d46", // Unsplash placeholder
  galleryTea: "/images/samovar-tea.jpg",
  galleryBread: "/images/tandir-bread.jpg",
  galleryEggs: "/images/eggs-sucuk.jpg",
  galleryTable: "1414235077428-338989a2e8c0", // Unsplash placeholder
  galleryLakeWide: "/images/lake-island.jpg", // REAL

  // Menu items
  menuOtluPeynir: "/images/plate-otlu-peynir.jpg",
  menuCokelek: "1452195100486-9cc805987862", // Unsplash placeholder
  menuTereyagi: "1504674900247-0877df9cc836", // Unsplash placeholder
  menuBalKaymak: "/images/bowl-bal-kaymak.jpg",
  menuCicekBali: "/images/jar-honey.jpg",
  menuMurtuga: "/images/jar-murtuga.jpg",
  menuKavut: "1471943311424-646960669fbc", // Unsplash placeholder
  menuSucuk: "/images/eggs-sucuk.jpg",
  menuMenemen: "/images/menemen.jpg",
  menuTandir: "/images/tandir-bread.jpg",
  menuCorek: "1549931319-a545dcf3bc73", // Unsplash placeholder
  menuCacik: "1466637574441-749b8f19452f", // Unsplash placeholder
  menuCay: "/images/samovar-tea.jpg",

  // Testimonial avatars — Unsplash placeholders
  avatar1: "1494790108377-be9c29b29330",
  avatar2: "1500648767791-00dcc994a43e",
  avatar3: "1438761681033-6461ffad8d80",
  avatar4: "1507003211169-0a1dd7228f2d",
  avatar5: "1544005313-94ddf0286df2",
} as const;
