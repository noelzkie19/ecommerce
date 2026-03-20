import { stockApi } from "@/infrastructure/api/stock.api";
import type { StockResponse, UpdateStockPayload } from "@/types/stock.types";

const getData = <T>(response: { data: unknown }): T => {
  const body =
    (response.data as Record<string, unknown>)?.data ?? response.data;
  return body as T;
};

export const stocksService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<StockResponse> => {
    const response = await stockApi.getAll(params);
    const data = getData<{
      stock?: unknown[];
      stats?: { totalStock: number; outOfStock: number; lowStock: number };
      meta?: { total: number; page: number; limit: number; totalPages: number };
    }>(response);
    return {
      stock: (data.stock as StockResponse["stock"]) ?? [],
      stats: data.stats ?? {
        totalStock: 0,
        outOfStock: 0,
        lowStock: 0,
      },
      meta: data.meta ?? {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    };
  },

  update: async (
    productId: string,
    payload: UpdateStockPayload,
  ): Promise<void> => {
    await stockApi.update(productId, payload);
  },
};
