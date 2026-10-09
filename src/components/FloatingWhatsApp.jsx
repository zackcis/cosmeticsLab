import { useCart } from "../context/CartContext.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { buildContactMessage, whatsappHref } from "../utils/whatsapp.js";
import { WhatsAppGlyph } from "./Footer.jsx";
import WhatsAppLink from "./WhatsAppLink.jsx";

export default function FloatingWhatsApp() {
  const { contactBrand } = useCart();
  const { lang, t } = useLanguage();
  const href = whatsappHref(buildContactMessage(lang));

  return (
    <WhatsAppLink
      href={href}
      onFallback={contactBrand}
      ariaLabel={t.whatsappFloat}
      className="fixed bottom-5 end-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-espresso text-ivory shadow-[0_10px_30px_rgba(41,43,37,0.18)] sm:bottom-6 sm:end-6"
    >
      <WhatsAppGlyph />
    </WhatsAppLink>
  );
}
