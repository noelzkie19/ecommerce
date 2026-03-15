import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import type { RegisterInput } from "../schemas/auth.schema";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const register = async (payload: RegisterInput) => {
    setLoading(true);
    setError("");
    try {
      const data = await authService.register(payload);

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
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}
