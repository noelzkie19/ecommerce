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

const getData = <T>(response: { data: unknown }): T => {
  const body =
    (response.data as Record<string, unknown>)?.data ?? response.data;
  return body as T;
};

const getPaginatedData = <T>(response: {
  data: unknown;
}): { data: T[]; meta: AffiliatesResponse["meta"] } => {
  const body = response.data as Record<string, unknown>;
  const records =
    (body?.data as Record<string, unknown>)?.data ?? (body?.data as T[]) ?? [];
  const meta = (body?.data as Record<string, unknown>)?.meta ??
    (body?.meta as Record<string, unknown>) ?? {
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    };
  return {
    data: Array.isArray(records) ? (records as T[]) : [],
    meta: meta as AffiliatesResponse["meta"],
  };
};

export const affiliatesService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }): Promise<AffiliatesResponse> => {
    const response = await affiliatesApi.getAll(params);
    return getPaginatedData<Affiliate>(response);
  },

  getById: async (id: string): Promise<Affiliate> => {
    const response = await affiliatesApi.getById(id);
    return getData<Affiliate>(response);
  },

  create: async (dto: CreateAffiliateDTO): Promise<Affiliate> => {
    const response = await affiliatesApi.create(dto);
    return getData<Affiliate>(response);
  },

  update: async (id: string, dto: UpdateAffiliateDTO): Promise<Affiliate> => {
    const response = await affiliatesApi.update(id, dto);
    return getData<Affiliate>(response);
  },

  delete: async (id: string): Promise<void> => {
    await affiliatesApi.delete(id);
  },

  suspend: async (id: string): Promise<Affiliate> => {
    const response = await affiliatesApi.suspend(id);
    return getData<Affiliate>(response);
  },

  activate: async (id: string): Promise<Affiliate> => {
    const response = await affiliatesApi.activate(id);
    return getData<Affiliate>(response);
  },

  getProducts: async (affiliateId: string): Promise<AffiliateProduct[]> => {
    const response = await affiliatesApi.getProducts(affiliateId);
    return getData<AffiliateProduct[]>(response);
  },

  assignProduct: async (
    affiliateId: string,
    dto: AssignProductDTO,
  ): Promise<AffiliateProduct> => {
    const response = await affiliatesApi.assignProduct(affiliateId, dto);
    return getData<AffiliateProduct>(response);
  },

  removeProduct: async (
    affiliateId: string,
    productId: string,
  ): Promise<void> => {
    await affiliatesApi.removeProduct(affiliateId, productId);
  },

  getAuthUsers: async (): Promise<AuthUser[]> => {
    const response = await affiliatesApi.getAuthUsers();
    return getData<AuthUser[]>(response);
  },
};
