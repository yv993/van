"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ShoppingBag } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CtaButton } from "@/components/ui/cta-button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { CartDrawer } from "@/components/cart-drawer";
import { useCart } from "@/lib/cart";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSmoothScroll } from "@/components/motion/smooth-scroll";
import { SECTION } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const { t, locale } = useLanguage();
  const cart = useCart();
  const { scrollTo } = useSmoothScroll();
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  const home = `/${locale}`;
  const isHome = pathname === home;

  // Section links scroll on the home page; from any other page they navigate
  // home with a hash (SmoothScroll scrolls to it on arrival).
  const sectionLinks = [
    { id: SECTION.menu, label: t.nav.menu },
    { id: SECTION.shop, label: t.nav.shop },
    { id: SECTION.story, label: t.nav.story },
    { id: SECTION.heritage, label: t.nav.heritage },
    { id: SECTION.visit, label: t.nav.visit },
  ];
  // Real routes.
  const pageLinks = [
    { href: `${home}/about`, label: t.nav.about },
    { href: `${home}/journal`, label: t.nav.journal },
    { href: `${home}/faq`, label: t.nav.faq },
  ];

  function goSection(id: string) {
    if (isHome) scrollTo(`#${id}`);
    else router.push(`${home}#${id}`);
  }
  function goHome() {
    if (isHome) scrollTo(0);
    else router.push(home);
  }
  function goMobileSection(id: string) {
    setMobileOpen(false);
    if (isHome) window.setTimeout(() => scrollTo(`#${id}`), 60);
    else router.push(`${home}#${id}`);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6",
          scrolled
            ? "my-2 rounded-full border border-border/80 bg-cream/85 py-2.5 shadow-soft backdrop-blur-md lg:mx-auto lg:max-w-6xl"
            : "my-0 border border-transparent py-4",
        )}
      >
        {/* Wordmark */}
        <button
          type="button"
          onClick={goHome}
          className="group flex items-center gap-2.5 rounded-full pr-2 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-coral-deep text-cream shadow-[0_8px_18px_-8px_rgba(176,84,13,0.8)]">
            <span className="font-display text-lg leading-none font-semibold">
              A
            </span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-semibold tracking-tight text-ink">
              {t.common.brand}
            </span>
            <span className="text-[0.62rem] font-medium tracking-wide text-brown-500 uppercase">
              {t.common.brandTagline}
            </span>
          </span>
        </button>

        {/* Desktop links */}
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label={t.nav.primary}
        >
          {sectionLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => goSection(link.id)}
              className="rounded-full px-3 py-2 text-sm font-medium text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
            >
              {link.label}
            </button>
          ))}
          {pageLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <ThemeToggle className="hidden sm:grid" />

          <button
            type="button"
            onClick={cart.open}
            aria-label={`${t.nav.cart} — ${cart.count}`}
            className="relative grid size-10 place-items-center rounded-full border border-ink/10 bg-cream/70 text-ink/80 transition-colors hover:border-ink/25 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
          >
            <ShoppingBag className="size-5" />
            {cart.count > 0 ? (
              <span className="absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full bg-coral-deep px-1 text-[0.65rem] font-semibold text-cream tabular-nums shadow-sm">
                {cart.count}
              </span>
            ) : null}
          </button>

          <CtaButton
            variant="primary"
            size="sm"
            className="hidden md:inline-flex"
            onClick={() => goSection(SECTION.visit)}
          >
            {t.common.reserve}
          </CtaButton>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label={t.nav.openMenu}
                className="grid size-10 place-items-center rounded-full border border-ink/10 bg-cream/70 text-ink/80 transition-colors hover:border-ink/25 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              closeLabel={t.common.close}
              className="w-full gap-0 border-l border-border bg-cream p-0 sm:max-w-xs"
            >
              <SheetHeader className="border-b border-border px-6 py-5 text-left">
                <SheetTitle className="font-display text-2xl tracking-tight text-ink">
                  {t.common.brand}
                </SheetTitle>
              </SheetHeader>
              <nav
                className="flex flex-col px-3 py-4"
                aria-label={t.nav.mobileNav}
              >
                {sectionLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => goMobileSection(link.id)}
                    className="rounded-2xl px-4 py-3.5 text-left font-display text-lg text-ink/85 transition-colors hover:bg-honey-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-coral"
                  >
                    {link.label}
                  </button>
                ))}
                {pageLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl px-4 py-3.5 text-left font-display text-lg text-ink/85 transition-colors hover:bg-honey-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-coral"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-4 border-t border-border px-6 py-6">
                <div className="flex items-center justify-between gap-3">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
                <CtaButton
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => goMobileSection(SECTION.visit)}
                >
                  {t.common.reserve}
                </CtaButton>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <CartDrawer />
    </header>
  );
}
