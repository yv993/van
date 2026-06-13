"use client";

import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { legalFor } from "@/content/legal";

/**
 * Renders a KVKK legal document (privacy / cookies) in the visitor's current
 * locale. TR is operative; EN is the courtesy translation; HY/RU show EN + a
 * note. Standalone readable page (its own slim header) — dark-mode safe via the
 * shared theme.
 */
export function LegalArticle({ doc }: { doc: "privacy" | "cookies" }) {
  const { t, locale } = useLanguage();
  const { content, showNote } = legalFor(locale);
  const d = content[doc];
  const other =
    doc === "privacy"
      ? { href: `/${locale}/cerez-politikasi`, label: t.footer.legal.cookies }
      : { href: `/${locale}/gizlilik`, label: t.footer.legal.privacy };
  const home = `/${locale}`;

  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            href={home}
            className="inline-flex items-center gap-2 rounded-sm text-sm text-brown-700 transition-colors hover:text-coral-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
          >
            <ArrowLeft className="size-4" aria-hidden />
            <span className="font-display font-semibold text-ink">
              {t.common.brand}
            </span>
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">
          {d.title}
        </h1>
        <p className="mt-2 text-sm text-brown-500">{d.updated}</p>

        {/* TEMPLATE notice — this text must be reviewed by the business + a lawyer. */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-honey/50 bg-honey-soft/50 p-4 text-sm leading-relaxed text-brown-700">
          <AlertTriangle
            className="mt-0.5 size-5 shrink-0 text-coral-deep"
            aria-hidden
          />
          <span>{d.templateNotice}</span>
        </div>
        {showNote ? (
          <p className="mt-3 text-sm text-brown-500">{t.footer.legal.note}</p>
        ) : null}

        {d.intro ? (
          <p className="mt-6 leading-relaxed text-pretty text-brown-700">
            {d.intro}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col gap-8">
          {d.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
                {s.heading}
              </h2>
              {s.paragraphs?.map((p, i) => (
                <p
                  key={i}
                  className="mt-3 leading-relaxed text-pretty text-brown-700"
                >
                  {p}
                </p>
              ))}
              {s.list ? (
                <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-brown-700 marker:text-coral-deep">
                  {s.list.map((li, i) => (
                    <li key={i} className="leading-relaxed">
                      {li}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-5 border-t border-border pt-6 text-sm">
          <Link
            href={other.href}
            className="font-medium text-coral-deep underline-offset-2 hover:underline"
          >
            {other.label}
          </Link>
          <Link href={home} className="text-brown-500 transition-colors hover:text-ink">
            ← {t.common.brand}
          </Link>
        </div>
      </article>
    </main>
  );
}
