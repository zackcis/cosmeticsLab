import { useEffect, useState } from "react";
import { CartProvider, useCart } from "./context/CartContext.jsx";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import Values from "./sections/Values.jsx";
import Catalog from "./sections/Catalog.jsx";
import BrandStory from "./sections/BrandStory.jsx";
import Craft from "./sections/Craft.jsx";
import Featured from "./sections/Featured.jsx";
import Ordering from "./sections/Ordering.jsx";
import FAQ from "./components/FAQ.jsx";
import Footer from "./components/Footer.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import OrderPreview from "./components/OrderPreview.jsx";
import Toast from "./components/Toast.jsx";

function Storefront() {
  const { cartOpen } = useCart();
  const { t } = useLanguage();
  const [category, setCategory] = useState("tous");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (cartOpen) setProduct(null);
  }, [cartOpen]);

  function exploreCoffrets() {
    setCategory("coffrets");
    document.getElementById("boutique")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[80] focus:bg-paper focus:px-4 focus:py-2"
      >
        {t.skip}
      </a>
      <Navbar />
      <main id="contenu">
        <Hero />
        <Values />
        <Catalog category={category} onCategory={setCategory} onOpen={setProduct} />
        <BrandStory />
        <Craft />
        <Featured onExplore={exploreCoffrets} />
        <Ordering />
        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ProductDetails product={product} onClose={() => setProduct(null)} />
      <CartDrawer />
      <OrderPreview />
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Storefront />
      </CartProvider>
    </LanguageProvider>
  );
}
