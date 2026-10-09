import { craftStages } from "../config/site.js";
import Photo from "../components/Photo.jsx";
import Reveal from "../components/Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Craft() {
  const { t } = useLanguage();
  return (
    <section id="savoir-faire" className="section-anchor bg-ivory" aria-labelledby="savoir-title">
      <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-10 md:py-16">
        <Reveal className="max-w-2xl">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-sage">{t.craftEyebrow}</p>
          <h2 id="savoir-title" className="mt-3 font-serif text-4xl leading-snug md:text-5xl">
            {t.craftTitle}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-espresso/75">{t.craftNote}</p>
        </Reveal>

        <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-6">
          {craftStages.map((stage, index) => {
            const text = t.craft[index];
            return (
              <Reveal key={text.title} delay={index * 0.06}>
                <article>
                  <div className="aspect-[4/3] overflow-hidden bg-rose/20">
                    <Photo
                      src={stage.image}
                      alt={text.alt}
                      className="h-full w-full object-cover"
                      width={800}
                      height={600}
                    />
                  </div>
                  <p className="mt-4 font-serif text-3xl text-gold">0{index + 1}</p>
                  <h3 className="mt-2 font-serif text-3xl leading-snug">{text.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-espresso/75">{text.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
