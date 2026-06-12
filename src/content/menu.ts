import { IMG } from "./images";

// Invariant menu data. The Turkish dish name + price live here (always shown);
// the localized descriptive name + description live in the dictionaries, keyed
// by `id`. The optional `hy` term is shown only in the Western-Armenian locale.

export type MenuCategoryId =
  | "cheese"
  | "honey"
  | "spoon"
  | "hot"
  | "bread"
  | "tea";

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
}

export const menuCategoryOrder: MenuCategoryId[] = [
  "cheese",
  "honey",
  "spoon",
  "hot",
  "bread",
  "tea",
];

export const menuItems: MenuItem[] = [
  {
    id: "otlu-peynir",
    category: "cheese",
    tr: "Otlu peynir",
    hy: "panir · պանիր",
    price: 90,
    image: IMG.menuOtluPeynir,
    signature: true,
  },
  {
    id: "cokelek",
    category: "cheese",
    tr: "Çökelek",
    price: 70,
    image: IMG.menuCokelek,
  },
  {
    id: "van-tereyagi",
    category: "cheese",
    tr: "Van tereyağı",
    price: 80,
    image: IMG.menuTereyagi,
  },
  {
    id: "bal-kaymak",
    category: "honey",
    tr: "Bal-kaymak",
    price: 140,
    image: IMG.menuBalKaymak,
    signature: true,
  },
  {
    id: "van-cicek-bali",
    category: "honey",
    tr: "Van çiçek balı",
    price: 120,
    image: IMG.menuCicekBali,
  },
  {
    id: "murtuga",
    category: "spoon",
    tr: "Murtuğa",
    price: 90,
    image: IMG.menuMurtuga,
  },
  {
    id: "kavut",
    category: "spoon",
    tr: "Kavut",
    price: 80,
    image: IMG.menuKavut,
  },
  {
    id: "cacik",
    category: "spoon",
    tr: "Cacık",
    hy: "matsun · մածուն",
    price: 60,
    image: IMG.menuCacik,
  },
  {
    id: "sucuklu-yumurta",
    category: "hot",
    tr: "Sucuklu yumurta",
    hy: "sujukh · սուջուխ",
    price: 130,
    image: IMG.menuSucuk,
  },
  {
    id: "menemen",
    category: "hot",
    tr: "Menemen",
    price: 110,
    image: IMG.menuMenemen,
  },
  {
    id: "tandir-ekmegi",
    category: "bread",
    tr: "Tandır ekmeği",
    price: 40,
    image: IMG.menuTandir,
  },
  {
    id: "corek-pogaca",
    category: "bread",
    tr: "Çörek / poğaça",
    hy: "choreg · չորեկ",
    price: 60,
    image: IMG.menuCorek,
  },
  {
    id: "semaver-cayi",
    category: "tea",
    tr: "Semaver çayı",
    price: 25,
    image: IMG.menuCay,
  },
];
