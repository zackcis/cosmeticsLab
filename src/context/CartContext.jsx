import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { site } from "../config/site.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { getProduct, localizeProduct } from "../data/products.js";
import {
  buildContactMessage,
  buildOrderMessage,
  isWhatsappReady,
  openWhatsapp,
} from "../utils/whatsapp.js";

const CartContext = createContext(null);

function readCart() {
  try {
    const raw = localStorage.getItem(site.cartStorageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line) =>
        line &&
        typeof line.key === "string" &&
        typeof line.productId === "string" &&
        Number.isInteger(line.quantity) &&
        line.quantity > 0 &&
        getProduct(line.productId),
    );
  } catch {
    return [];
  }
}

export function lineView(line, lang = "fr") {
  const product = localizeProduct(getProduct(line.productId), lang);
  if (!product) return null;
  const variant = product.variants.find((item) => item.id === line.variantId) || null;
  return {
    key: line.key,
    productId: product.id,
    name: product.name,
    variantLabel: variant?.label || "",
    quantity: line.quantity,
    unitPrice: product.price,
    lineTotal: product.price * line.quantity,
    image: product.image,
    alt: product.alt,
  };
}

export function CartProvider({ children }) {
  const { lang } = useLanguage();
  const [lines, setLines] = useState(readCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    localStorage.setItem(site.cartStorageKey, JSON.stringify(lines));
  }, [lines]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 3400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const views = useMemo(
    () => lines.map((line) => lineView(line, lang)).filter(Boolean),
    [lines, lang],
  );

  const count = views.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = views.reduce((sum, line) => sum + line.lineTotal, 0);

  function addItem(product, variantId, quantity) {
    const source = localizeProduct(getProduct(product.id) || product, lang);
    const variant = source.variants.find((item) => item.id === variantId) || null;
    const key = `${product.id}__${variant?.id || "std"}`;
    const amount = Math.min(12, Math.max(1, quantity));

    setLines((current) => {
      const existing = current.find((line) => line.key === key);
      if (existing) {
        return current.map((line) =>
          line.key === key
            ? { ...line, quantity: Math.min(12, line.quantity + amount) }
            : line,
        );
      }
      return [
        ...current,
        {
          key,
          productId: product.id,
          variantId: variant?.id || null,
          quantity: amount,
        },
      ];
    });

    setToast({
      id: Date.now(),
      name: variant ? `${source.name} — ${variant.label}` : source.name,
    });
  }

  function updateQuantity(key, quantity) {
    setLines((current) =>
      current
        .map((line) =>
          line.key === key ? { ...line, quantity: Math.min(12, Math.max(0, quantity)) } : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }

  function removeLine(key) {
    setLines((current) => current.filter((line) => line.key !== key));
  }

  function showPreview(message) {
    setPreview({ message });
  }

  function sendMessage(message) {
    if (!isWhatsappReady()) {
      showPreview(message);
      return;
    }
    openWhatsapp(message);
  }

  function placeOrder(items, customer) {
    sendMessage(buildOrderMessage(items, customer, lang));
  }

  function contactBrand() {
    sendMessage(buildContactMessage(lang));
  }

  const value = {
    lines: views,
    count,
    subtotal,
    cartOpen,
    setCartOpen,
    toast,
    dismissToast: () => setToast(null),
    preview,
    closePreview: () => setPreview(null),
    addItem,
    updateQuantity,
    removeLine,
    placeOrder,
    contactBrand,
    whatsappReady: isWhatsappReady(),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé dans CartProvider");
  }
  return context;
}
