// Central registry of imagery.
// Every entry is now a LOCAL file in /public/images — the site is fully
// self-hosted with ZERO external image dependencies (commercially-licensed
// photos optimized into the repo — see CREDITS.md). The `unsplash()` helper
// remains as a pass-through + sizing shim so an Unsplash photo id can still be
// dropped in during prototyping (it builds the URL; needs the next.config
// remotePattern).
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
  ingredientButter: "/images/menu-tereyaginda-bal.jpg", // village butter & honey (real)
  ingredientWalnut: "/images/walnut.jpg", // local — see CREDITS.md
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
  galleryFull: "/images/gallery-spread.jpg", // local — see CREDITS.md
  galleryDawn: "/images/gallery-dawn.jpg", // local — see CREDITS.md
  galleryLake: "/images/lake-van.jpg", // REAL
  galleryChurch: "/images/akhtamar-church.jpg", // REAL
  galleryPomegranate: "/images/pomegranate.jpg",
  galleryWalnut: "/images/walnut.jpg", // local — see CREDITS.md
  galleryTea: "/images/samovar-tea.jpg",
  galleryBread: "/images/tandir-bread.jpg",
  galleryEggs: "/images/eggs-sucuk.jpg",
  galleryTable: "/images/gallery-table.jpg", // local — see CREDITS.md
  galleryLakeWide: "/images/lake-island.jpg", // REAL

  // Menu items
  menuOtluPeynir: "/images/plate-otlu-peynir.jpg",
  menuCokelek: "/images/menu-cokelek.jpg", // local — see CREDITS.md
  menuTereyagi: "/images/bowl-bal-kaymak.jpg", // village dairy (real)
  menuBalKaymak: "/images/bowl-bal-kaymak.jpg",
  menuCicekBali: "/images/jar-honey.jpg",
  menuMurtuga: "/images/jar-murtuga.jpg",
  menuKavut: "/images/jar-murtuga.jpg", // kavut ≈ murtuga (roasted flour) — real
  menuSucuk: "/images/eggs-sucuk.jpg",
  menuMenemen: "/images/menemen.jpg",
  menuTandir: "/images/tandir-bread.jpg",
  menuCorek: "/images/menu-corek.jpg", // local — see CREDITS.md
  menuCacik: "/images/menu-ayran.jpg", // yoghurt (real)
  menuCay: "/images/samovar-tea.jpg",

  // Expanded menu — real dish photos sourced to /public/images (see CREDITS.md).
  // Each file is guaranteed to exist (faithful download or nearest-dish fallback).
  menuKasarPeyniri: "/images/menu-kasar-peyniri.jpg",
  menuTereyagindaBal: "/images/menu-tereyaginda-bal.jpg",
  menuTahinPekmez: "/images/menu-tahin-pekmez.jpg",
  menuAcuka: "/images/menu-acuka.jpg",
  menuPastirmaliYumurta: "/images/menu-pastirmali-yumurta.jpg",
  menuKavurmaliYumurta: "/images/menu-kavurmali-yumurta.jpg",
  menuCilbir: "/images/menu-cilbir.jpg",
  menuSigaraBoregi: "/images/menu-sigara-boregi.jpg",
  menuSuBoregi: "/images/menu-su-boregi.jpg",
  menuGozleme: "/images/menu-gozleme.jpg",
  menuKaymakliKayisi: "/images/menu-kaymakli-kayisi.jpg",
  menuKatmer: "/images/menu-katmer.jpg",
  menuKunefe: "/images/menu-kunefe.jpg",
  menuTurkKahvesi: "/images/menu-turk-kahvesi.jpg",
  menuAyran: "/images/menu-ayran.jpg",
  menuSalep: "/images/menu-salep.jpg",

  // Testimonial avatars — self-hosted, optimized (see CREDITS.md)
  avatar1: "/images/avatar-1.jpg",
  avatar2: "/images/avatar-2.jpg",
  avatar3: "/images/avatar-3.jpg",
  avatar4: "/images/avatar-4.jpg",
  avatar5: "/images/avatar-5.jpg",
} as const;
