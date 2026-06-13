import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

// Web app manifest (PWA / Add to Home Screen). Driven by the brand config.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: brand.shortName,
    description: `${brand.name} — ${brand.cuisine} on the shores of Lake ${brand.town}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#fbf5ea", // --color-paper
    theme_color: brand.themeColor,
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
