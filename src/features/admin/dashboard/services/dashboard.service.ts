import { dashboardApi } from "@/infrastructure/api/dashboard.api";
import type { DashboardStats, RecentOrder } from "@/types/dashboard.types";

const getData = <T>(response: { data: unknown }): T => {
  const body =
    (response.data as Record<string, unknown>)?.data ?? response.data;
  return body as T;
};

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await dashboardApi.getProducts({ page: 1, limit: 1 });
    const data = getData<{ meta: { total: number } }>(response);
    return {
      totalProducts: data.meta.total,
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
    };
  },

  getRecentOrders: async (): Promise<RecentOrder[]> => {
    return [];
  },
};
