"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/infrastructure/supabase/client";
import { authService } from "@/features/auth";

export default function GoogleCallbackPage() {
  const router = useRouter();

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

        const result = await authService.googleLogin({
          email: supabaseUser.email!,
          fullName:
            supabaseUser.user_metadata?.full_name ??
            supabaseUser.user_metadata?.name ??
            "",
          googleId,
        });

        const user = result.user;

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
          router.replace("/affiliate/onboarding");
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
