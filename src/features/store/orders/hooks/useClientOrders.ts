/**
 * Client Orders Hook
 *
 * Custom hook for fetching and managing client order history.
 * Uses the order service to retrieve orders for the current user.
 */

"use client";

import { useCallback, useState, useEffect } from "react";
import { orderService } from "@/features/store/order/services/order.service";
import type { Order } from "@/domain/entities";

export interface UseClientOrdersResult {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useClientOrders = (): UseClientOrdersResult => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedOrders = await orderService.getOrders();
      setOrders(fetchedOrders);
    } catch (err) {
      console.error("[useClientOrders] Error fetching orders:", err);
      setError("Failed to load orders. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    isLoading,
    error,
    refetch: fetchOrders,
  };
};
