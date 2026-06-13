import { menuItems, menuCategoryOrder } from "@/content/menu";
import type { MenuItemId } from "@/i18n/types";
import { en } from "@/i18n/dictionaries/en";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// schema.org Restaurant / LocalBusiness + a full Menu, built from the same
// menu data the page renders (single source of truth). Rendered as a server
// component so the JSON-LD ships in the initial HTML for crawlers. English
// copy is used for the machine-readable names/descriptions.
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

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
    telephone: "+904320000000",
    servesCuisine: ["Turkish", "Anatolian breakfast"],
    priceRange: "₺₺",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kahvaltı Sokağı",
      addressLocality: "Van",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 38.5,
      longitude: 43.38,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAYS,
        opens: "06:00",
        closes: "14:00",
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
