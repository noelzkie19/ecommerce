import { apiClient } from "./client";
import type {
  AffiliateDashboard,
  AffiliateProfile,
  AffiliateCashout,
  AffiliateCashoutRequest,
} from "@/types/affiliate-dashboard.types";

export const affiliateDashboardApi = {
  /** GET /api/affiliate/dashboard — stats + chart for the logged-in affiliate */
  getDashboard: () =>
    apiClient.get<AffiliateDashboard>("/api/affiliate/dashboard"),

  /** GET /api/affiliate/profile */
  getProfile: () => apiClient.get<AffiliateProfile>("/api/affiliate/profile"),

  /** GET /api/affiliate/referral-link */
  getReferralLink: () =>
    apiClient.get<{ referralLink: string; referralCode: string }>(
      "/api/affiliate/referral-link",
    ),

  /** GET /api/affiliate/cashouts */
  getCashouts: () =>
    apiClient.get<AffiliateCashout[]>("/api/affiliate/cashouts"),

  /** POST /api/affiliate/cashouts */
  requestCashout: (dto: AffiliateCashoutRequest) =>
    apiClient.post<AffiliateCashout>("/api/affiliate/cashouts", dto),

  /** POST /api/affiliates/payment/create — create PayMongo payment for registration fee */
  register: () =>
    apiClient.post<{
      redirectUrl: string;
      qrCodeUrl?: string;
      paymentIntentId: string;
    }>("/api/affiliates/payment/create"),

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
