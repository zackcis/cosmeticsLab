import Photo from "../components/Photo.jsx";
import Reveal from "../components/Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Featured({ onExplore }) {
  const { t } = useLanguage();
  return (
    <section className="bg-espresso text-ivory" aria-labelledby="coffret-title">
      <div className="grid md:grid-cols-2">
        <div className="h-56 bg-espresso sm:h-72 md:h-[380px]">
          <Photo
            src="/images/featured.jpg"
            alt={t.featuredAlt}
            className="h-full w-full object-cover"
            width={1400}
            height={1750}
          />
        </div>
        <Reveal className="flex items-center px-5 py-10 md:px-12 md:py-12 lg:px-16">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-gold">{t.featuredEyebrow}</p>
            <h2 id="coffret-title" className="mt-3 max-w-xl font-serif text-4xl leading-snug md:text-5xl">
              {t.featuredTitle}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/75">{t.featuredText}</p>
            <button
              type="button"
              onClick={onExplore}
              className="mt-8 inline-flex min-h-12 items-center border border-ivory/30 px-6 text-[0.75rem] uppercase tracking-[0.16em]"
            >
              {t.featuredCta}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
