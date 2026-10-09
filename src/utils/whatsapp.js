import { site } from "../config/site.js";
import { copy } from "../i18n/copy.js";
import { formatPrice } from "./format.js";

export function isWhatsappReady(number = site.whatsappNumber) {
  return /^212\d{9}$/.test(number);
}

export function buildOrderMessage(items, customer = {}, lang = "fr") {
  const text = copy[lang] || copy.fr;
  const sep = lang === "ar" ? ": " : " : ";
  const blocks = items.map((item) => {
    const title = item.variantLabel ? `${item.name} — ${item.variantLabel}` : item.name;
    return [
      `• ${title}`,
      `${text.orderQty}${sep}${item.quantity}`,
      `${text.orderUnit}${sep}${formatPrice(item.unitPrice, lang)}`,
      `${text.orderLine}${sep}${formatPrice(item.lineTotal, lang)}`,
    ].join("\n");
  });
  const total = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const lines = [text.orderGreeting, "", blocks.join("\n\n"), "", `${text.orderTotal}${sep}${formatPrice(total, lang)}`];
  const name = customer.name?.trim();
  const city = customer.city?.trim();
  const notes = customer.notes?.trim();
  if (name) lines.push(`${text.orderName}${sep}${name}`);
  if (city) lines.push(`${text.orderCity}${sep}${city}`);
  if (notes) lines.push(`${text.orderNoteLabel}${sep}${notes}`);
  lines.push("", text.orderClose);
  return lines.join("\n");
}

export function buildContactMessage(lang = "fr") {
  const text = copy[lang] || copy.fr;
  return text.contactMessage(site.name);
}

export function buildWhatsappUrl(message, number = site.whatsappNumber) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function whatsappHref(message) {
  if (!isWhatsappReady()) return "";
  return buildWhatsappUrl(message);
}

export function openWhatsapp(message) {
  const url = buildWhatsappUrl(message);
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
