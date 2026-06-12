"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CtaButton } from "@/components/ui/cta-button";
import { useCart } from "@/lib/cart";
import { useT } from "@/i18n/LanguageProvider";
import { interpolate } from "@/i18n/format";
import { formatPrice } from "@/content/shop";

export function CartDrawer() {
  const cart = useCart();
  const t = useT();

  return (
    <Sheet open={cart.isOpen} onOpenChange={cart.setOpen}>
      <SheetContent
        side="right"
        closeLabel={t.common.close}
        className="w-full gap-0 border-l border-border bg-cream p-0 sm:max-w-md"
      >
        <SheetHeader className="space-y-1 border-b border-border px-6 py-5 text-left">
          <SheetTitle className="font-display text-2xl tracking-tight text-ink">
            {t.cart.title}
          </SheetTitle>
          <SheetDescription className="text-sm text-brown-500">
            {interpolate(t.cart.itemCount, { count: cart.count })}
          </SheetDescription>
        </SheetHeader>

        {cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-honey-soft text-coral">
              <ShoppingBag className="size-7" />
            </span>
            <p className="font-display text-xl text-ink">{t.cart.empty}</p>
            <p className="max-w-[14rem] text-sm text-brown-500">
              {t.cart.emptyHint}
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <ul className="flex flex-col gap-5">
              {cart.lines.map((line) => (
                <li key={line.id} className="flex gap-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border border-border">
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-ink">{line.name}</p>
                      <button
                        type="button"
                        onClick={() => cart.remove(line.id)}
                        aria-label={`${t.cart.remove} — ${line.name}`}
                        className="text-ink/40 transition-colors hover:text-pomegranate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <p className="text-sm text-brown-500">
                      {formatPrice(line.price)}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="inline-flex items-center rounded-full border border-border bg-paper/50">
                        <button
                          type="button"
                          aria-label={t.cart.decrease}
                          onClick={() => cart.setQty(line.id, line.qty - 1)}
                          className="grid size-8 place-items-center rounded-full text-ink/70 transition-colors hover:text-coral focus-visible:outline-2 focus-visible:outline-coral"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm tabular-nums">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          aria-label={t.cart.increase}
                          onClick={() => cart.setQty(line.id, line.qty + 1)}
                          className="grid size-8 place-items-center rounded-full text-ink/70 transition-colors hover:text-coral focus-visible:outline-2 focus-visible:outline-coral"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <span className="font-medium tabular-nums text-ink">
                        {formatPrice(line.price * line.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {cart.lines.length > 0 ? (
          <SheetFooter className="gap-3 border-t border-border bg-paper/50 px-6 py-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-brown-700">{t.cart.subtotal}</span>
              <span className="font-display text-2xl tabular-nums text-ink">
                {formatPrice(cart.subtotal)}
              </span>
            </div>
            <CtaButton
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => toast.success(t.cart.checkoutNote)}
            >
              {t.cart.checkout}
            </CtaButton>
            <p className="text-center text-xs text-brown-500">
              {t.cart.checkoutNote}
            </p>
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
