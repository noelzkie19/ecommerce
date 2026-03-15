import { apiClient } from "./client";
import type {
  AffiliateSale,
  AffiliateSalesResponse,
  AffiliateSaleStatus,
} from "@/types/affiliate-sales.types";

export const affiliateSalesApi = {
  getAll: (params?: {
    page?: number;
    limit?: number;
    affiliateId?: string;
    status?: AffiliateSaleStatus;
    search?: string;
  }) =>
    apiClient.get<AffiliateSalesResponse>("/api/affiliate-sales", { params }),

  getById: (id: string) =>
    apiClient.get<AffiliateSale>(`/api/affiliate-sales/${id}`),

  updateStatus: (id: string, status: AffiliateSaleStatus) =>
    apiClient.patch<AffiliateSale>(`/api/affiliate-sales/${id}/status`, {
      status,
    }),

  approve: (id: string) =>
    apiClient.patch<AffiliateSale>(`/api/affiliate-sales/${id}/approve`),

  reject: (id: string) =>
    apiClient.patch<AffiliateSale>(`/api/affiliate-sales/${id}/reject`),

  delete: (id: string) => apiClient.delete(`/api/affiliate-sales/${id}`),
};
