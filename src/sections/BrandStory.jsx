import Photo from "../components/Photo.jsx";
import Reveal from "../components/Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function BrandStory() {
  const { t } = useLanguage();
  return (
    <section id="histoire" className="section-anchor bg-paper" aria-labelledby="histoire-title">
      <div className="grid md:grid-cols-2">
        <div>
          <div className="h-56 bg-rose/20 sm:h-72 md:h-[420px]">
            <Photo
              src="/images/story.jpg"
              alt={t.storyAlt}
              className="h-full w-full object-cover"
              width={1400}
              height={1750}
            />
          </div>
        </div>
        <div className="flex items-center">
          <Reveal className="px-5 py-10 md:px-12 md:py-12 lg:px-16">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-sage">{t.storyEyebrow}</p>
            <h2 id="histoire-title" className="mt-3 font-serif text-4xl leading-snug md:text-5xl">
              {t.storyTitle}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-espresso/80">{t.storyText}</p>
            <p className="mt-5 text-sm leading-relaxed text-sage">{t.storyNote}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
