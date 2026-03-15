import { apiClient } from './client'
import type { ProductsResponse } from '@/types/product.types'

export const dashboardApi = {
  getProducts: (params?: { page?: number; limit?: number }) =>
    apiClient.get<ProductsResponse>('/api/products/admin', { params }),

  // Add real orders API here when ready
  // getRecentOrders: () => apiClient.get('/api/orders/admin', { params: { limit: 10 } }),
}