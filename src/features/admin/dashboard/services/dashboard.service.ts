import { dashboardApi } from '@/infrastructure/api/dashboard.api'
import type { DashboardStats, RecentOrder } from '@/types/dashboard.types'

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const { data } = await dashboardApi.getProducts({ page: 1, limit: 1 })
    return {
      totalProducts: (data as any).meta.total,
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
    }
  },

  async getRecentOrders(): Promise<RecentOrder[]> {
    return []
  },
}