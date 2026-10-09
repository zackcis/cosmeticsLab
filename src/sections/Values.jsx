import { Flower2, Hand, UserRound } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import Reveal from "../components/Reveal.jsx";

const icons = [Hand, Flower2, UserRound];

export default function Values() {
  const { t } = useLanguage();

  return (
    <section className="border-y border-line bg-paper" aria-label={t.valuesLabel}>
      <h2 className="sr-only">{t.valuesTitle}</h2>
      <div className="mx-auto grid max-w-[1240px] md:grid-cols-3">
        {t.values.map((value, index) => {
          const Icon = icons[index];
          return (
            <Reveal
              key={value.title}
              delay={index * 0.08}
              className={`px-6 py-8 md:px-8 md:py-10 ${index > 0 ? "border-t border-line md:border-s md:border-t-0" : ""}`}
            >
              <Icon size={22} strokeWidth={1.25} className="text-gold" aria-hidden="true" />
              <h3 className="mt-6 font-serif text-4xl leading-snug">{value.title}</h3>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-espresso/75">{value.text}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
