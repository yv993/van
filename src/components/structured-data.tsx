import { menuItems, menuCategoryOrder } from "@/content/menu";
import type { MenuItemId } from "@/i18n/types";
import { en } from "@/i18n/dictionaries/en";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { brand } from "@/config/brand";

// schema.org Restaurant / LocalBusiness + a full Menu, built from the menu data
// the page renders + the brand config (single source of truth). Rendered as a
// server component so the JSON-LD ships in the initial HTML for crawlers.
export function StructuredData() {
  const hasMenuSection = menuCategoryOrder
    .map((cat) => {
      const items = menuItems.filter((m) => m.category === cat);
      if (items.length === 0) return null;
      return {
        "@type": "MenuSection",
        name: en.menu.categories[cat],
        hasMenuItem: items.map((item) => {
          const copy = en.menu.items[item.id as MenuItemId];
          return {
            "@type": "MenuItem",
            name: copy.name,
            alternateName: item.tr,
            description: copy.desc,
            offers: {
              "@type": "Offer",
              price: item.price,
              priceCurrency: "TRY",
            },
          };
        }),
      };
    })
    .filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    name: SITE_NAME,
    description: en.meta.description,
    image: [`${SITE_URL}/images/og.jpg`],
    url: SITE_URL,
    telephone: brand.phoneTel,
    servesCuisine: ["Turkish", brand.cuisine],
    priceRange: brand.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: brand.address.street,
      addressLocality: brand.address.locality,
      addressRegion: brand.address.region,
      addressCountry: brand.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: brand.geo.lat,
      longitude: brand.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: brand.hours.days,
        opens: brand.hours.opens,
        closes: brand.hours.closes,
      },
    ],
    hasMenu: {
      "@type": "Menu",
      name: en.menu.title,
      hasMenuSection,
    },
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; escape the closing-tag
      // sequence just in case any copy ever contains it.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
