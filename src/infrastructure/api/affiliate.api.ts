import {
  Affiliate,
  AffiliateProduct,
  AffiliatesResponse,
  AssignProductDTO,
  AuthUser,
  CreateAffiliateDTO,
  UpdateAffiliateDTO,
} from "@/types/affiliate.types";
import { apiClient } from "./client";

export const affiliatesApi = {
  // ── Affiliates ──────────────────────────────────────────────────────────────

  getAll: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }) => apiClient.get<AffiliatesResponse>("/api/affiliates", { params }),

  getById: (id: string) => apiClient.get<Affiliate>(`/api/affiliates/${id}`),

  /** Only email is sent — backend resolves name + userId from auth.users */
  create: (dto: CreateAffiliateDTO) =>
    apiClient.post<Affiliate>("/api/affiliates", dto),

  update: (id: string, dto: UpdateAffiliateDTO) =>
    apiClient.patch<Affiliate>(`/api/affiliates/${id}`, dto),

  delete: (id: string) => apiClient.delete(`/api/affiliates/${id}`),

  suspend: (id: string) =>
    apiClient.patch<Affiliate>(`/api/affiliates/${id}/suspend`),

  activate: (id: string) =>
    apiClient.patch<Affiliate>(`/api/affiliates/${id}/activate`),

  // ── Affiliate Products ──────────────────────────────────────────────────────

  getProducts: (affiliateId: string) =>
    apiClient.get<AffiliateProduct[]>(
      `/api/affiliates/${affiliateId}/products`,
    ),

  assignProduct: (affiliateId: string, dto: AssignProductDTO) =>
    apiClient.post<AffiliateProduct>(
      `/api/affiliates/${affiliateId}/products`,
      dto,
    ),

  removeProduct: (affiliateId: string, productId: string) =>
    apiClient.delete(`/api/affiliates/${affiliateId}/products/${productId}`),

  // ── Current user's affiliate status ────────────────────────────────────────

  getMyStatus: () => apiClient.get<Affiliate>("/api/affiliates/me"),

  /** PATCH /api/affiliates/me/pixel — update the logged-in affiliate's pixel ID */
  updateMyPixelId: (pixelId: string) =>
    apiClient.patch<Affiliate>("/api/affiliates/me/pixel", { pixelId }),

  // ── Public store lookup (no auth required) ─────────────────────────────────

  /** GET /api/affiliates/store/:storeId — look up affiliate pixel by storeId */
  getByStoreId: (storeId: string) =>
    apiClient.get<{ pixelId?: string; referralCode?: string }>(
      `/api/affiliates/store/${storeId}`,
    ),

  // ── Auth users (invite dropdown) ───────────────────────────────────────────

  getAuthUsers: () => apiClient.get<AuthUser[]>("/api/auth/users"),
};
