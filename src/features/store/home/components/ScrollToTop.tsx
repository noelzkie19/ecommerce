"use client";

import { ChevronUp } from "lucide-react";
import { useScrollToTopVisible } from "../hooks/useScrollToTopVisible";

export const ScrollToTop = () => {
  const visible = useScrollToTopVisible();

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={[
        "fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50",
        "w-11 h-11 sm:w-12 sm:h-12",
        "bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-2xl",
        "shadow-lg shadow-orange-300 flex items-center justify-center transition-all duration-300",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none",
      ].join(" ")}
    >
      <ChevronUp size={20} />
    </button>
  );
};
