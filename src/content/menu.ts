import { IMG } from "./images";

// Invariant menu data. The Turkish dish name + price live here (always shown);
// the localized descriptive name + description live in the dictionaries, keyed
// by `id`. The optional `hy` term is shown only in the Western-Armenian locale.

export type MenuCategoryId =
  | "cheese"
  | "honey"
  | "spoon"
  | "hot"
  | "eggs"
  | "borek"
  | "bread"
  | "sweets"
  | "tea"
  | "drinks";

/** Dietary markers shown as pill badges and used by the tag filter. */
export type MenuTag = "vegetarian" | "contains-nuts" | "spicy" | "sweet";

export interface MenuItem {
  id: string;
  category: MenuCategoryId;
  /** Turkish dish name — always displayed, in every locale. */
  tr: string;
  /** Western-Armenian dish/term — shown only in the `hy` locale. */
  hy?: string;
  /** Price in Turkish lira (₺). */
  price: number;
  image: string;
  signature?: boolean;
  /** Dietary markers (vegetarian / contains-nuts / spicy / sweet). */
  tags?: MenuTag[];
}

export const menuCategoryOrder: MenuCategoryId[] = [
  "cheese",
  "honey",
  "spoon",
  "hot",
  "eggs",
  "borek",
  "bread",
  "sweets",
  "tea",
  "drinks",
];

export const menuItems: MenuItem[] = [
  // ── Cheeses & dairy ──────────────────────────────────────────────
  {
    id: "otlu-peynir",
    category: "cheese",
    tr: "Otlu peynir",
    hy: "panir · պանիր",
    price: 90,
    image: IMG.menuOtluPeynir,
    signature: true,
    tags: ["vegetarian"],
  },
  {
    id: "cokelek",
    category: "cheese",
    tr: "Çökelek",
    price: 70,
    image: IMG.menuCokelek,
    tags: ["vegetarian"],
  },
  {
    id: "van-tereyagi",
    category: "cheese",
    tr: "Van tereyağı",
    price: 80,
    image: IMG.menuTereyagi,
    tags: ["vegetarian"],
  },
  {
    id: "kasar-peyniri",
    category: "cheese",
    tr: "Kaşar peyniri",
    price: 75,
    image: IMG.menuKasarPeyniri,
    tags: ["vegetarian"],
  },
  // ── Honey & cream ────────────────────────────────────────────────
  {
    id: "bal-kaymak",
    category: "honey",
    tr: "Bal-kaymak",
    price: 140,
    image: IMG.menuBalKaymak,
    signature: true,
    tags: ["vegetarian", "sweet"],
  },
  {
    id: "van-cicek-bali",
    category: "honey",
    tr: "Van çiçek balı",
    price: 120,
    image: IMG.menuCicekBali,
    tags: ["vegetarian", "sweet"],
  },
  {
    id: "tereyaginda-bal",
    category: "honey",
    tr: "Tereyağında bal",
    price: 95,
    image: IMG.menuTereyagindaBal,
    tags: ["vegetarian", "sweet"],
  },
  // ── Spoon classics ───────────────────────────────────────────────
  {
    id: "murtuga",
    category: "spoon",
    tr: "Murtuğa",
    price: 90,
    image: IMG.menuMurtuga,
    tags: ["vegetarian"],
  },
  {
    id: "kavut",
    category: "spoon",
    tr: "Kavut",
    price: 80,
    image: IMG.menuKavut,
    tags: ["vegetarian", "sweet"],
  },
  {
    id: "cacik",
    category: "spoon",
    tr: "Cacık",
    hy: "matsun · մածուն",
    price: 60,
    image: IMG.menuCacik,
    tags: ["vegetarian"],
  },
  {
    id: "tahin-pekmez",
    category: "spoon",
    tr: "Tahin-pekmez",
    price: 55,
    image: IMG.menuTahinPekmez,
    tags: ["vegetarian", "sweet"],
  },
  {
    id: "acuka",
    category: "spoon",
    tr: "Acuka",
    price: 65,
    image: IMG.menuAcuka,
    tags: ["spicy", "contains-nuts", "vegetarian"],
  },
  // ── Hot ──────────────────────────────────────────────────────────
  {
    id: "sucuklu-yumurta",
    category: "hot",
    tr: "Sucuklu yumurta",
    hy: "sujukh · սուջուխ",
    price: 130,
    image: IMG.menuSucuk,
    tags: ["spicy"],
  },
  {
    id: "menemen",
    category: "hot",
    tr: "Menemen",
    price: 110,
    image: IMG.menuMenemen,
    tags: ["vegetarian"],
  },
  // ── Eggs ─────────────────────────────────────────────────────────
  {
    id: "pastirmali-yumurta",
    category: "eggs",
    tr: "Pastırmalı yumurta",
    hy: "basturma · բաստուրմա",
    price: 150,
    image: IMG.menuPastirmaliYumurta,
    signature: true,
  },
  {
    id: "kavurmali-yumurta",
    category: "eggs",
    tr: "Kavurmalı yumurta",
    price: 160,
    image: IMG.menuKavurmaliYumurta,
  },
  {
    id: "cilbir",
    category: "eggs",
    tr: "Çılbır",
    price: 120,
    image: IMG.menuCilbir,
    tags: ["vegetarian"],
  },
  // ── Pastries & böreks ────────────────────────────────────────────
  {
    id: "sigara-boregi",
    category: "borek",
    tr: "Sigara böreği",
    price: 90,
    image: IMG.menuSigaraBoregi,
    tags: ["vegetarian"],
  },
  {
    id: "su-boregi",
    category: "borek",
    tr: "Su böreği",
    price: 100,
    image: IMG.menuSuBoregi,
    tags: ["vegetarian"],
  },
  {
    id: "gozleme",
    category: "borek",
    tr: "Gözleme",
    price: 95,
    image: IMG.menuGozleme,
    tags: ["vegetarian"],
  },
  // ── Breads & pastry ──────────────────────────────────────────────
  {
    id: "tandir-ekmegi",
    category: "bread",
    tr: "Tandır ekmeği",
    price: 40,
    image: IMG.menuTandir,
    tags: ["vegetarian"],
  },
  {
    id: "corek-pogaca",
    category: "bread",
    tr: "Çörek / poğaça",
    hy: "choreg · չորեկ",
    price: 60,
    image: IMG.menuCorek,
    tags: ["vegetarian"],
  },
  // ── Sweets ───────────────────────────────────────────────────────
  {
    id: "kaymakli-kayisi",
    category: "sweets",
    tr: "Kaymaklı kayısı",
    hy: "tsiran · ծիրան",
    price: 110,
    image: IMG.menuKaymakliKayisi,
    signature: true,
    tags: ["sweet", "contains-nuts", "vegetarian"],
  },
  {
    id: "katmer",
    category: "sweets",
    tr: "Katmer",
    price: 120,
    image: IMG.menuKatmer,
    tags: ["sweet", "contains-nuts", "vegetarian"],
  },
  {
    id: "kunefe",
    category: "sweets",
    tr: "Künefe",
    price: 110,
    image: IMG.menuKunefe,
    tags: ["sweet", "vegetarian"],
  },
  // ── Tea ──────────────────────────────────────────────────────────
  {
    id: "semaver-cayi",
    category: "tea",
    tr: "Semaver çayı",
    price: 25,
    image: IMG.menuCay,
    tags: ["vegetarian"],
  },
  // ── Drinks ───────────────────────────────────────────────────────
  {
    id: "turk-kahvesi",
    category: "drinks",
    tr: "Türk kahvesi",
    hy: "soorj · սուրճ",
    price: 45,
    image: IMG.menuTurkKahvesi,
    tags: ["vegetarian"],
  },
  {
    id: "ayran",
    category: "drinks",
    tr: "Ayran",
    price: 30,
    image: IMG.menuAyran,
    tags: ["vegetarian"],
  },
  {
    id: "salep",
    category: "drinks",
    tr: "Salep",
    price: 50,
    image: IMG.menuSalep,
    tags: ["vegetarian", "sweet"],
  },
];
