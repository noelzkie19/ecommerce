"use client";

import { useState, useEffect, useCallback } from "react";
import {
  AffiliateSale,
  AffiliateSalesMeta,
  AffiliateSaleStatus,
} from "@/types/affiliate-sales.types";
import { affiliateSalesService } from "../services/affiliate-sales.service";

interface UseAffiliateSalesParams {
  page?: number;
  limit?: number;
  affiliateId?: string;
  status?: AffiliateSaleStatus | "";
  search?: string;
}

export const useAffiliateSales = (params: UseAffiliateSalesParams = {}) => {
  const [sales, setSales] = useState<AffiliateSale[]>([]);
  const [meta, setMeta] = useState<AffiliateSalesMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await affiliateSalesService.getAll({
        page: params.page,
        limit: params.limit,
        affiliateId: params.affiliateId,
        status: params.status || undefined,
        search: params.search || undefined,
      });
      setSales(res.data);
      setMeta(res.meta);
    } catch {
      setError("Failed to load affiliate sales");
    } finally {
      setIsLoading(false);
    }
  }, [
    params.page,
    params.limit,
    params.affiliateId,
    params.status,
    params.search,
  ]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { sales, meta, isLoading, error, refetch: fetch };
};
