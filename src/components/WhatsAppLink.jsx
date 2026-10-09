export default function WhatsAppLink({ href, onFallback, className, children, ariaLabel }) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onFallback} className={className} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
