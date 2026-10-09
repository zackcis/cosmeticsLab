import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { copy } from "./copy.js";

const STORAGE_KEY = "maison-nera-lang";
const LanguageContext = createContext(null);

function readLang() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "ar" ? "ar" : "fr";
  } catch {
    return "fr";
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readLang);
  const t = copy[lang];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = t.metaTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.metaDescription);
  }, [lang, t.metaTitle, t.metaDescription]);

  const value = useMemo(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      t,
      setLang(next) {
        setLangState(next === "ar" ? "ar" : "fr");
      },
    }),
    [lang, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
