import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { site } from "../config/site.js";
import { useCart } from "../context/CartContext.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { formatCount } from "../utils/format.js";

function LanguageSwitch({ className = "" }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div role="group" aria-label={t.languageLabel} dir="ltr" className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        lang="fr"
        aria-pressed={lang === "fr"}
        onClick={() => setLang("fr")}
        className={`min-h-11 px-1 text-[0.75rem] tracking-[0.14em] ${
          lang === "fr" ? "text-espresso" : "text-espresso/40"
        }`}
      >
        FR
      </button>
      <span aria-hidden="true" className="text-espresso/30">
        |
      </span>
      <button
        type="button"
        lang="ar"
        dir="rtl"
        aria-pressed={lang === "ar"}
        onClick={() => setLang("ar")}
        className={`lang-ar min-h-11 px-1 text-[0.95rem] ${lang === "ar" ? "text-espresso" : "text-espresso/40"}`}
      >
        العربية
      </button>
    </div>
  );
}

export default function Navbar() {
  const { count, setCartOpen } = useCart();
  const { lang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-espresso text-ivory">
        <p className="px-4 py-2 text-center text-[0.78rem] uppercase tracking-[0.22em]">{t.announcement}</p>
      </div>
      <div
        className={`border-b bg-ivory transition-colors ${
          scrolled || menuOpen ? "border-line" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-5 md:h-[4.5rem] md:px-8 lg:px-12">
          <a href="#accueil" className="whitespace-nowrap font-serif text-[1.35rem] leading-none tracking-[0.04em] text-espresso sm:text-[1.65rem]" lang="fr">
            {site.name}
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label={t.navLabel}>
            {t.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.75rem] uppercase tracking-[0.16em] text-espresso/80 hover:text-espresso"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <LanguageSwitch className="me-1 hidden sm:flex" />
            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center"
              onClick={() => setCartOpen(true)}
              aria-label={count > 0 ? t.cartLabelCount(formatCount(count, lang)) : t.cartLabel}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {count > 0 ? (
                <span className="absolute end-1 top-1 flex h-4 min-w-4 items-center justify-center bg-espresso px-1 text-[0.62rem] text-ivory">
                  {count}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
              <span className="sr-only">{menuOpen ? t.closeMenu : t.openMenu}</span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="menu-mobile"
            aria-label={t.mobileNavLabel}
            className="fixed inset-0 z-30 flex flex-col bg-ivory px-6 pb-10 pt-32 lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <LanguageSwitch className="mb-6" />
            {t.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="border-b border-line py-4 font-serif text-4xl text-espresso"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              className="mt-8 self-start text-[0.75rem] uppercase tracking-[0.16em]"
              onClick={() => {
                closeMenu();
                setCartOpen(true);
              }}
            >
              {t.myCart}
            </button>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
