"use client";

import { useState, useEffect } from "react";

export const useScrollToTopVisible = (threshold = 400): boolean => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return visible;
};
