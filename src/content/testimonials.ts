import { IMG } from "./images";

// PLACEHOLDER guest reviews — names, cities and quotes are invented for design
// purposes only. The quote, city and role are localized in the dictionaries
// (keyed by `id`); the name, avatar and rating are invariant.
// TODO: replace with the client's real, attributed reviews.

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number; // out of 5
}

export const testimonials: Testimonial[] = [
  { id: "araxie", name: "Araxie K.", avatar: IMG.avatar1, rating: 5 },
  { id: "mehmet", name: "Mehmet A.", avatar: IMG.avatar2, rating: 5 },
  { id: "lori", name: "Lori H.", avatar: IMG.avatar3, rating: 5 },
  { id: "sevda", name: "Sevda T.", avatar: IMG.avatar4, rating: 5 },
  { id: "anna", name: "Anna P.", avatar: IMG.avatar5, rating: 5 },
];
