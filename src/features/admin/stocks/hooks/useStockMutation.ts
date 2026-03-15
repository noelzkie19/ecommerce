import { useState } from "react";
import { stocksService } from "../services/stocks.service";

export const useStockMutation = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStock = async (productId: string, quantity: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await stocksService.update(productId, { quantity });
      onSuccess?.();
    } catch {
      setError("Failed to update stock");
    } finally {
      setIsLoading(false);
    }
  };

  return { updateStock, isLoading, error };
};
