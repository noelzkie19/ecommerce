"use client";
import { useState, useEffect } from "react";
import { affiliateCommunityService } from "../services/affiliate-community.service";
import { CommunityLink } from "@/types/community.types";

interface UseAffiliateCommunityResult {
  links: CommunityLink[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useAffiliateCommunity(): UseAffiliateCommunityResult {
  const [links, setLinks] = useState<CommunityLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLinks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await affiliateCommunityService.getActiveLinks();
      setLinks(data);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to fetch community links",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchLinks();
  }, []);

  return {
    links,
    isLoading,
    error,
    refetch: () => {
      fetchLinks();
    },
  };
}
