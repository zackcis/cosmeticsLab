import { site } from "../config/site.js";
import { useCart } from "../context/CartContext.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { buildContactMessage, whatsappHref } from "../utils/whatsapp.js";
import WhatsAppLink from "./WhatsAppLink.jsx";

function WhatsAppGlyph({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 14.15c-.24.68-1.4 1.3-1.94 1.38-.5.07-1.12.1-1.81-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.24-.26.64-.38.85-.38h.61c.2 0 .46-.07.72.55.26.64.9 2.2.98 2.36.08.16.13.35.03.56-.1.21-.15.34-.3.52-.15.18-.31.4-.44.54-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.3.15.47.13.65-.08.17-.2.74-.86.94-1.16.2-.3.4-.24.67-.14.27.1 1.72.81 2.02.96.3.15.49.22.56.34.08.13.08.74-.16 1.42Z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { contactBrand } = useCart();
  const { lang, t } = useLanguage();
  const contactHref = whatsappHref(buildContactMessage(lang));

  return (
    <footer id="contact" className="section-anchor bg-espresso text-ivory">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-20">
        <div className="md:col-span-5">
          <p className="font-serif text-4xl">{site.name}</p>
          <p className="mt-3 font-serif text-2xl text-rose">{t.tagline}</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/75">{t.description}</p>
        </div>
        <div className="md:col-span-3">
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-gold">{t.footerNav}</p>
          <ul className="mt-4 space-y-2">
            {t.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-ivory/85 hover:text-ivory">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-gold">{t.footerWrite}</p>
          <WhatsAppLink
            href={contactHref}
            onFallback={contactBrand}
            className="mt-4 inline-flex min-h-11 items-center gap-2 border border-ivory/25 px-4 text-sm"
          >
            <WhatsAppGlyph size={16} />
            {t.footerWhatsapp}
          </WhatsAppLink>
          <ul className="mt-5 space-y-3 text-sm text-ivory/80">
            <li>
              {site.instagramUrl ? (
                <a href={site.instagramUrl} target="_blank" rel="noreferrer noopener">
                  Instagram
                </a>
              ) : (
                <span>{t.instagramMissing}</span>
              )}
            </li>
            <li>
              {site.email ? (
                <a href={`mailto:${site.email}`}>{site.email}</a>
              ) : (
                <span>{t.emailMissing}</span>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-10 md:grid-cols-2 md:px-10">
          <section id="mentions" className="section-anchor">
            <h2 className="font-serif text-2xl">{t.legalTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ivory/70">{t.legalText}</p>
          </section>
          <section id="confidentialite" className="section-anchor">
            <h2 className="font-serif text-2xl">{t.privacyTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ivory/70">{t.privacyText}</p>
          </section>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-5 py-5 text-xs text-ivory/60 md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            © {year} {site.name}
          </p>
          <p className="flex gap-4">
            <a href="#mentions" className="hover:text-ivory">
              {t.legalTitle}
            </a>
            <a href="#confidentialite" className="hover:text-ivory">
              {t.privacyTitle}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export { WhatsAppGlyph };
