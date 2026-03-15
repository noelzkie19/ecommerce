export interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
}

export interface RecentOrder {
  id: string
  customer_name: string
  status: string
  total: number
}