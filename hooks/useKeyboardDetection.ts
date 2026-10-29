import { useState, useEffect } from "react";

export function useKeyboardDetection() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    // 1. Fallback: Listen to explicit focus events
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLInputElement;
      const nodeName = target?.nodeName;

      // Only activate the lift state for text-based keyboards
      if (
        (nodeName === "INPUT" && target.type !== "month" && target.type !== "date") ||
        nodeName === "TEXTAREA"
      ) {
        setIsKeyboardOpen(true);
      } else {
        // If they focus the month picker, immediately drop the button down
        setIsKeyboardOpen(false);
      }
    };


    const handleFocusOut = (e: FocusEvent) => {
      // Small timeout fixes a race condition when tapping from one input directly to another
      setTimeout(() => {
        if (
          document.activeElement?.nodeName !== "INPUT" &&
          document.activeElement?.nodeName !== "TEXTAREA"
        ) {
          setIsKeyboardOpen(false);
        }
      }, 50);
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    // 2. The Golden Fix: Track Visual Viewport changes (iOS & Android Safari/Chrome)
    // When the keyboard closes, the window's visual viewport height snaps back to normal.
    const originalHeight = window.visualViewport?.height || window.innerHeight;

    const handleResize = () => {
      const currentViewport = window.visualViewport;
      if (!currentViewport) return;

      // If the current viewport height is close to the original height, the keyboard is closed
      if (currentViewport.height >= originalHeight - 60) {
        setIsKeyboardOpen(false);
      } else {
        // Double-check an input is actually focused before saying it's open
        const activeNode = document.activeElement?.nodeName;
        if (activeNode === "INPUT" || activeNode === "TEXTAREA") {
          setIsKeyboardOpen(true);
        }
      }
    };

    window.visualViewport?.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);

  return isKeyboardOpen;
}
