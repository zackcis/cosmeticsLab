import { useEffect, useId, useRef, useState } from "react";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { useDialog } from "../hooks/useDialog.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { localizeProduct } from "../data/products.js";
import { formatPrice } from "../utils/format.js";
import { buildOrderMessage, whatsappHref } from "../utils/whatsapp.js";
import Photo from "./Photo.jsx";
import QuantitySelector from "./QuantitySelector.jsx";
import WhatsAppLink from "./WhatsAppLink.jsx";

export default function ProductDetails({ product, onClose }) {
  const panelRef = useRef(null);
  const titleId = useId();
  const { addItem, placeOrder, cartOpen } = useCart();
  const { lang, t } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [variantId, setVariantId] = useState(product?.variants[0]?.id || "");

  useDialog(Boolean(product) && !cartOpen, panelRef, onClose);

  useEffect(() => {
    setQuantity(1);
    setVariantId(product?.variants[0]?.id || "");
  }, [product]);

  if (!product) return null;

  const view = localizeProduct(product, lang);
  const variant = view.variants.find((item) => item.id === variantId) || null;
  const orderItem = {
    name: view.name,
    variantLabel: variant?.label || "",
    quantity,
    unitPrice: view.price,
    lineTotal: view.price * quantity,
  };
  const orderHref = whatsappHref(buildOrderMessage([orderItem], {}, lang));

  function orderThis() {
    placeOrder([orderItem], {});
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-espresso/45"
        aria-label={t.closeProduct}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative z-10 max-h-[92vh] w-full overflow-y-auto bg-paper outline-none sm:max-w-5xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute end-3 top-3 z-10 flex h-11 w-11 items-center justify-center bg-paper/90"
          aria-label={t.close}
        >
          <X size={20} strokeWidth={1.5} />
        </button>
        <div className="grid md:grid-cols-2">
          <div className="aspect-[4/5] bg-rose/20 md:aspect-auto md:min-h-[640px]">
            <Photo
              src={view.image}
              alt={view.alt}
              className="h-full w-full object-cover"
              width={1000}
              height={1250}
            />
          </div>
          <div className="flex flex-col px-5 py-8 sm:px-8 md:py-12 md:pe-12">
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-sage">{view.size}</p>
            <h2 id={titleId} className="mt-3 font-serif text-4xl leading-snug sm:text-5xl">
              {view.name}
            </h2>
            <p className="mt-4 text-2xl font-semibold tracking-wide">{formatPrice(view.price, lang)}</p>
            <p className="mt-6 text-sm leading-relaxed text-espresso/80">{view.description}</p>

            {view.variants.length > 0 ? (
              <fieldset className="mt-8">
                <legend className="text-[0.72rem] uppercase tracking-[0.16em] text-sage">
                  {t.variant}
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {view.variants.map((item) => {
                    const selected = item.id === variantId;
                    return (
                      <label
                        key={item.id}
                        className={`cursor-pointer border px-4 py-2 text-sm ${
                          selected ? "border-espresso bg-espresso text-ivory" : "border-line"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`variant-${view.id}`}
                          value={item.id}
                          checked={selected}
                          onChange={() => setVariantId(item.id)}
                          className="sr-only"
                        />
                        {item.label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ) : null}

            <div className="mt-8">
              <p className="text-[0.72rem] uppercase tracking-[0.16em] text-sage">{t.quantity}</p>
              <div className="mt-3">
                <QuantitySelector value={quantity} onChange={setQuantity} />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 bg-espresso px-5 text-[0.75rem] uppercase tracking-[0.16em] text-ivory"
                onClick={() => addItem(product, variantId, quantity)}
              >
                <ShoppingBag size={16} strokeWidth={1.75} aria-hidden="true" />
                {t.addToCart}
              </button>
              <WhatsAppLink
                href={orderHref}
                onFallback={orderThis}
                className="inline-flex min-h-12 flex-1 items-center justify-center border border-espresso/20 px-5 text-center text-[0.75rem] uppercase tracking-[0.16em]"
              >
                {t.orderWhatsapp}
              </WhatsAppLink>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-sage">{t.demoNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
