import { affiliateSalesApi } from "@/infrastructure/api/affiliate-sales.api";
import type {
  AffiliateSale,
  AffiliateSalesResponse,
  AffiliateSaleStatus,
} from "@/types/affiliate-sales.types";

// ── Mappers ──────────────────────────────────────────────────────────────────

const mapAffiliateSale = (raw: any): AffiliateSale => ({
  id: raw.id,
  affiliateId: raw.affiliate_id,
  orderId: raw.order_id,
  orderItemId: raw.order_item_id,
  productId: raw.product_id,
  quantity: raw.quantity,
  saleAmount: raw.sale_amount,
  commissionType: raw.commission_type,
  commissionValue: raw.commission_value,
  commissionEarned: raw.commission_earned,
  status: raw.status,
  createdAt: raw.created_at,
  updatedAt: raw.updated_at,
  affiliate: raw.affiliate,
  product: raw.product,
  order: raw.order,
});

const mapAffiliateSalesResponse = (raw: any): AffiliateSalesResponse => {
  // Handle both { data: { data: [], meta: {} } } and { data: [], meta: {} }
  const records = raw?.data?.data ?? raw?.data ?? [];
  const meta = raw?.data?.meta ??
    raw?.meta ?? {
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    };
  return {
    data: Array.isArray(records) ? records.map(mapAffiliateSale) : [],
    meta,
  };
};

// ── Service ──────────────────────────────────────────────────────────────────

export const affiliateSalesService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    affiliateId?: string;
    status?: AffiliateSaleStatus;
    search?: string;
  }): Promise<AffiliateSalesResponse> => {
    const res = (await affiliateSalesApi.getAll(params)) as any;
    return mapAffiliateSalesResponse(res.data.data);
  },

  getById: async (id: string): Promise<AffiliateSale> => {
    const res = (await affiliateSalesApi.getById(id)) as any;
    return mapAffiliateSale(res.data.data);
  },

  updateStatus: async (
    id: string,
    status: AffiliateSaleStatus,
  ): Promise<AffiliateSale> => {
    const res = (await affiliateSalesApi.updateStatus(id, status)) as any;
    return mapAffiliateSale(res.data.data);
  },

  approve: async (id: string): Promise<AffiliateSale> => {
    const res = (await affiliateSalesApi.approve(id)) as any;
    return mapAffiliateSale(res.data.data);
  },

  reject: async (id: string): Promise<AffiliateSale> => {
    const res = (await affiliateSalesApi.reject(id)) as any;
    return mapAffiliateSale(res.data.data);
  },

  delete: async (id: string): Promise<void> => {
    await affiliateSalesApi.delete(id);
  },
};
