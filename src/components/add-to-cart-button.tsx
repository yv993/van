"use client";

import { useRef, useState } from "react";
import { Check, Plus } from "lucide-react";
import { toast } from "sonner";
import { useCart, type CartLine } from "@/lib/cart";
import { useT } from "@/i18n/LanguageProvider";
import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  item: Omit<CartLine, "qty">;
  className?: string;
  /** open the cart drawer after adding */
  openOnAdd?: boolean;
}

export function AddToCartButton({
  item,
  className,
  openOnAdd = true,
}: AddToCartButtonProps) {
  const cart = useCart();
  const t = useT();
  const [added, setAdded] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleAdd() {
    cart.add(item);
    toast.success(`${item.name} ${t.common.added}`);
    if (openOnAdd) cart.open();
    setAdded(true);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setAdded(false), 1300);
  }

  return (
    <Magnetic strength={0.3}>
      <button
        type="button"
        onClick={handleAdd}
        aria-label={`${t.common.add} — ${item.name}`}
        className={cn(
          "group/add inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-cream transition-colors duration-300 hover:bg-coral-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-deep",
          className,
        )}
      >
        <span className="relative grid size-4 place-items-center overflow-hidden">
          <Check
            className={cn(
              "absolute size-4 transition-all duration-300",
              added ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          />
          <Plus
            className={cn(
              "size-4 transition-all duration-300 group-hover/add:rotate-90",
              added ? "-translate-y-4 opacity-0" : "translate-y-0 opacity-100",
            )}
          />
        </span>
        {t.common.add}
      </button>
    </Magnetic>
  );
}
