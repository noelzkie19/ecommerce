"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { tokenStorage } from "@/infrastructure/storage/tokenStorage";
import { authApi } from "@/infrastructure/api/auth.api";
import { affiliatesApi } from "@/infrastructure/api/affiliate.api";

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { setUser, setHydrated } = useAuthStore();

  useEffect(() => {
    const token = tokenStorage.getAccessToken();
    if (!token) {
      setHydrated();
      return;
    }

    const hydrate = async () => {
      try {
        console.log("[AuthProvider] Hydrating with token exists");

        const { data } = await authApi.me();
        const user = (data as any)?.data?.user ?? (data as any)?.user;

        console.log(
          "[AuthProvider] /api/auth/me returned:",
          user?.email,
          "ID:",
          user?.id,
        );

        if (!user) {
          setHydrated();
          return;
        }

        console.log("[AuthProvider] Hydrated with user:", user.email, {
          role: user.role,
          isAffiliate: user.isAffiliate,
        });

        if (user.role === "admin") {
          setUser(user);
        } else {
          // For regular users, also fetch affiliate status
          try {
            const { data: affiliateData } = await affiliatesApi.getMyStatus();
            const affiliate = (affiliateData as any)?.data ?? affiliateData;

            console.log("[AuthProvider] Affiliate status:", affiliate);

            if (affiliate) {
              setUser({
                ...user,
                isAffiliate: true,
                affiliateStatus: affiliate.status ?? null,
                affiliatePaymentStatus: affiliate.paymentStatus ?? null,
              });
            } else {
              setUser({ ...user, isAffiliate: false });
            }
          } catch {
            // No affiliate record — regular user
            setUser({ ...user, isAffiliate: false });
          }
        }
      } catch (err) {
        console.log("[AuthProvider] Hydration failed:", err);
        tokenStorage.clear();
      } finally {
        setHydrated();
      }
    };

    hydrate();
  }, []);

  return <>{children}</>;
}
