import { IMG } from "./images";

// Shop products. Price + image are invariant; the localized name, tagline,
// description and badge label live in the dictionaries, keyed by `id` /
// `badge`. Prices are in Turkish lira (₺).

export type ShopBadge = "raw" | "unpasteurized" | "herbLayered" | "curated";

export interface ShopProduct {
  id: string;
  price: number;
  image: string;
  badge: ShopBadge;
  featured?: boolean;
}

export const shopProducts: ShopProduct[] = [
  {
    id: "van-honey",
    price: 120,
    image: IMG.shopHoney,
    badge: "raw",
  },
  {
    id: "otlu-peynir-jar",
    price: 90,
    image: IMG.shopCheese,
    badge: "herbLayered",
  },
  {
    id: "murtuga-jar",
    price: 90,
    image: IMG.shopMurtuga,
    badge: "unpasteurized",
  },
  {
    id: "bal-kaymak-set",
    price: 160,
    image: IMG.shopBalKaymak,
    badge: "raw",
  },
  {
    id: "van-breakfast-box",
    price: 450,
    image: IMG.shopBox,
    badge: "curated",
    featured: true,
  },
];

export const CURRENCY = "₺";

export function formatPrice(value: number): string {
  return `${CURRENCY}${value}`;
}
