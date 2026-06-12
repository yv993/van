"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useT } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

/**
 * Light/dark toggle, styled to match the nav's round icon buttons. Renders a
 * neutral placeholder until mounted — next-themes only knows the real theme
 * on the client, and rendering the wrong icon first would be a hydration
 * mismatch.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const t = useT();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard next-themes mounted gate (theme is unknowable on the server)
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={t.common.toggleTheme}
      title={t.common.toggleTheme}
      className={cn(
        "grid size-10 place-items-center rounded-full border border-ink/10 bg-cream/70 text-ink/80 transition-colors hover:border-ink/25 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral",
        className,
      )}
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
}
