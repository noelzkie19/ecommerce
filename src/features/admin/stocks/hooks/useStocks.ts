"use client";

import { useState, useEffect, useCallback } from "react";
import { stocksService } from "../services/stocks.service";
import { StockItem, StockStats, StockMeta } from "@/types/stock.types";

interface UseStockParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const useStock = (params: UseStockParams = {}) => {
  const [stock, setStock] = useState<StockItem[]>([]);
  const [stats, setStats] = useState<StockStats>({
    totalStock: 0,
    outOfStock: 0,
    lowStock: 0,
  });
  const [meta, setMeta] = useState<StockMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await stocksService.getAll(params);
      setStock(res.stock);
      setStats(res.stats);
      setMeta(res.meta);
    } catch {
      setError("Failed to load stock");
    } finally {
      setIsLoading(false);
    }
  }, [params.page, params.limit, params.search]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { stock, stats, meta, isLoading, error, refetch: fetch };
};
