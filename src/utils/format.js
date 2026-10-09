import { copy } from "../i18n/copy.js";

export function formatPrice(amount, lang = "fr") {
  return copy[lang]?.price(amount) ?? copy.fr.price(amount);
}

export function formatCount(count, lang = "fr") {
  const text = copy[lang] || copy.fr;
  if (count <= 0) return text.countZero;
  if (count === 1) return text.countOne;
  if (lang === "ar" && count === 2) return text.countTwo;
  if (lang === "ar" && count <= 10) return text.countFew(count);
  return text.countMany(count);
}
