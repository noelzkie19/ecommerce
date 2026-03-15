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
        const { data } = await authApi.me();
        const user = (data as any)?.data?.user ?? (data as any)?.user;
        if (!user) {
          setHydrated();
          return;
        }

        if (user.role === "admin") {
          setUser(user);
        } else {
          // For regular users, also fetch affiliate status
          try {
            const { data: affiliateData } = await affiliatesApi.getMyStatus();
            const affiliate = (affiliateData as any)?.data ?? affiliateData;

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
      } catch {
        tokenStorage.clear();
      } finally {
        setHydrated();
      }
    };

    hydrate();
  }, []);

  return <>{children}</>;
}
