import { useState, useEffect } from 'react'
import { DashboardStats, RecentOrder } from '@/types/dashboard.types'
import { dashboardService } from '../services/dashboard.service'

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const [statsData, ordersData] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getRecentOrders(),
        ])
        setStats(statsData)
        setRecentOrders(ordersData)
      } catch {
        setError('Failed to load dashboard data')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  return { stats, recentOrders, isLoading, error }
}