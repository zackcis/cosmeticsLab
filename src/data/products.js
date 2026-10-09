export const categories = [
  { id: "tous", label: "Tous" },
  { id: "visage", label: "Visage" },
  { id: "corps", label: "Corps" },
  { id: "savons", label: "Savons" },
  { id: "coffrets", label: "Coffrets" },
];

/**
 * Catalogue de démonstration.
 * Remplacez les noms, textes, prix, formats et images par ceux de la marque.
 * Les photographies viennent d’Unsplash et de Pexels (licences libres) et ne
 * doivent pas être présentées comme les produits réels de la cliente.
 */
export const products = [
  {
    id: "savon-rose",
    name: "Savon artisanal à la rose",
    price: 85,
    category: "savons",
    image: "/images/savon.jpg",
    alt: "Quatre savons artisanaux ficelés, posés sur une table en bois avec de la lavande",
    short: "Un pain de savon au parfum de rose, coulé en petite série.",
    description:
      "Un savon de démonstration, pensé comme un geste simple du quotidien. Sa forme tient bien en main, et son parfum de rose reste doux. Le texte, le format et la photographie sont à remplacer par ceux de la marque.",
    size: "100 g",
    variants: [
      { id: "rose", label: "Rose" },
      { id: "oranger", label: "Fleur d’oranger" },
    ],
    source: "https://unsplash.com/photos/1600857544200-b2f666a9a2ec",
  },
  {
    id: "huile-argan",
    name: "Huile de soin à l’argan",
    price: 180,
    category: "corps",
    image: "/images/huile.jpg",
    alt: "Flacon ambré compte-gouttes posé sur un présentoir en bois, dans une lumière douce",
    short: "Une huile à déposer dans le creux de la main, avant le soin.",
    description:
      "Une huile de démonstration, présentée dans un flacon compte-gouttes. Quelques gouttes suffisent pour accompagner un rituel du soir. La composition exacte sera communiquée par la créatrice. Ce texte est illustratif.",
    size: "30 ml",
    variants: [],
    source: "https://unsplash.com/photos/1608571423902-eed4a5ad8108",
  },
  {
    id: "baume-nourrissant",
    name: "Baume nourrissant",
    price: 140,
    category: "corps",
    image: "/images/baume.jpg",
    alt: "Tube de soin blanc posé sur des feuilles vertes et une planche de bois",
    short: "Un baume onctueux pour les zones qui demandent plus de confort.",
    description:
      "Un baume de démonstration, à réserver aux mains, aux coudes ou à toute zone que l’on souhaite simplement envelopper. Aucune promesse de résultat n’est associée à cette fiche. Textes et visuels remplaçables.",
    size: "50 ml",
    variants: [],
    source: "https://www.pexels.com/photo/4465124/",
  },
  {
    id: "gommage-douceur",
    name: "Gommage corps douceur",
    price: 160,
    category: "corps",
    image: "/images/gommage.jpg",
    alt: "Bol de sel fin, savon rond et brosse en bois posés sur un linge clair",
    short: "Un gommage fin, pour un geste lent sous la douche.",
    description:
      "Un gommage de démonstration au grain doux, imaginé pour un moment calme plutôt que pour un geste brusque. Le mode d’emploi précis et la composition seront ceux fournis par la marque.",
    size: "200 g",
    variants: [],
    source: "https://unsplash.com/photos/1590439471364-192aa70c0b53",
  },
  {
    id: "serum-eclat",
    name: "Sérum visage éclat",
    price: 220,
    category: "visage",
    image: "/images/serum.jpg",
    alt: "Flacon compte-gouttes ambré entouré de pétales de rose sur un plateau en bois",
    short: "Quelques gouttes, au creux du rituel du visage.",
    description:
      "Un sérum de démonstration à appliquer avant la suite du soin, si la créatrice le recommande ainsi. Cette fiche ne décrit pas d’action sur la peau : elle présente seulement le geste et le format. À personnaliser.",
    size: "30 ml",
    variants: [],
    source: "https://www.pexels.com/photo/4041392/",
  },
  {
    id: "beurre-corporel",
    name: "Beurre corporel",
    price: 150,
    category: "corps",
    image: "/images/beurre.jpg",
    alt: "Mains tenant un pot ouvert de crème onctueuse, dans une lumière chaude",
    short: "Une texture riche, à prendre du bout des doigts.",
    description:
      "Un beurre corporel de démonstration, à l’aspect souple et au parfum discret. Deux variantes illustrent la façon dont la marque pourra proposer un choix. La formule réelle remplacera ce texte.",
    size: "100 ml",
    variants: [
      { id: "neutre", label: "Neutre" },
      { id: "vanille", label: "Vanille" },
    ],
    source: "https://www.pexels.com/photo/4046316/",
  },
  {
    id: "masque-argile",
    name: "Masque à l’argile",
    price: 130,
    category: "visage",
    image: "/images/argile.jpg",
    alt: "Pose d’un masque à l’argile au pinceau, dans un espace de soin calme",
    short: "Un masque à déposer en couche fine, le temps d’une pause.",
    description:
      "Un masque de démonstration, prévu comme une parenthèse. Le temps de pose et la composition ne sont pas indiqués ici : ils seront confirmés par la créatrice avant toute utilisation. Fiche illustrative.",
    size: "75 g",
    variants: [],
    source: "https://unsplash.com/photos/1570172619644-dfd03ed5d881",
  },
  {
    id: "soin-levres",
    name: "Soin pour les lèvres",
    price: 65,
    category: "visage",
    image: "/images/levres.jpg",
    alt: "Petit flacon ambré posé parmi des herbes séchées et une branche d’eucalyptus",
    short: "Un soin léger, à garder à portée de main.",
    description:
      "Un soin lèvres de démonstration, présenté en petit flacon. Il illustre un format nomade et un prix d’appel. Le contenant, le parfum et le texte définitifs seront ceux de la marque.",
    size: "8 ml",
    variants: [],
    source: "https://www.pexels.com/photo/6694190/",
  },
  {
    id: "coffret-rituel",
    name: "Coffret rituel beauté",
    price: 420,
    category: "coffrets",
    image: "/images/coffret.jpg",
    alt: "Trois flacons ambrés de tailles différentes, photographiés à plat sur un fond clair",
    short: "Une sélection réunie pour offrir, ou pour commencer un rituel.",
    description:
      "Un coffret de démonstration qui rassemble l’idée d’un rituel complet. Son contenu exact n’est pas figé : la créatrice confirmera la composition, la disponibilité et le prix au moment de la commande.",
    size: "Coffret",
    variants: [
      { id: "decouverte", label: "Découverte" },
      { id: "complet", label: "Rituel complet" },
    ],
    source: "https://www.pexels.com/photo/6621462/",
  },
];

const arabicCopy = {
  "savon-rose": {
    name: "صابون الورد الحرفي",
    short: "قالب صابون بعبير الورد، يُسكب في دفعات صغيرة.",
    description:
      "صابون للعرض، صُمّم كإيماءة بسيطة في اليوم. شكله يستقر في اليد، وعبير الورد فيه هادئ. النص والحجم والصورة تُستبدل بما تختار العلامة.",
    alt: "أربعة قوالب صابون حرفي مربوطة، على طاولة خشب مع الخزامى",
    variants: { rose: "ورد", oranger: "زهر البرتقال" },
  },
  "huile-argan": {
    name: "زيت العناية بالأرغان",
    short: "زيت يُوضع في راحة اليد قبل العناية.",
    description:
      "زيت للعرض، في قارورة قطّارة. بضع قطرات ترافق طقس المساء. التركيبة الدقيقة تُبلَّغ من الصانعة. هذا النص توضيحي.",
    alt: "قارورة كهرمانية قطّارة على حامل خشبي، في ضوء هادئ",
  },
  "baume-nourrissant": {
    name: "بلسم مغذٍّ",
    short: "بلسم غني للمواضع التي تحتاج مزيدًا من الراحة.",
    description:
      "بلسم للعرض، لليدين أو المرفقين أو أي موضع يُراد تغليفه ببساطة. لا يرتبط بهذه البطاقة أي وعد بنتيجة. النصوص والصور قابلة للاستبدال.",
    alt: "أنبوب عناية أبيض على أوراق خضراء ولوح خشب",
  },
  "gommage-douceur": {
    name: "مقشّر الجسم الناعم",
    short: "مقشّر ناعم، لإيماءة بطيئة تحت الدش.",
    description:
      "مقشّر للعرض بحبيبات لطيفة، للحظة هادئة لا لحركة خشنة. طريقة الاستعمال والتركيبة ستكونان ما تقدّمه العلامة.",
    alt: "وعاء ملح ناعم وصابون دائري وفرشاة خشب على قماش فاتح",
  },
  "serum-eclat": {
    name: "سيروم إشراقة الوجه",
    short: "بضع قطرات، في قلب طقس الوجه.",
    description:
      "سيروم للعرض يُوضع قبل بقية العناية إذا أوصت الصانعة بذلك. هذه البطاقة لا تصف أثرًا على البشرة: تعرض الإيماءة والحجم فقط. قابلة للتخصيص.",
    alt: "قارورة قطّارة كهرمانية بين بتلات ورد على صينية خشب",
  },
  "beurre-corporel": {
    name: "زبدة الجسم",
    short: "قوام غني، يُؤخذ بأطراف الأصابع.",
    description:
      "زبدة جسم للعرض، قوامها ليّن وعبيرها خفيف. خياران يوضحان كيف يمكن للعلامة أن تقترح اختيارًا. الصيغة الحقيقية ستحل محل هذا النص.",
    alt: "يدان تمسكان وعاءً مفتوحًا من كريم غني، في ضوء دافئ",
    variants: { neutre: "بلا عطر", vanille: "فانيلا" },
  },
  "masque-argile": {
    name: "قناع الطين",
    short: "قناع يُفرد بطبقة رقيقة، في وقت استراحة.",
    description:
      "قناع للعرض، كاستراحة قصيرة. مدة الوضع والتركيبة غير مذكورتين هنا: تؤكدهما الصانعة قبل أي استعمال. بطاقة توضيحية.",
    alt: "وضع قناع طين بالفرشاة، في مكان عناية هادئ",
  },
  "soin-levres": {
    name: "عناية الشفاه",
    short: "عناية خفيفة، تبقى في متناول اليد.",
    description:
      "عناية شفاه للعرض، في قارورة صغيرة. توضّح حجمًا يُحمل وسعرًا للتعرّف. العبوة والعبير والنص النهائي ستكون للعلامة.",
    alt: "قارورة كهرمانية صغيرة بين أعشاب مجففة وغصن أوكالبتوس",
  },
  "coffret-rituel": {
    name: "صندوق طقس الجمال",
    short: "تشكيلة مجتمعة للإهداء، أو لبدء طقس.",
    description:
      "صندوق للعرض يجمع فكرة طقس متكامل. محتواه غير ثابت: تؤكد الصانعة التركيبة والتوفّر والسعر عند الطلب.",
    alt: "ثلاث قوارير كهرمانية بأحجام مختلفة، مصوّرة بشكل مسطّح على خلفية فاتحة",
    size: "علبة",
    variants: { decouverte: "اكتشاف", complet: "الطقس الكامل" },
  },
};

export function getProduct(productId) {
  return products.find((product) => product.id === productId) || null;
}

export function localizeProduct(product, lang) {
  if (!product || lang !== "ar") return product;
  const arabic = arabicCopy[product.id];
  if (!arabic) return product;
  return {
    ...product,
    name: arabic.name,
    short: arabic.short,
    description: arabic.description,
    alt: arabic.alt,
    size: arabic.size || product.size,
    variants: product.variants.map((variant) => ({
      ...variant,
      label: arabic.variants?.[variant.id] || variant.label,
    })),
  };
}
