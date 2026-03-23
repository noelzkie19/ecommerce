"use client";

import { useEffect } from "react";
import { initMetaPixel, trackPageView, getPixelId } from "@/lib/meta-pixel";

const BASE_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function BaseMetaPixel() {
  useEffect(() => {
    // Only initialize if:
    // 1. A base pixel ID is configured
    // 2. No affiliate pixel is already active
    if (!BASE_PIXEL_ID) {
      console.warn("[BaseMetaPixel] No NEXT_PUBLIC_META_PIXEL_ID configured");
      return;
    }

    const currentPixelId = getPixelId();
    if (currentPixelId) {
      // Affiliate pixel is already active, don't override
      return;
    }

    // Initialize base pixel
    initMetaPixel(BASE_PIXEL_ID);
    trackPageView();
  }, []);

  return null;
}
