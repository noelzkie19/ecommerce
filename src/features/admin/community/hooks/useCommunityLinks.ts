"use client";

import { useState, useEffect, useCallback } from "react";
import { CommunityLink, CommunityLinksResponse } from "@/types/community.types";
import { communityService } from "../services/community.service";

interface UseCommunityLinksParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  isActive?: boolean;
}

export const useCommunityLinks = (params: UseCommunityLinksParams = {}) => {
  const [links, setLinks] = useState<CommunityLink[]>([]);
  const [meta, setMeta] = useState<CommunityLinksResponse["meta"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await communityService.getAll({
        page: params.page,
        limit: params.limit,
        category: params.category,
        search: params.search,
        isActive: params.isActive,
      });
      setLinks(res.data);
      setMeta(res.meta);
    } catch {
      setError("Failed to load community links");
    } finally {
      setIsLoading(false);
    }
  }, [
    params.page,
    params.limit,
    params.category,
    params.search,
    params.isActive,
  ]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { links, meta, isLoading, error, refetch: fetch };
};
