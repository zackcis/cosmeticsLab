import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const dialogStack = [];

export function useDialog(active, ref, onClose) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!active) return undefined;

    const entry = { id: Symbol("dialog") };
    dialogStack.push(entry);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previouslyFocused = document.activeElement;

    function getFocusable() {
      const root = ref.current;
      if (!root) return [];
      return [...root.querySelectorAll(FOCUSABLE)].filter((element) => !element.disabled);
    }

    const timer = window.setTimeout(() => {
      if (dialogStack[dialogStack.length - 1] !== entry) return;
      const items = getFocusable();
      (items[0] || ref.current)?.focus();
    }, 30);

    function onKey(event) {
      if (dialogStack[dialogStack.length - 1] !== entry) return;
      const root = ref.current;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !root) return;
      const items = getFocusable();
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey, true);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey, true);
      const index = dialogStack.indexOf(entry);
      if (index !== -1) dialogStack.splice(index, 1);
      document.body.style.overflow = dialogStack.length ? "hidden" : previousOverflow;
      if (dialogStack.length === 0 && previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [active, ref]);
}
