"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Check, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/i18n/LanguageProvider";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  // Locale is now the route — switching is a NAVIGATION to the same path under
  // the chosen locale (e.g. /en/about → /tr/about), plus a cookie so the proxy
  // remembers the choice for future locale-less visits.
  function switchTo(next: Locale) {
    if (next === locale) return;
    // eslint-disable-next-line react-hooks/immutability -- legitimate side effect in a click handler: remember the locale for the proxy on future locale-less visits.
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
    const segments = pathname.split("/");
    segments[1] = next; // swap the leading locale segment
    const target = segments.join("/") || `/${next}`;
    startTransition(() => router.push(target));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`${t.common.language}: ${localeMeta[locale].native}`}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-cream/70 px-3 py-2 text-sm font-medium text-ink/80 backdrop-blur-sm transition-colors hover:border-ink/25 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral",
            className,
          )}
        >
          <Globe className="size-4" />
          <span className={cn("hidden sm:inline", locale === "hy" && "font-armenian-sans")}>
            {localeMeta[locale].native}
          </span>
          <span className="uppercase sm:hidden">{locale}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44 rounded-2xl">
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onSelect={() => switchTo(l)}
            className="cursor-pointer justify-between gap-4 rounded-xl"
          >
            <span className={cn(l === "hy" && "font-armenian-sans")}>
              {localeMeta[l].native}
            </span>
            {l === locale ? (
              <Check className="size-4 text-coral-deep" aria-hidden />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
