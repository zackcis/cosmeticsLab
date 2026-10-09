import { useLanguage } from "../i18n/LanguageContext.jsx";
import Reveal from "../components/Reveal.jsx";

export default function Ordering() {
  const { t } = useLanguage();

  return (
    <section className="bg-paper py-12 md:py-16" aria-labelledby="commande-title">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-sage">{t.orderEyebrow}</p>
          <h2 id="commande-title" className="mt-3 font-serif text-4xl leading-snug md:text-5xl">
            {t.orderTitle}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-8 md:grid-cols-4">
          {t.steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.06} className="border-t border-line pt-5">
              <p className="font-serif text-4xl text-gold">0{index + 1}</p>
              <h3 className="mt-4 font-serif text-3xl leading-snug">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-espresso/75">{step.text}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-sage">{t.orderNote}</p>
      </div>
    </section>
  );
}
