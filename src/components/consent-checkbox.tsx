"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ConsentCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Consent sentence containing a "{link}" placeholder for the policy link. */
  text: string;
  linkLabel: string;
  href?: string;
  error?: string;
  /** Tone for the label text (e.g. on a dark band). */
  className?: string;
  linkClassName?: string;
  /** Accent colour for the box (default coral). */
  inputClassName?: string;
  /** Tone for the error text (default pomegranate). */
  errorClassName?: string;
}

/**
 * Accessible KVKK consent checkbox shared by the reservation + newsletter
 * forms. Native <input type=checkbox> (fully keyboard-operable), a label that
 * splits the localized sentence around `{link}` to insert the policy link, and
 * an error region wired via aria-describedby.
 */
export function ConsentCheckbox({
  id,
  checked,
  onChange,
  text,
  linkLabel,
  href = "/gizlilik",
  error,
  className,
  linkClassName,
  inputClassName,
  errorClassName,
}: ConsentCheckboxProps) {
  const [before, after = ""] = text.split("{link}");
  const errId = `${id}-err`;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={cn(
          "flex items-start gap-2.5 text-sm leading-snug text-brown-700",
          className,
        )}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
          className={cn(
            "mt-0.5 size-4 shrink-0 cursor-pointer rounded accent-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral",
            inputClassName,
          )}
        />
        <span>
          {before}
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "underline underline-offset-2 transition-colors hover:text-coral-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral",
              linkClassName,
            )}
          >
            {linkLabel}
          </Link>
          {after}
        </span>
      </label>
      {error ? (
        <p id={errId} className={cn("pl-6 text-sm text-pomegranate", errorClassName)}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
