import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import Reveal from "./Reveal.jsx";

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-anchor bg-ivory py-12 md:py-16" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-5 md:grid-cols-12 md:px-10">
        <Reveal className="md:col-span-4">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-sage">{t.faqEyebrow}</p>
          <h2 id="faq-title" className="mt-3 font-serif text-4xl leading-snug md:text-5xl">
            {t.faqTitle}
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-espresso/75">{t.faqIntro}</p>
        </Reveal>
        <div className="md:col-span-7 md:col-start-6">
          {t.faq.map((item, index) => {
            const open = openIndex === index;
            const panelId = `faq-${index}`;
            return (
              <div key={item.question} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-6 py-5 text-start"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? -1 : index)}
                  >
                    <span className="font-serif text-2xl leading-snug sm:text-3xl">{item.question}</span>
                    <ChevronDown
                      size={18}
                      strokeWidth={1.5}
                      className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                <div id={panelId} role="region" hidden={!open} className="pb-5 pe-8">
                  <p className="text-sm leading-relaxed text-espresso/80">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
