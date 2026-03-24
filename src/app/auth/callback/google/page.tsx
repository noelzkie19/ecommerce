"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/infrastructure/supabase/client";
import { authService } from "@/features/auth";

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handle = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        console.error("Supabase session error:", error);
        router.replace("/login?error=supabase_failed");
        return;
      }

      try {
        const supabaseUser = data.session.user;

        // ✅ identity_data.sub is the real Google account ID
        const googleId =
          supabaseUser.user_metadata?.sub ??
          supabaseUser.identities?.[0]?.identity_data?.sub ??
          supabaseUser.id;

        // Read referral code from sessionStorage (set by GoogleButton or useRegister)
        let referralCode: string | null = null;
        try {
          referralCode = sessionStorage.getItem("affiliate_ref");
        } catch {
          // ignore
        }

        const result = await authService.googleLogin({
          email: supabaseUser.email!,
          fullName:
            supabaseUser.user_metadata?.full_name ??
            supabaseUser.user_metadata?.name ??
            "",
          googleId,
          referralCode: referralCode ?? undefined,
        });

        const user = result.user;

        // Check for redirect param from middleware (preserves destination after auth)
        const redirectParam = searchParams.get("redirect");

        if (user?.role === "admin") {
          router.replace("/admin/dashboard");
        } else if (user?.isAffiliate && user?.affiliateStatus === "active") {
          router.replace("/affiliate/dashboard");
        } else if (
          user?.isAffiliate &&
          user?.affiliatePaymentStatus === "paid"
        ) {
          router.replace("/affiliate/onboarding?status=paid");
        } else if (user?.isAffiliate) {
          // Use redirect param if present (from middleware), otherwise default to onboarding
          const onboardingUrl =
            redirectParam ||
            (referralCode
              ? `/affiliate/onboarding?ref=${encodeURIComponent(referralCode)}`
              : "/affiliate/onboarding");
          router.replace(onboardingUrl);
        } else if (referralCode) {
          router.replace(
            `/affiliate/onboarding?ref=${encodeURIComponent(referralCode)}`,
          );
        } else if (redirectParam) {
          // Redirect to the originally intended destination
          router.replace(redirectParam);
        } else {
          router.replace("/");
        }
      } catch (err: any) {
        console.error("Backend status:", err.response?.status);
        console.error("Backend error:", err.response?.data);
        console.error("Error message:", err.message);
        router.replace("/login?error=backend_failed");
      }
    };

    handle();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Signing you in...</p>
      </div>
    </div>
  );
}

// Wrap in Suspense to support useSearchParams
export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Signing you in...</p>
          </div>
        </div>
      }
    >
      <GoogleCallbackContent />
    </Suspense>
  );
}
