import { RefObject, useEffect } from "react";

export function useCloseMenu(
  menuRef: RefObject<HTMLElement | null>,
  menuOpen: boolean,
  setMenuOpen: (open: boolean) => void,
) {
  useEffect(() => {
    if (!menuOpen) return;

    history.pushState({ menu: true }, "", location.href);

    function handleMouseDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handlePopState() {
      setMenuOpen(false);
    }

    document.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [menuOpen, menuRef, setMenuOpen]);
}
