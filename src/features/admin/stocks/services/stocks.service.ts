import { stockApi } from "@/infrastructure/api/stock.api";
import type { StockResponse, UpdateStockPayload } from "@/types/stock.types";

export const stocksService = {
  async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<StockResponse> {
    const { data } = await stockApi.getAll(params);
    return {
      stock: (data as any).data?.stock ?? [],
      stats: (data as any).data?.stats ?? {
        totalStock: 0,
        outOfStock: 0,
        lowStock: 0,
      },
      meta: (data as any).data?.meta ?? {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    };
  },

  async update(productId: string, payload: UpdateStockPayload): Promise<void> {
    await stockApi.update(productId, payload);
  },
};
