import { useState } from "react";
import { OrderStatus, PaymentStatus } from "@/types/order.types";
import { adminOrdersService } from "../services/admin-order.service";

export const useOrderMutations = (onSuccess?: () => void) => {
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

  const updateStatus = (id: string, status: OrderStatus) =>
    handleAsync(() =>
      adminOrdersService.updateStatus(id, status).then(() => {}),
    );

  const updatePaymentStatus = (id: string, paymentStatus: PaymentStatus) =>
    handleAsync(() =>
      adminOrdersService.updatePaymentStatus(id, paymentStatus).then(() => {}),
    );

  return { updateStatus, updatePaymentStatus, isLoading, error };
};
