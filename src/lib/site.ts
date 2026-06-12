// Site-wide constants.
// TODO: set the real production domain before launch.
export const SITE_URL = "https://akdamar-kahvalti.example";

export const SITE_NAME = "Akdamar Kahvaltı Evi";

/** Section anchor ids used by the nav + smooth scroll. */
export const SECTION = {
  hero: "hero",
  shop: "shop",
  story: "story",
  menu: "menu",
  heritage: "heritage",
  gallery: "gallery",
  visit: "visit",
} as const;

export const SOCIALS = [
  { id: "instagram", href: "https://instagram.com" },
  { id: "facebook", href: "https://facebook.com" },
  { id: "youtube", href: "https://youtube.com" },
] as const;
