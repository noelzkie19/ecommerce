import { useState } from "react";
import { AffiliateSaleStatus } from "@/types/affiliate-sales.types";
import { affiliateSalesService } from "../services/affiliate-sales.service";

export const useAffiliateSalesMutations = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsync = async (fn: () => Promise<void>) => {
    setIsLoading(true);
    setError(null);
    try {
      await fn();
      onSuccess?.();
    } catch {
      setError("Operation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = (id: string, status: AffiliateSaleStatus) =>
    handleAsync(() =>
      affiliateSalesService.updateStatus(id, status).then(() => {}),
    );

  const approve = (id: string) =>
    handleAsync(() => affiliateSalesService.approve(id).then(() => {}));

  const reject = (id: string) =>
    handleAsync(() => affiliateSalesService.reject(id).then(() => {}));

  const deleteSale = (id: string) =>
    handleAsync(() => affiliateSalesService.delete(id).then(() => {}));

  const clearError = () => setError(null);

  return {
    updateStatus,
    approve,
    reject,
    deleteSale,
    clearError,
    isLoading,
    error,
  };
};
