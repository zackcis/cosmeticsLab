import { useCart } from "../context/CartContext.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Toast() {
  const { toast, dismissToast, setCartOpen } = useCart();
  const { t } = useLanguage();
  if (!toast) return null;

  return (
    <div
      className="fixed bottom-24 left-1/2 z-[70] w-[min(92vw,420px)] -translate-x-1/2 border border-line bg-paper px-4 py-3 shadow-[0_16px_40px_rgba(41,43,37,0.12)]"
      role="status"
      aria-live="polite"
    >
      <p className="text-sm">{t.added}</p>
      <p className="mt-1 font-serif text-xl leading-tight">{toast.name}</p>
      <div className="mt-3 flex gap-4">
        <button
          type="button"
          className="text-[0.72rem] uppercase tracking-[0.14em]"
          onClick={() => {
            dismissToast();
            setCartOpen(true);
          }}
        >
          {t.seeCart}
        </button>
        <button
          type="button"
          className="text-[0.72rem] uppercase tracking-[0.14em] text-sage"
          onClick={dismissToast}
        >
          {t.close}
        </button>
      </div>
    </div>
  );
}
