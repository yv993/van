"use client";

import { Check, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/i18n/LanguageProvider";
import { locales, localeMeta } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={t.common.language}
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
            onSelect={() => setLocale(l)}
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
