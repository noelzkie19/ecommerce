import { apiClient } from "./client";
import type {
  AffiliateDashboard,
  AffiliateProfile,
  AffiliateCashout,
  AffiliateCashoutRequest,
} from "@/types/affiliate-dashboard.types";

export const affiliateDashboardApi = {
  /** GET /api/affiliates/me — Get current user's affiliate status (dashboard data) */
  getDashboard: () => apiClient.get<AffiliateDashboard>("/api/affiliates/me"),

  /** GET /api/affiliates/me — Get profile */
  getProfile: () => apiClient.get<AffiliateProfile>("/api/affiliates/me"),

  /** GET /api/affiliates/me/link — Get referral link */
  getReferralLink: () =>
    apiClient.get<{
      referralLink: string;
      referralCode: string;
      affiliateLink?: string;
      affiliateLinkCode?: string;
    }>("/api/affiliates/me/link"),

  /** GET /api/affiliates/me/cashouts — Get cashout history */
  getCashouts: () =>
    apiClient.get<AffiliateCashout[]>("/api/affiliates/me/cashouts"),

  /** POST /api/affiliates/me/cashouts — Request cashout */
  requestCashout: (dto: AffiliateCashoutRequest) =>
    apiClient.post<AffiliateCashout>("/api/affiliates/me/cashouts", dto),

  /** POST /api/affiliates/payment/create — create PayMongo payment for registration fee */
  register: (callbackUrl?: string, referralCode?: string) =>
    apiClient.post<{
      redirectUrl: string;
      qrCodeUrl?: string;
      paymentIntentId: string;
    }>("/api/affiliates/payment/create", { callbackUrl, referralCode }),

  /** GET /api/affiliates/payment/verify — verify registration payment */
  verifyRegistrationPayment: (intentId: string, userId?: string) => {
    const params = new URLSearchParams({ intentId });
    if (userId) params.append("userId", userId);
    return apiClient.get<{
      success: boolean;
      status: string;
      alreadyConfirmed?: boolean;
    }>(`/api/affiliates/payment/verify?${params.toString()}`);
  },
};
