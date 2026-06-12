import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { en } from "./en";
import { tr } from "./tr";
import { hy } from "./hy";
import { ru } from "./ru";

export const dictionaries: Record<Locale, Dictionary> = { en, tr, hy, ru };
