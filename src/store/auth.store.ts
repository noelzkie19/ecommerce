import { create } from "zustand";
import type { AuthUser } from "@/types/auth.types";

interface AuthState {
  user: AuthUser | null;
  isHydrated: boolean;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
  setHydrated: () => void;
  isAdmin: () => boolean;
  isAffiliate: () => boolean;
  isActiveAffiliate: () => boolean;
  needsOnboarding: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isHydrated: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setHydrated: () => set({ isHydrated: true }),
  isAdmin: () => get().user?.role === "admin",
  isAffiliate: () => get().user?.isAffiliate === true,
  isActiveAffiliate: () =>
    get().user?.isAffiliate === true &&
    get().user?.affiliateStatus === "active",
  needsOnboarding: () => {
    const user = get().user;
    if (!user?.isAffiliate) return false;
    // Needs onboarding if: pending (hasn't paid) or suspended
    return (
      user?.affiliateStatus === "pending" ||
      user?.affiliateStatus === "suspended"
    );
  },
}));
