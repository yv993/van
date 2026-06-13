// Site-wide constants — now derived from the single brand config so a new
// client only edits src/config/brand.ts (see TEMPLATE.md). These re-exports
// keep the existing import sites (SITE_URL / SITE_NAME / SOCIALS) unchanged.
import { brand } from "@/config/brand";

export { brand };

export const SITE_URL = brand.url;
export const SITE_NAME = brand.name;

/** Section anchor ids used by the nav + smooth scroll (structural, not brand). */
export const SECTION = {
  hero: "hero",
  shop: "shop",
  story: "story",
  menu: "menu",
  heritage: "heritage",
  gallery: "gallery",
  visit: "visit",
} as const;

export const SOCIALS = brand.socials;
