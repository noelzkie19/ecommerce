"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { initMetaPixel, trackPageView, getPixelId } from "@/lib/meta-pixel";
import { affiliatesApi } from "@/infrastructure/api/affiliate.api";

// ── Helpers ──────────────────────────────────────────────────────────────────

function storeTrackingSession(
  pixelId: string,
  referralCode?: string | null,
  storeId?: string | null,
) {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem("affiliate_pixel_id", pixelId);
  if (referralCode)
    sessionStorage.setItem("affiliate_referral_code", referralCode);
  if (storeId) sessionStorage.setItem("affiliate_store_id", storeId);
}

function initAndTrack(pixelId: string, referralCode?: string | null) {
  initMetaPixel(pixelId, referralCode || undefined);
  trackPageView();
}

function handleDirectPixel(
  pixelId: string,
  referralCode: string | null,
  storeId: string | null,
) {
  storeTrackingSession(pixelId, referralCode, storeId);
  initAndTrack(pixelId, referralCode);
}

function handleStoreIdLookup(storeId: string, referralCode: string | null) {
  if (referralCode && typeof sessionStorage !== "undefined") {
    sessionStorage.setItem("affiliate_referral_code", referralCode);
    sessionStorage.setItem("affiliate_store_id", storeId);
  }

  affiliatesApi
    .getByStoreId(storeId)
    .then((res) => {
      const data = (res.data as any)?.data ?? res.data;
      const resolvedPixelId: string | undefined = data?.pixelId;
      const resolvedReferralCode: string | undefined =
        referralCode || data?.referralCode;

      if (resolvedPixelId) {
        storeTrackingSession(resolvedPixelId, resolvedReferralCode, storeId);
        initAndTrack(resolvedPixelId, resolvedReferralCode);
      }
    })
    .catch(() => {
      // Silently fail — tracking is best-effort
    });
}

function restoreFromSession() {
  if (typeof sessionStorage === "undefined") return;
  const storedPixelId = sessionStorage.getItem("affiliate_pixel_id");
  const storedReferralCode = sessionStorage.getItem("affiliate_referral_code");

  if (storedPixelId && !getPixelId()) {
    initAndTrack(storedPixelId, storedReferralCode);
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

const AffiliateTrackingInner = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const referralCode = searchParams.get("ref");
    const pixelId = searchParams.get("pixel");
    const storeId = searchParams.get("store");

    if (pixelId) {
      handleDirectPixel(pixelId, referralCode, storeId);
    } else if (storeId) {
      handleStoreIdLookup(storeId, referralCode);
    } else {
      restoreFromSession();
    }
  }, [searchParams]);

  return null;
};

const AffiliateTrackingFallback = () => null;

export function AffiliateTracking() {
  return (
    <Suspense fallback={<AffiliateTrackingFallback />}>
      <AffiliateTrackingInner />
    </Suspense>
  );
}

export function useAffiliateTracking(): {
  referralCode: string | null;
  pixelId: string | null;
  storeId: string | null;
} {
  if (globalThis.window !== undefined) {
    const storage = globalThis.sessionStorage ?? null;

    return {
      referralCode: storage?.getItem("affiliate_referral_code") ?? null,
      pixelId: storage?.getItem("affiliate_pixel_id") ?? null,
      storeId: storage?.getItem("affiliate_store_id") ?? null,
    };
  }

  return {
    referralCode: null,
    pixelId: null,
    storeId: null,
  };
}
