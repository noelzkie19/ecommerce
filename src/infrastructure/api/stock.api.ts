import { apiClient } from "@/infrastructure/api/client";
import type { StockResponse, UpdateStockPayload } from "@/types/stock.types";

export const stockApi = {
  getAll: (params?: { page?: number; limit?: number; search?: string }) =>
    apiClient.get<StockResponse>("/api/stocks", { params }),

  update: (productId: string, payload: UpdateStockPayload) =>
    apiClient.patch<StockResponse>(`/api/stocks/${productId}`, payload),
};
