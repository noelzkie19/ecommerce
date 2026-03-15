import { affiliateDashboardApi } from "@/infrastructure/api/affiliate-dashboard.api";
import { affiliatesApi } from "@/infrastructure/api/affiliate.api";
import { extractData } from "@/infrastructure/mappers";
import type {
  AffiliateDashboard,
  AffiliateProfile,
  AffiliateCashout,
  AffiliateCashoutRequest,
} from "@/types/affiliate-dashboard.types";

export const affiliateDashboardService = {
  async getDashboard(): Promise<AffiliateDashboard> {
    const { data } = await affiliateDashboardApi.getDashboard();
    const body = (data as any)?.data ?? data;
    return body;
  },

  async getProfile(): Promise<AffiliateProfile> {
    const { data } = await affiliateDashboardApi.getProfile();
    return (data as any)?.data ?? data;
  },

  async getReferralLink(): Promise<{
    referralLink: string;
    referralCode: string;
  }> {
    const { data } = await affiliateDashboardApi.getReferralLink();
    return (data as any)?.data ?? data;
  },

  async getCashouts(): Promise<AffiliateCashout[]> {
    const { data } = await affiliateDashboardApi.getCashouts();
    const body = (data as any)?.data ?? data;
    return Array.isArray(body) ? body : [];
  },

  async requestCashout(
    dto: AffiliateCashoutRequest,
  ): Promise<AffiliateCashout> {
    const { data } = await affiliateDashboardApi.requestCashout(dto);
    return (data as any)?.data ?? data;
  },

  async updatePixelId(pixelId: string): Promise<{ pixelId: string }> {
    const { data } = await affiliatesApi.updateMyPixelId(pixelId);
    return (data as any)?.data ?? data;
  },

  async register(): Promise<{
    redirectUrl: string;
    qrCodeUrl?: string;
    paymentIntentId: string;
  }> {
    const { data } = await affiliateDashboardApi.register();
    return (data as any)?.data ?? data;
  },

  async verifyRegistrationPayment(
    intentId: string,
    userId?: string,
  ): Promise<{ success: boolean; status: string; alreadyConfirmed?: boolean }> {
    const { data } = await affiliateDashboardApi.verifyRegistrationPayment(
      intentId,
      userId,
    );
    return (
      extractData<{
        success: boolean;
        status: string;
        alreadyConfirmed?: boolean;
      }>(data) ?? { success: false, status: "error" }
    );
  },
};
