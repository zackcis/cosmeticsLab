import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { useDialog } from "../hooks/useDialog.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { formatCount, formatPrice } from "../utils/format.js";
import { buildOrderMessage, whatsappHref } from "../utils/whatsapp.js";
import Photo from "./Photo.jsx";
import QuantitySelector from "./QuantitySelector.jsx";
import WhatsAppLink from "./WhatsAppLink.jsx";

const emptyCustomer = { name: "", city: "", notes: "" };

export default function CartDrawer() {
  const panelRef = useRef(null);
  const {
    lines,
    count,
    subtotal,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeLine,
    placeOrder,
  } = useCart();
  const { lang, dir, t } = useLanguage();
  const [customer, setCustomer] = useState(emptyCustomer);
  const reduce = useReducedMotion();
  const offscreen = dir === "rtl" ? "-100%" : "100%";
  const orderHref = whatsappHref(buildOrderMessage(lines, customer, lang));

  useDialog(cartOpen, panelRef, () => setCartOpen(false));

  function onSubmit(event) {
    event.preventDefault();
    if (lines.length === 0) return;
    placeOrder(lines, customer);
  }

  return (
    <AnimatePresence>
      {cartOpen ? (
    <div className="fixed inset-0 z-50">
      <motion.button
        type="button"
        className="absolute inset-0 bg-espresso/45"
        aria-label={t.closeCart}
        onClick={() => setCartOpen(false)}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        tabIndex={-1}
        className="absolute inset-y-0 end-0 flex w-full flex-col bg-paper outline-none sm:max-w-lg"
        initial={reduce ? false : { x: offscreen }}
        animate={{ x: 0 }}
        exit={reduce ? { opacity: 0 } : { x: offscreen }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <h2 id="cart-title" className="font-serif text-3xl leading-none">
              {t.cartTitle}
            </h2>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-sage">{formatCount(count, lang)}</p>
          </div>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center"
            onClick={() => setCartOpen(false)}
            aria-label={t.closeCart}
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center px-6">
            <p className="font-serif text-3xl leading-snug">{t.cartEmpty}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-sage">{t.cartEmptyHint}</p>
            <a
              href="#boutique"
              className="mt-8 inline-flex min-h-12 items-center bg-espresso px-6 text-[0.75rem] uppercase tracking-[0.16em] text-ivory"
              onClick={() => setCartOpen(false)}
            >
              {t.continueShopping}
            </a>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto">
            <ul className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">
              {lines.map((line) => (
                <li key={line.key} className="border border-line bg-ivory p-3">
                  <div className="flex gap-3">
                    <div className="h-28 w-24 shrink-0 bg-rose/20 sm:h-32 sm:w-28">
                      <Photo
                        src={line.image}
                        alt=""
                        className="h-full w-full object-cover"
                        width={224}
                        height={280}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-2xl leading-snug">{line.name}</p>
                      {line.variantLabel ? (
                        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-sage">
                          {line.variantLabel}
                        </p>
                      ) : null}
                      <p className="mt-2 text-lg font-semibold">{formatPrice(line.lineTotal, lang)}</p>
                      <p className="mt-1 text-xs text-sage">
                        {line.quantity} × {formatPrice(line.unitPrice, lang)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <QuantitySelector
                      value={line.quantity}
                      min={1}
                      onChange={(quantity) => updateQuantity(line.key, quantity)}
                    />
                    <button
                      type="button"
                      className="min-h-12 px-2 text-xs uppercase tracking-[0.14em] text-espresso/70"
                      onClick={() => removeLine(line.key)}
                    >
                      {t.remove}
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 px-4 pb-4 sm:px-5">
                <label className="block text-sm">
                  <span className="text-[0.72rem] uppercase tracking-[0.14em] text-sage">
                    {t.nameLabel}
                  </span>
                  <input
                    value={customer.name}
                    onChange={(event) => setCustomer((current) => ({ ...current, name: event.target.value }))}
                    className="mt-1 w-full border-b border-line bg-transparent py-2 outline-none"
                    autoComplete="name"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-[0.72rem] uppercase tracking-[0.14em] text-sage">
                    {t.cityLabel}
                  </span>
                  <input
                    value={customer.city}
                    onChange={(event) => setCustomer((current) => ({ ...current, city: event.target.value }))}
                    className="mt-1 w-full border-b border-line bg-transparent py-2 outline-none"
                    autoComplete="address-level2"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-[0.72rem] uppercase tracking-[0.14em] text-sage">
                    {t.notesLabel}
                  </span>
                  <textarea
                    value={customer.notes}
                    onChange={(event) => setCustomer((current) => ({ ...current, notes: event.target.value }))}
                    rows={2}
                    className="mt-1 w-full resize-none border-b border-line bg-transparent py-2 outline-none"
                  />
                </label>
              </div>
            </div>

            <div className="border-t border-line px-4 py-4 sm:px-5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[0.72rem] uppercase tracking-[0.16em] text-sage">{t.subtotal}</span>
                <span className="font-serif text-3xl font-semibold">{formatPrice(subtotal, lang)}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-sage">{t.subtotalNote}</p>

              <WhatsAppLink
                href={orderHref}
                onFallback={onSubmit}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center bg-espresso px-5 text-[0.75rem] uppercase tracking-[0.16em] text-ivory"
              >
                {t.orderViaWhatsapp}
              </WhatsAppLink>
              <button
                type="button"
                className="mt-3 inline-flex min-h-11 w-full items-center justify-center text-[0.75rem] uppercase tracking-[0.16em]"
                onClick={() => setCartOpen(false)}
              >
                {t.continueShopping}
              </button>
            </div>
          </form>
        )}
      </motion.aside>
    </div>
      ) : null}
    </AnimatePresence>
  );
}
