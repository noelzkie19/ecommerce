"use client";
import { useState, useEffect, useCallback } from "react";
import type { AffiliateDashboard } from "@/types/affiliate-dashboard.types";
import { affiliateDashboardService } from "../services/affiliate-dashboard.service";

export const useAffiliateDashboard = () => {
  const [dashboard, setDashboard] = useState<AffiliateDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await affiliateDashboardService.getDashboard();
      setDashboard(data);
    } catch {
      setError("Failed to load dashboard");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { dashboard, isLoading, error, refetch: fetch };
};
