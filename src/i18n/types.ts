import type { MenuCategoryId } from "@/content/menu";
import type { ShopBadge } from "@/content/shop";

// Id unions — every locale dictionary must provide copy for each id (enforced
// by the Record types below). Keep in sync with the content data files.
export type MenuItemId =
  | "otlu-peynir"
  | "cokelek"
  | "van-tereyagi"
  | "bal-kaymak"
  | "van-cicek-bali"
  | "murtuga"
  | "kavut"
  | "cacik"
  | "sucuklu-yumurta"
  | "menemen"
  | "tandir-ekmegi"
  | "corek-pogaca"
  | "semaver-cayi";

export type ShopProductId =
  | "van-honey"
  | "otlu-peynir-jar"
  | "murtuga-jar"
  | "bal-kaymak-set"
  | "van-breakfast-box";

export type TestimonialId = "araxie" | "mehmet" | "lori" | "sevda" | "anna";

export interface NamedDesc {
  name: string;
  desc: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    ogAlt: string;
  };
  common: {
    brand: string;
    brandTagline: string;
    reserve: string;
    seeMenu: string;
    add: string;
    added: string; // toast: "{name} added"
    skipToContent: string;
    language: string;
    toggleTheme: string;
    close: string;
  };
  nav: {
    menu: string;
    shop: string;
    story: string;
    heritage: string;
    visit: string;
    openMenu: string;
    cart: string;
    primary: string;
    mobileNav: string;
  };
  hero: {
    eyebrowArmenian: string; // "Բարի լույս"
    eyebrowTurkish: string; // "Günaydın" — empty when the gloss is already Turkish
    eyebrowGloss: string; // "good morning"
    titleLines: string[]; // ["THE MORNING THAT", "FED EMPIRES"]
    subtitle: string;
    badges: string[]; // 3 badges
    signature: string; // "our signature"
    scroll: string;
  };
  stats: {
    eyebrow: string;
    items: { value: number; suffix: string; label: string }[];
  };
  shop: {
    eyebrow: string;
    title: string;
    subtitle: string;
    badges: Record<ShopBadge, string>;
    featuredLabel: string;
    products: Record<ShopProductId, NamedDesc & { tagline: string }>;
  };
  ingredients: {
    eyebrow: string;
    title: string;
    list: { name: string; note: string }[];
    promiseTitle: string;
    promiseBody: string;
    heroCaption: string;
  };
  zeroTricks: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: { title: string; desc: string }[];
  };
  ritual: {
    eyebrow: string;
    title: string;
    body: string;
    steps: string[];
  };
  heritage: {
    eyebrow: string;
    title: string;
    intro: string;
    panels: { title: string; body: string }[];
    signoff: string;
  };
  menu: {
    eyebrow: string;
    title: string;
    subtitle: string;
    all: string;
    signature: string;
    categories: Record<MenuCategoryId, string>;
    items: Record<MenuItemId, NamedDesc>;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    subtitle: string;
    featuredIn: string;
    featuredLogos: string[];
    starsLabel: string; // "{rating} out of 5"
    items: Record<TestimonialId, { quote: string; city: string; role: string }>;
  };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    compareHint: string;
    beforeLabel: string;
    afterLabel: string;
    alt: Record<string, string>;
  };
  visit: {
    eyebrow: string;
    title: string;
    subtitle: string;
    hoursLabel: string;
    hoursValue: string;
    hoursDetail: string;
    addressLabel: string;
    addressValue: string;
    addressDetail: string;
    phoneLabel: string;
    phoneValue: string;
    mapPlaceholder: string;
    form: {
      title: string;
      name: string;
      namePlaceholder: string;
      date: string;
      time: string;
      guests: string;
      guest: string; // singular for "1 guest"
      guestsPlural: string;
      submit: string;
      success: string; // uses {name} {guests} {date} {time}
      errors: {
        name: string;
        date: string;
        datePast: string;
        time: string;
        guests: string;
      };
    };
  };
  closing: {
    titleLines: string[];
    subtitle: string;
    emailPlaceholder: string;
    button: string;
    success: string;
    invalidEmail: string;
  };
  footer: {
    tagline: string;
    exploreTitle: string;
    languagesTitle: string;
    followTitle: string;
    signoffArmenian: string; // "Բարի ախորժակ"
    signoffTurkish: string; // "Afiyet olsun" — empty when the gloss is already Turkish
    signoffGloss: string; // "enjoy your meal"
    rights: string; // uses {year}
    credit: string;
  };
  cart: {
    title: string;
    empty: string;
    emptyHint: string;
    subtotal: string;
    checkout: string;
    checkoutNote: string;
    remove: string;
    increase: string;
    decrease: string;
    itemCount: string; // "{count} item(s)"
  };
  chapterLabels: {
    arrival: string;
    table: string;
    ritual: string;
    heritage: string;
    visit: string;
  };
  worldMap: {
    eyebrow: string;
    title: string;
    body: string;
    markerLabel: string;
    alt: string;
    card1: { title: string; text: string };
    card2: { title: string; text: string };
  };
}
