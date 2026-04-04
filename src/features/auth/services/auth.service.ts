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

    if (affiliate) {
      return {
        ...user,
        isAffiliate: true,
        affiliateStatus: affiliate.status ?? null,
        affiliatePaymentStatus: affiliate.paymentStatus ?? null,
      };
    }
  } catch {
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
    tokenStorage.clear(); // Clear any existing tokens first
    tokenStorage.set(result.accessToken, result.refreshToken);

    const enriched = await enrichWithAffiliateStatus(result.user);
    useAuthStore.getState().setUser(enriched);
    return { ...result, user: enriched };
  },

  async googleLogin(payload: {
    email: string;
    fullName: string;
    googleId: string;
    referralCode?: string;
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
