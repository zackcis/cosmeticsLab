const rawWhatsapp = import.meta.env.VITE_WHATSAPP_NUMBER || "";

export function normalizeWhatsappNumber(value) {
  let digits = String(value || "").replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("0") && digits.length === 10) {
    digits = `212${digits.slice(1)}`;
  }
  return digits;
}

export const site = {
  name: "Maison Néra",
  tagline: "La beauté, façonnée avec soin.",
  supporting: "Des rituels de beauté imaginés avec douceur.",
  announcement: "Chaque soin est préparé à la main, en petites séries.",
  description:
    "Soins artisanaux imaginés avec douceur. Composez votre sélection et envoyez votre demande directement sur WhatsApp.",
  whatsappNumber: normalizeWhatsappNumber(rawWhatsapp),
  instagramUrl: "",
  email: "",
  cartStorageKey: "maison-nera-cart",
  nav: [
    { href: "#accueil", label: "Accueil" },
    { href: "#boutique", label: "Boutique" },
    { href: "#histoire", label: "Notre Histoire" },
    { href: "#savoir-faire", label: "Notre Savoir-Faire" },
    { href: "#contact", label: "Contact" },
  ],
};

export const values = [
  {
    title: "Créations artisanales",
    text: "Chaque soin est façonné à la main, en petites séries, avec le temps que demande un geste juste.",
    icon: "hand",
  },
  {
    title: "Le soin du détail",
    text: "Du format au rituel proposé, chaque élément reste simple, précis et agréable à utiliser.",
    icon: "flower",
  },
  {
    title: "Une beauté qui vous ressemble",
    text: "Une sélection à composer selon vos envies, sans protocole imposé.",
    icon: "person",
  },
];

export const craftStages = [
  {
    title: "L’inspiration",
    text: "Observer les matières, les parfums et les gestes du quotidien pour imaginer un rituel calme et personnel.",
    image: "/images/craft-inspiration.jpg",
    alt: "Rose rouge couverte de rosée, sur fond sombre",
  },
  {
    title: "La création",
    text: "Préparer et façonner chaque soin à la main, en petite quantité, jusqu’à trouver le geste juste.",
    image: "/images/craft-creation.jpg",
    alt: "Main posée près d’outils de soin en pierre, sur une table claire",
  },
  {
    title: "La touche finale",
    text: "Vérifier, présenter et préparer la création avant qu’elle ne vous soit proposée.",
    image: "/images/craft-finish.jpg",
    alt: "Savons posés avec une brosse en bois sur une table en marbre",
  },
];

export const orderSteps = [
  {
    title: "Choisissez vos produits.",
    text: "Parcourez la collection et ouvrez les fiches pour lire chaque soin.",
  },
  {
    title: "Ajoutez-les à votre panier.",
    text: "Indiquez la quantité, et la variante lorsqu’elle existe.",
  },
  {
    title: "Confirmez votre demande sur WhatsApp.",
    text: "Un message récapitulatif est préparé. Vous choisissez de l’envoyer.",
  },
  {
    title: "La créatrice vous contacte pour finaliser les détails.",
    text: "Disponibilité, livraison et règlement se confirment dans la conversation.",
  },
];
