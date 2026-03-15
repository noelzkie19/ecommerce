import { affiliatesApi } from "@/infrastructure/api/affiliate.api";
import type {
  Affiliate,
  AffiliatesResponse,
  AffiliateProduct,
  CreateAffiliateDTO,
  UpdateAffiliateDTO,
  AssignProductDTO,
  AuthUser,
} from "@/types/affiliate.types";

export const affiliatesService = {
  // ── Affiliates ──────────────────────────────────────────────────────────────

  async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }): Promise<AffiliatesResponse> {
    const { data } = await affiliatesApi.getAll(params);
    const body = data as any;

    // Handle both { data: { data: [], meta: {} } } and { data: [], meta: {} }
    const records = body?.data?.data ?? body?.data ?? [];
    const meta = body?.data?.meta ??
      body?.meta ?? {
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      };

    return { data: Array.isArray(records) ? records : [], meta };
  },

  async getById(id: string): Promise<Affiliate> {
    const { data } = await affiliatesApi.getById(id);
    return (data as any).data ?? data;
  },

  async create(dto: CreateAffiliateDTO): Promise<Affiliate> {
    const { data } = await affiliatesApi.create(dto);
    return (data as any).data ?? data;
  },

  async update(id: string, dto: UpdateAffiliateDTO): Promise<Affiliate> {
    const { data } = await affiliatesApi.update(id, dto);
    return (data as any).data ?? data;
  },

  async delete(id: string): Promise<void> {
    await affiliatesApi.delete(id);
  },

  async suspend(id: string): Promise<Affiliate> {
    const { data } = await affiliatesApi.suspend(id);
    return (data as any).data ?? data;
  },

  async activate(id: string): Promise<Affiliate> {
    const { data } = await affiliatesApi.activate(id);
    return (data as any).data ?? data;
  },

  // ── Affiliate Products ──────────────────────────────────────────────────────

  async getProducts(affiliateId: string): Promise<AffiliateProduct[]> {
    const { data } = await affiliatesApi.getProducts(affiliateId);
    return (data as any).data ?? data;
  },

  async assignProduct(
    affiliateId: string,
    dto: AssignProductDTO,
  ): Promise<AffiliateProduct> {
    const { data } = await affiliatesApi.assignProduct(affiliateId, dto);
    return (data as any).data ?? data;
  },

  async removeProduct(affiliateId: string, productId: string): Promise<void> {
    await affiliatesApi.removeProduct(affiliateId, productId);
  },

  // ── Auth users ──────────────────────────────────────────────────────────────

  async getAuthUsers(): Promise<AuthUser[]> {
    const { data } = await affiliatesApi.getAuthUsers();
    return (data as any).data ?? data;
  },
};
