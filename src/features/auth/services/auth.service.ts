import { authApi } from "@/infrastructure/api/auth.api";
import { affiliatesApi } from "@/infrastructure/api/affiliate.api";
import { tokenStorage } from "@/infrastructure/storage/tokenStorage";
import { useAuthStore } from "@/store/auth.store";
import type { AuthUser } from "@/types/auth.types";

const enrichWithAffiliateStatus = async (user: AuthUser): Promise<AuthUser> => {
  if (user.role === "admin") return user;

  try {
    const { data } = await affiliatesApi.getMyStatus();
    const affiliate = (data as any)?.data ?? data;

    console.log("[AuthService] Affiliate status response:", affiliate);

    if (affiliate) {
      return {
        ...user,
        isAffiliate: true,
        affiliateStatus: affiliate.status ?? null,
        affiliatePaymentStatus: affiliate.paymentStatus ?? null,
      };
    }
  } catch (err) {
    console.log("[AuthService] No affiliate record found:", err);
    // No affiliate record — regular user
  }

  return { ...user, isAffiliate: false };
};

export const authService = {
  async login(payload: { email: string; password: string }) {
    const { data } = await authApi.login(payload);
    const result = (data as any).data ?? data;
    tokenStorage.set(result.accessToken, result.refreshToken);
    const enriched = await enrichWithAffiliateStatus(result.user);
    useAuthStore.getState().setUser(enriched);
    return { ...result, user: enriched };
  },

  async register(payload: {
    email: string;
    password: string;
    fullName: string;
    referralCode?: string;
  }) {
    const { data } = await authApi.register(payload);
    const result = (data as any).data ?? data;

    // CRITICAL: Clear any existing tokens first to ensure clean state
    // This prevents the old user's session from persisting
    console.log(
      "[AuthService] Register - clearing old tokens, setting new ones",
    );
    tokenStorage.clear(); // Clear any existing tokens first
    tokenStorage.set(result.accessToken, result.refreshToken);

    const enriched = await enrichWithAffiliateStatus(result.user);
    console.log("[AuthService] Registered user with affiliate status:", {
      isAffiliate: enriched.isAffiliate,
      affiliateStatus: enriched.affiliateStatus,
      affiliatePaymentStatus: enriched.affiliatePaymentStatus,
    });
    useAuthStore.getState().setUser(enriched);
    return { ...result, user: enriched };
  },

  async googleLogin(payload: {
    email: string;
    fullName: string;
    googleId: string;
  }) {
    const { data } = await authApi.google(payload);
    const result = (data as any).data ?? data;
    tokenStorage.set(result.accessToken, result.refreshToken);
    const enriched = await enrichWithAffiliateStatus(result.user);
    useAuthStore.getState().setUser(enriched);
    return { ...result, user: enriched };
  },

  async logout() {
    try {
      await authApi.logout();
    } catch {}
    tokenStorage.clear();
    useAuthStore.getState().clearUser();
  },

  async forgotPassword(email: string) {
    await authApi.forgotPassword(email);
  },
};
