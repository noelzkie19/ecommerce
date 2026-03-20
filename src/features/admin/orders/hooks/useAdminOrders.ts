"use client";

import { useState, useEffect, useCallback } from "react";
import { Order, OrderMeta, OrderStatus } from "@/types/order.types";
import { adminOrdersService } from "../services/admin-order.service";

interface UseAdminOrdersParams {
  page?: number;
  limit?: number;
  status?: OrderStatus | "";
}

export const useAdminOrders = (params: UseAdminOrdersParams = {}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [meta, setMeta] = useState<OrderMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await adminOrdersService.getAllAdmin({
        page: params.page,
        limit: params.limit,
        status: params.status || undefined,
      });
      setOrders(res.data);
      setMeta(res.meta);
    } catch {
      setError("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  }, [params.page, params.limit, params.status]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { orders, meta, isLoading, error, refetch: fetch };
};
