"use client";

import { useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

interface UseAuthRedirectOptions {
  redirectAffiliates?: boolean;
  affiliateBasePath?: string;
  redirectAdmins?: boolean;
  adminBasePath?: string;
}

const DEFAULT_AFFILIATE_PATH = "/affiliate/dashboard";
const DEFAULT_ADMIN_PATH = "/admin/dashboard";
const DEFAULT_ONBOARDING_PATH = "/affiliate/onboarding";

export const useAuthRedirect = (options: UseAuthRedirectOptions = {}) => {
  const {
    redirectAffiliates = true,
    affiliateBasePath = DEFAULT_AFFILIATE_PATH,
    redirectAdmins = true,
    adminBasePath = DEFAULT_ADMIN_PATH,
  } = options;

  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isHydrated } = useAuthStore();

  const getRedirectPath = useCallback((): string | null => {
    if (!user) return null;

    // If the URL contains affiliate tracking params (ref or store),
    // do NOT redirect — let the visitor stay on the store page so
    // AffiliateTracking can capture the pixel/referral data.
    if (searchParams.get("ref") || searchParams.get("store")) return null;

    if (redirectAdmins && user.role === "admin") {
      return adminBasePath;
    }

    if (redirectAffiliates && user.isAffiliate) {
      if (user.affiliateStatus === "active") {
        return affiliateBasePath;
      }
      // Paid but not yet approved by admin
      if (user.affiliatePaymentStatus === "paid") {
        return "/affiliate/onboarding?status=paid";
      }
      // Pending (hasn't paid) or suspended
      if (
        user.affiliateStatus === "pending" ||
        user.affiliateStatus === "suspended"
      ) {
        return DEFAULT_ONBOARDING_PATH;
      }
    }

    return null;
  }, [
    user,
    searchParams,
    redirectAffiliates,
    redirectAdmins,
    affiliateBasePath,
    adminBasePath,
  ]);

  const redirectIfNeeded = useCallback(() => {
    const redirectPath = getRedirectPath();
    if (redirectPath) {
      router.push(redirectPath);
    }
  }, [getRedirectPath, router]);

  useEffect(() => {
    if (isHydrated) {
      redirectIfNeeded();
    }
  }, [isHydrated, redirectIfNeeded]);

  const shouldRedirect = isHydrated && getRedirectPath() !== null;

  const status = {
    isLoggedIn: !!user,
    isAdmin: user?.role === "admin",
    isAffiliate: user?.isAffiliate ?? false,
    affiliateStatus: user?.affiliateStatus ?? null,
    isHydrated,
    willRedirect: shouldRedirect,
    redirectPath: getRedirectPath(),
  };

  return { redirectIfNeeded, shouldRedirect, status };
};

export const useHomePageRedirect = () => {
  return useAuthRedirect({
    redirectAffiliates: true,
    redirectAdmins: true,
  });
};

export const useIsActiveAffiliate = (): boolean => {
  const { user, isHydrated } = useAuthStore();
  return (
    isHydrated &&
    user?.isAffiliate === true &&
    user?.affiliateStatus === "active"
  );
};

export const useNeedsOnboarding = (): boolean => {
  const { user, isHydrated } = useAuthStore();
  return (
    isHydrated &&
    user?.isAffiliate === true &&
    (user?.affiliateStatus === "pending" ||
      user?.affiliateStatus === "suspended")
  );
};
