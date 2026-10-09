import { motion, useReducedMotion } from "motion/react";
import Photo from "../components/Photo.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

function Botanical() {
  return (
    <svg
      className="pointer-events-none absolute -end-3 -top-6 hidden h-28 w-28 text-sage/50 lg:block"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M60 108c0-28 8-46 28-62-22 2-36 16-42 36-8-18-6-38 8-54-24 6-38 26-38 48 0 18 8 32 22 40-10-6-16-16-16-28 0-20 14-36 38-44"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section id="accueil" className="section-anchor overflow-hidden bg-ivory">
      <div className="mx-auto grid max-w-[1440px] items-center gap-6 px-5 pb-10 pt-4 md:grid-cols-12 md:gap-6 md:px-8 md:pb-14 md:pt-6 lg:px-12">
        <div className="order-2 md:order-1 md:col-span-6 lg:col-span-5">
          <motion.p
            className="text-[0.7rem] uppercase tracking-[0.28em] text-sage"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.tagline}
          </motion.p>
          <motion.h1
            className="hero-title mt-4 font-serif text-[2.7rem] text-espresso min-[390px]:text-5xl sm:text-6xl lg:text-[5.15rem]"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.05 }}
          >
            {t.heroTitleBefore}
            <em className="font-medium text-gold">{t.heroTitleEm}</em>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-espresso/75"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12 }}
          >
            {t.heroText}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-3 min-[420px]:flex-row"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18 }}
          >
            <a
              href="#boutique"
              className="inline-flex min-h-12 items-center justify-center bg-espresso px-6 text-[0.75rem] uppercase tracking-[0.16em] text-ivory"
            >
              {t.heroCta}
            </a>
            <a
              href="#histoire"
              className="inline-flex min-h-12 items-center justify-center border border-espresso/20 px-6 text-[0.75rem] uppercase tracking-[0.16em]"
            >
              {t.heroStory}
            </a>
          </motion.div>
          <p className="mt-8 font-serif text-2xl text-gold">{t.supporting}</p>
        </div>

        <div className="relative order-1 md:order-2 md:col-span-6 lg:col-span-6 lg:col-start-7">
          <Botanical />
          <div className="relative h-80 overflow-hidden bg-[#e7d7cc] sm:h-[26rem] md:aspect-[4/5] md:h-auto">
            <motion.div
              className="h-full w-full"
              initial={reduce ? false : { scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Photo
                src="/images/hero.jpg"
                alt={t.heroAlt}
                className="h-full w-full object-cover"
                eager
                width={1600}
                height={2000}
              />
            </motion.div>
          </div>
          <div className="mt-4 border-t border-line pt-4 md:absolute md:-start-10 md:bottom-10 md:mt-0 md:w-52 md:border md:border-line md:bg-paper md:p-5">
            <p className="font-serif text-2xl leading-snug">{t.heroCaption}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-sage">{t.heroSeries}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
