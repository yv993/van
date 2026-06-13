import "server-only";

// Real Google reviews — fetched ONLY when GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID
// are set, else returns null and the site shows its curated testimonials.
//
// Google TOS notes (enforced by the UI in testimonials.tsx):
//  - You MUST display "Reviews from Google" attribution wherever reviews show.
//  - You must NOT reorder or modify the review content.
//  - The Place Details endpoint returns at most 5 reviews.
//  - Do NOT cache reviews long-term — we revalidate every 6 hours.

export interface GoogleReview {
  author: string;
  profilePhoto: string;
  rating: number;
  relativeTime: string;
  text: string;
  url: string;
}

export interface GoogleReviews {
  rating: number;
  total: number;
  url: string; // Google Maps URL for "Read all reviews on Google"
  reviews: GoogleReview[];
}

interface PlacesReview {
  author_name?: string;
  author_url?: string;
  profile_photo_url?: string;
  rating?: number;
  relative_time_description?: string;
  text?: string;
}

export async function getGoogleReviews(): Promise<GoogleReviews | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;

  try {
    const fields = "rating,user_ratings_total,reviews,url";
    const endpoint =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${encodeURIComponent(placeId)}&fields=${fields}` +
      `&reviews_sort=newest&key=${key}`;
    // 6h revalidate — fresh enough, and respects Google's no-long-term-cache rule.
    const res = await fetch(endpoint, { next: { revalidate: 21600 } });
    if (!res.ok) return null;

    const data: {
      status?: string;
      result?: {
        rating?: number;
        user_ratings_total?: number;
        url?: string;
        reviews?: PlacesReview[];
      };
    } = await res.json();

    if (data.status !== "OK" || !data.result) return null;
    const r = data.result;

    // Endpoint returns ≤5; keep Google's order (do not re-sort/modify).
    const reviews: GoogleReview[] = (r.reviews ?? []).slice(0, 5).map((rv) => ({
      author: rv.author_name ?? "Google user",
      profilePhoto: rv.profile_photo_url ?? "",
      rating: rv.rating ?? 5,
      relativeTime: rv.relative_time_description ?? "",
      text: rv.text ?? "",
      url: rv.author_url ?? r.url ?? "",
    }));
    if (reviews.length === 0) return null;

    return {
      rating: r.rating ?? 0,
      total: r.user_ratings_total ?? 0,
      url:
        r.url ??
        `https://www.google.com/maps/search/?api=1&query_place_id=${encodeURIComponent(placeId)}`,
      reviews,
    };
  } catch {
    return null;
  }
}
