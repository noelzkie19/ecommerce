import { productsApi } from "@/infrastructure/api/products.api";
import type { DashboardStats, RecentOrder } from "@/types/dashboard.types";

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    // Use admin endpoint to get total products count
    const response = await productsApi.getAllAdmin({ page: 1, limit: 1 });
    return {
      totalProducts: response.data.meta.total,
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
    };
  },

  getRecentOrders: async (): Promise<RecentOrder[]> => {
    return [];
  },
};
