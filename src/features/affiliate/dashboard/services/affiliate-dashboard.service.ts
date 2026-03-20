import { affiliateDashboardApi } from "@/infrastructure/api/affiliate-dashboard.api";
import { affiliatesApi } from "@/infrastructure/api/affiliate.api";
import { extractData } from "@/infrastructure/mappers";
import type {
  AffiliateDashboard,
  AffiliateProfile,
  AffiliateCashout,
  AffiliateCashoutRequest,
} from "@/types/affiliate-dashboard.types";

const getData = <T>(response: { data: unknown }): T => {
  const body =
    (response.data as Record<string, unknown>)?.data ?? response.data;
  return body as T;
};

export const affiliateDashboardService = {
  getDashboard: async (): Promise<AffiliateDashboard> => {
    const response = await affiliateDashboardApi.getDashboard();
    return getData<AffiliateDashboard>(response);
  },

  getProfile: async (): Promise<AffiliateProfile> => {
    const response = await affiliateDashboardApi.getProfile();
    return getData<AffiliateProfile>(response);
  },

  getReferralLink: async (): Promise<{
    referralLink: string;
    referralCode: string;
  }> => {
    const response = await affiliateDashboardApi.getReferralLink();
    const body = getData<{
      affiliateLink?: string;
      referralLink?: string;
      affiliateLinkCode?: string;
      referralCode?: string;
    }>(response);
    return {
      referralLink: body.affiliateLink || body.referralLink || "",
      referralCode: body.affiliateLinkCode || body.referralCode || "",
    };
  },

  getCashouts: async (): Promise<AffiliateCashout[]> => {
    const response = await affiliateDashboardApi.getCashouts();
    const body = getData<AffiliateCashout[]>(response);
    return Array.isArray(body) ? body : [];
  },

  requestCashout: async (
    dto: AffiliateCashoutRequest,
  ): Promise<AffiliateCashout> => {
    const response = await affiliateDashboardApi.requestCashout(dto);
    return getData<AffiliateCashout>(response);
  },

  updatePixelId: async (pixelId: string): Promise<{ pixelId: string }> => {
    const response = await affiliatesApi.updateMyPixelId(pixelId);
    return getData<{ pixelId: string }>(response);
  },

  register: async (
    referralCode?: string,
  ): Promise<{
    redirectUrl: string;
    qrCodeUrl?: string;
    paymentIntentId: string;
  }> => {
    const params = new URLSearchParams();
    if (referralCode) params.set("affiliateLink", referralCode);
    const callbackUrl = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/affiliates/payment/verify?${params.toString()}`
      : undefined;
    const response = await affiliateDashboardApi.register(
      callbackUrl,
      referralCode,
    );
    return getData<{
      redirectUrl: string;
      qrCodeUrl?: string;
      paymentIntentId: string;
    }>(response);
  },

  verifyRegistrationPayment: async (
    intentId: string,
    userId?: string,
  ): Promise<{
    success: boolean;
    status: string;
    alreadyConfirmed?: boolean;
  }> => {
    const response = await affiliateDashboardApi.verifyRegistrationPayment(
      intentId,
      userId,
    );
    return (
      extractData<{
        success: boolean;
        status: string;
        alreadyConfirmed?: boolean;
      }>(response.data) ?? { success: false, status: "error" }
    );
  },
};
