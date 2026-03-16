import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import type { RegisterInput } from "../schemas/auth.schema";
import type { AuthUser } from "@/types/auth.types";

interface UseRegisterOptions {
  /** Affiliate referral code — passed via ?ref= on the /register page */
  referralCode?: string;
}

/** Determines where to redirect after successful registration */
function getRedirectPath(user: AuthUser, referralCode?: string): string | null {
  // Admin users go to admin dashboard
  if (user.role === "admin") {
    return "/admin/dashboard";
  }

  // Active affiliates go to their dashboard
  if (user.isAffiliate && user.affiliateStatus === "active") {
    return "/affiliate/dashboard";
  }

  // Paid affiliates (waiting for approval) go to onboarding with paid status
  if (user.isAffiliate && user.affiliatePaymentStatus === "paid") {
    return "/affiliate/onboarding?status=paid";
  }

  // Pending affiliates go to onboarding — preserve referral code if present
  if (user.isAffiliate) {
    return referralCode
      ? `/affiliate/onboarding?ref=${encodeURIComponent(referralCode)}`
      : "/affiliate/onboarding";
  }

  // Regular user — if they came via referral, send them to onboarding
  if (referralCode) {
    return `/affiliate/onboarding?ref=${encodeURIComponent(referralCode)}`;
  }

  // Otherwise go to home
  return "/";
}

export function useRegister({ referralCode }: UseRegisterOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const register = async (payload: RegisterInput) => {
    setLoading(true);
    setError("");
    try {
      // Include referralCode in the payload for the backend
      const registerPayload = {
        ...payload,
        referralCode,
      };
      const data = await authService.register(registerPayload);

      // Persist the referral code in sessionStorage so the onboarding page
      // can pick it up even if the URL param is lost during navigation.
      if (referralCode) {
        try {
          sessionStorage.setItem("affiliate_ref", referralCode);
        } catch {
          // sessionStorage may be unavailable — ignore
        }
      }

      // Determine and execute redirect (default to "/" if null)
      const redirectPath = getRedirectPath(data.user, referralCode) || "/";
      console.log("[useRegister] Redirect decision:", {
        userRole: data.user.role,
        isAffiliate: data.user.isAffiliate,
        affiliateStatus: data.user.affiliateStatus,
        affiliatePaymentStatus: data.user.affiliatePaymentStatus,
        referralCode,
        redirectPath,
      });
      router.push(redirectPath);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}
