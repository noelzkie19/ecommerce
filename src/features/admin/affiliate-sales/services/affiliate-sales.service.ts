import { affiliateSalesApi } from "@/infrastructure/api/affiliate-sales.api";
import type {
  AffiliateSale,
  AffiliateSalesResponse,
  AffiliateSaleStatus,
  CommissionType,
} from "@/types/affiliate-sales.types";

const mapAffiliateSale = (raw: Record<string, unknown>): AffiliateSale => ({
  id: raw.id as string,
  affiliateId: raw.affiliate_id as string,
  orderId: raw.order_id as string,
  orderItemId: raw.order_item_id as string,
  productId: raw.product_id as string,
  quantity: raw.quantity as number,
  saleAmount: raw.sale_amount as number,
  commissionType: raw.commission_type as CommissionType,
  commissionValue: raw.commission_value as number,
  commissionEarned: raw.commission_earned as number,
  status: raw.status as AffiliateSaleStatus,
  createdAt: raw.created_at as string,
  updatedAt: raw.updated_at as string,
  affiliate: raw.affiliate as AffiliateSale["affiliate"],
  product: raw.product as AffiliateSale["product"],
  order: raw.order as AffiliateSale["order"],
});

const mapAffiliateSalesResponse = (
  raw: Record<string, unknown>,
): AffiliateSalesResponse => {
  const records =
    (raw.data as Record<string, unknown>)?.data ??
    (raw.data as unknown[]) ??
    [];
  const meta = (raw.data as Record<string, unknown>)?.meta ??
    (raw.meta as Record<string, unknown>) ?? {
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    };
  return {
    data: Array.isArray(records)
      ? records.map((r) => mapAffiliateSale(r as Record<string, unknown>))
      : [],
    meta: meta as AffiliateSalesResponse["meta"],
  };
};

const getData = <T>(response: { data: unknown }): T => {
  const body =
    (response.data as Record<string, unknown>)?.data ?? response.data;
  return body as T;
};

export const affiliateSalesService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    affiliateId?: string;
    status?: AffiliateSaleStatus;
    search?: string;
  }): Promise<AffiliateSalesResponse> => {
    const response = await affiliateSalesApi.getAll(params);
    const data = getData<Record<string, unknown>>(response);
    return mapAffiliateSalesResponse(data);
  },

  getById: async (id: string): Promise<AffiliateSale> => {
    const response = await affiliateSalesApi.getById(id);
    const data = getData<Record<string, unknown>>(response);
    return mapAffiliateSale(data);
  },

  updateStatus: async (
    id: string,
    status: AffiliateSaleStatus,
  ): Promise<AffiliateSale> => {
    const response = await affiliateSalesApi.updateStatus(id, status);
    const data = getData<Record<string, unknown>>(response);
    return mapAffiliateSale(data);
  },

  approve: async (id: string): Promise<AffiliateSale> => {
    const response = await affiliateSalesApi.approve(id);
    const data = getData<Record<string, unknown>>(response);
    return mapAffiliateSale(data);
  },

  reject: async (id: string): Promise<AffiliateSale> => {
    const response = await affiliateSalesApi.reject(id);
    const data = getData<Record<string, unknown>>(response);
    return mapAffiliateSale(data);
  },

  delete: async (id: string): Promise<void> => {
    await affiliateSalesApi.delete(id);
  },
};
