"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Affiliate,
  AffiliateMeta,
  AffiliateStatus,
} from "@/types/affiliate.types";
import { affiliatesService } from "../services/affiliate.service";

interface UseAffiliatesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: AffiliateStatus;
}

export const useAdminAffiliates = (params: UseAffiliatesParams = {}) => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [meta, setMeta] = useState<AffiliateMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await affiliatesService.getAll(params);
      setAffiliates(Array.isArray(res.data) ? res.data : []);
      setMeta(res.meta);
    } catch {
      setError("Failed to load affiliates");
    } finally {
      setIsLoading(false);
    }
  }, [params.page, params.limit, params.search, params.status]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { affiliates, meta, isLoading, error, refetch: fetch };
};
