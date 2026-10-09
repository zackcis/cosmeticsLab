import { useRef, useState } from "react";
import { X } from "lucide-react";
import { site } from "../config/site.js";
import { useCart } from "../context/CartContext.jsx";
import { useDialog } from "../hooks/useDialog.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function OrderPreview() {
  const panelRef = useRef(null);
  const { preview, closePreview } = useCart();
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  useDialog(Boolean(preview), panelRef, closePreview);

  if (!preview) return null;

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(preview.message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-espresso/50"
        aria-label={t.closePreview}
        onClick={closePreview}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
        tabIndex={-1}
        className="relative z-10 max-h-[92vh] w-full overflow-y-auto bg-paper px-5 py-6 outline-none sm:max-w-lg sm:px-8 sm:py-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-gold">{t.demoMode}</p>
            <h2 id="preview-title" className="mt-2 font-serif text-4xl leading-snug">
              {t.previewTitle}
            </h2>
          </div>
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center"
            onClick={closePreview}
            aria-label={t.close}
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-espresso/80">{t.previewText(site.name)}</p>
        <pre
          dir={lang === "ar" ? "rtl" : "ltr"}
          className="mt-5 max-h-72 overflow-auto whitespace-pre-wrap border border-line bg-ivory p-4 text-start font-sans text-sm leading-relaxed text-espresso"
        >
          {preview.message}
        </pre>
        <button
          type="button"
          onClick={copyMessage}
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center bg-espresso px-5 text-[0.75rem] uppercase tracking-[0.16em] text-ivory"
        >
          {copied ? t.copied : t.copyMessage}
        </button>
      </div>
    </div>
  );
}
