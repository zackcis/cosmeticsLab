import { Minus, Plus } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function QuantitySelector({ value, onChange, min = 1, max = 12 }) {
  const { t } = useLanguage();
  return (
    <div className="inline-flex items-center border border-espresso/15 bg-paper">
      <button
        type="button"
        className="flex h-12 w-12 items-center justify-center text-espresso disabled:text-espresso/30"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={t.decrease}
      >
        <Minus size={16} strokeWidth={1.5} />
      </button>
      <span className="min-w-10 text-center text-base" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="flex h-12 w-12 items-center justify-center text-espresso disabled:text-espresso/30"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={t.increase}
      >
        <Plus size={16} strokeWidth={1.5} />
      </button>
    </div>
  );
}
