import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { products, localizeProduct } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Reveal from "../components/Reveal.jsx";

const categoryIds = ["tous", "visage", "corps", "savons", "coffrets"];

function searchText(product) {
  const french = localizeProduct(product, "fr");
  const arabic = localizeProduct(product, "ar");
  return `${french.name} ${french.short} ${arabic.name} ${arabic.short} ${product.size} ${arabic.size || ""}`;
}

export default function Catalog({ category, onCategory, onOpen }) {
  const { addItem } = useCart();
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("mise-en-avant");

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(lang === "ar" ? "ar" : "fr");
    let list = products.filter((product) => {
      const matchesCategory = category === "tous" || product.category === category;
      const matchesQuery = !needle || searchText(product).toLocaleLowerCase(lang === "ar" ? "ar" : "fr").includes(needle);
      return matchesCategory && matchesQuery;
    });

    if (sort === "prix-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "prix-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, sort, lang]);

  return (
    <section id="boutique" className="section-anchor bg-ivory py-12 md:py-16" aria-labelledby="boutique-title">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-sage">{t.collectionEyebrow}</p>
            <h2 id="boutique-title" className="mt-3 font-serif text-4xl leading-snug md:text-6xl">
              {t.collectionTitle}
            </h2>
            <p className="mt-4 font-serif text-2xl text-espresso/80">{t.collectionItalic}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-sage">{t.collectionNote}</p>
          </div>
          <div className="flex w-full flex-col gap-3 md:w-auto md:items-end">
            <label className="sr-only" htmlFor="recherche-soin">
              {t.searchLabel}
            </label>
            <div className="relative w-full md:w-80">
              <Search
                size={18}
                strokeWidth={1.75}
                className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-sage"
                aria-hidden="true"
              />
              <input
                id="recherche-soin"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.searchLabel}
                className="w-full border border-espresso/25 bg-paper py-3 ps-10 pe-3 text-base outline-none placeholder:text-espresso/40"
              />
            </div>
            <label className="text-xs uppercase tracking-[0.14em] text-sage">
              {t.sortLabel}
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="ms-2 bg-transparent text-espresso"
                aria-label={t.sortLabel}
              >
                <option value="mise-en-avant">{t.sortFeatured}</option>
                <option value="prix-asc">{t.sortAsc}</option>
                <option value="prix-desc">{t.sortDesc}</option>
              </select>
            </label>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label={t.filterLabel}>
          {categoryIds.map((id) => {
            const selected = category === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                onClick={() => onCategory(id)}
                className={`min-h-12 px-5 text-base font-medium ${
                  selected ? "bg-espresso text-ivory" : "border border-line bg-paper text-espresso"
                }`}
              >
                {t.categories[id]}
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <p className="mt-16 font-serif text-3xl">{t.emptySearch}</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product) => (
              <ProductCard
                key={product.id}
                product={localizeProduct(product, lang)}
                onOpen={() => onOpen(product)}
                onAdd={() => addItem(product, product.variants[0]?.id || null, 1)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
