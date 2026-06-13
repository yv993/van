import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";

// Next 16 renamed `middleware` → `proxy` (same behaviour). Redirects any
// locale-less path to the visitor's locale: NEXT_LOCALE cookie → Accept-Language
// → default (en). The route is the source of truth; the cookie is just a hint.

function getLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (isLocale(cookie)) return cookie;

  const header = request.headers.get("accept-language");
  if (header) {
    for (const part of header.split(",")) {
      const code = part.split(";")[0]?.trim().slice(0, 2).toLowerCase();
      if (isLocale(code)) return code;
    }
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything EXCEPT the API, Next internals, and any path with a dot
  // (static assets, sitemap.xml, robots.txt, icon.svg, /images, /frames …).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
