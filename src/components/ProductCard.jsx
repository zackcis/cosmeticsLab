import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { formatPrice } from "../utils/format.js";
import { buildOrderMessage, whatsappHref } from "../utils/whatsapp.js";
import { WhatsAppGlyph } from "./Footer.jsx";
import Photo from "./Photo.jsx";
import WhatsAppLink from "./WhatsAppLink.jsx";

export default function ProductCard({ product, onOpen, onAdd }) {
  const { lang, t } = useLanguage();
  const { placeOrder } = useCart();
  const variant = product.variants[0] || null;
  const line = {
    name: product.name,
    variantLabel: variant?.label || "",
    quantity: 1,
    unitPrice: product.price,
    lineTotal: product.price,
  };
  const href = whatsappHref(buildOrderMessage([line], {}, lang));

  return (
    <article className="group flex h-full flex-col">
      <button type="button" onClick={onOpen} className="block w-full text-start">
        <div className="relative aspect-[4/5] overflow-hidden bg-rose/25">
          <Photo
            src={product.image}
            alt={product.alt}
            className="photo-zoom h-full w-full object-cover"
          />
        </div>
        <div className="mt-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-[1.65rem] leading-snug text-espresso">{product.name}</h3>
            <p className="shrink-0 pt-1 text-xl font-semibold tracking-wide text-espresso">{formatPrice(product.price, lang)}</p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-sage">{product.short}</p>
        </div>
      </button>
      <div className="mt-4 grid gap-2">
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex min-h-12 items-center justify-center gap-2 border border-espresso/25 px-3 text-center text-[0.72rem] uppercase tracking-[0.14em]"
        >
          <ShoppingBag size={16} strokeWidth={1.75} aria-hidden="true" />
          {t.addToCart}
        </button>
        <WhatsAppLink
          href={href}
          onFallback={() => placeOrder([line], {})}
          className="inline-flex min-h-12 items-center justify-center gap-2 bg-espresso px-3 text-center text-[0.72rem] uppercase tracking-[0.14em] text-ivory"
        >
          <WhatsAppGlyph size={16} />
          {t.orderWhatsapp}
        </WhatsAppLink>
      </div>
    </article>
  );
}
