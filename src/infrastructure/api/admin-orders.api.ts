import { apiClient } from "./client";
import type {
  Order,
  OrdersResponse,
  UpdateOrderStatusPayload,
} from "@/types/order.types";

export const adminOrdersApi = {
  getAllAdmin: (params?: { page?: number; limit?: number; status?: string }) =>
    apiClient.get<OrdersResponse>("/api/orders/admin/all", { params }),

  updateStatus: (id: string, payload: UpdateOrderStatusPayload) =>
    apiClient.patch<Order>(`/api/orders/admin/${id}/status`, payload),

  getMyOrders: () => apiClient.get<Order[]>("/api/orders"),

  getById: (id: string) => apiClient.get<Order>(`/api/orders/${id}`),
};
