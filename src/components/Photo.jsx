import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Photo({
  src,
  alt,
  className = "",
  eager = false,
  width = 1200,
  height = 1500,
}) {
  const [failed, setFailed] = useState(false);
  const { t } = useLanguage();

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-rose/30 ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="px-4 text-center font-serif text-lg text-espresso/50">{t.photoFallback}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
