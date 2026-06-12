import { IMG } from "./images";

// Gallery / bento imagery. `alt` is a dictionary key (gallery.alt[key]).
// `span` maps to grid placement classes on a 4-col bento.

export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  span: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "table",
    image: IMG.galleryTable,
    alt: "fullTable",
    span: "col-span-2 row-span-2",
  },
  { id: "lake", image: IMG.galleryLake, alt: "lake", span: "col-span-2" },
  { id: "church", image: IMG.galleryChurch, alt: "church", span: "col-span-1 row-span-2" },
  { id: "pomegranate", image: IMG.galleryPomegranate, alt: "pomegranate", span: "col-span-1" },
  { id: "tea", image: IMG.galleryTea, alt: "tea", span: "col-span-1" },
  { id: "bread", image: IMG.galleryBread, alt: "bread", span: "col-span-2" },
  { id: "walnut", image: IMG.galleryWalnut, alt: "walnut", span: "col-span-1" },
  { id: "eggs", image: IMG.galleryEggs, alt: "eggs", span: "col-span-1" },
  { id: "lakeWide", image: IMG.galleryLakeWide, alt: "lakeWide", span: "col-span-2" },
];

// Before/after comparison slider: dawn spread vs. the full table.
export const compareImages = {
  before: { image: IMG.galleryDawn, alt: "dawnSpread" },
  after: { image: IMG.galleryFull, alt: "fullSpread" },
};
