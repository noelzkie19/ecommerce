import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import type { LoginInput } from "../schemas/auth.schema";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const login = async (payload: LoginInput) => {
    setLoading(true);
    setError("");
    try {
      const data = await authService.login(payload);

      // Redirect based on role and affiliate status
      if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else if (
        data.user.isAffiliate &&
        data.user.affiliateStatus === "active"
      ) {
        router.push("/affiliate/dashboard");
      } else if (
        data.user.isAffiliate &&
        data.user.affiliatePaymentStatus === "paid"
      ) {
        router.push("/affiliate/onboarding?status=paid");
      } else if (data.user.isAffiliate) {
        router.push("/affiliate/onboarding");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
