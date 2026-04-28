"use client";

import { useState } from "react";
import { UpdateAffiliateDTO, AssignProductDTO } from "@/types/affiliate.types";
import { affiliatesService } from "../services/affiliate.service";

export const useAffiliateMutations = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsync = async (fn: () => Promise<void>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await fn();
      onSuccess?.();
      return true;
    } catch (err: any) {
      setError(
        err?.response?.data?.message ?? "Operation failed. Please try again.",
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /** Invite by email — backend resolves auth user automatically */
  const inviteAffiliate = (email: string) =>
    handleAsync(() => affiliatesService.create({ email }).then(() => {}));

  const updateAffiliate = (id: string, dto: UpdateAffiliateDTO) =>
    handleAsync(() => affiliatesService.update(id, dto).then(() => {}));

  const deleteAffiliate = (id: string) =>
    handleAsync(() => affiliatesService.delete(id));

  const suspendAffiliate = (id: string) =>
    handleAsync(() => affiliatesService.suspend(id).then(() => {}));

  const activateAffiliate = (id: string) =>
    handleAsync(() => affiliatesService.activate(id).then(() => {}));

  const approveAffiliate = (id: string) =>
    handleAsync(() => affiliatesService.approve(id).then(() => {}));

  const rejectAffiliate = (id: string, reason?: string) =>
    handleAsync(() => affiliatesService.reject(id, reason).then(() => {}));

  const assignProduct = (affiliateId: string, dto: AssignProductDTO) =>
    handleAsync(() =>
      affiliatesService.assignProduct(affiliateId, dto).then(() => {}),
    );

  const removeProduct = (affiliateId: string, productId: string) =>
    handleAsync(() => affiliatesService.removeProduct(affiliateId, productId));

  const uploadPaymentProofImage = (
    id: string,
    file: File,
    reference?: string,
  ) =>
    handleAsync(() =>
      affiliatesService
        .uploadPaymentProofImage(id, file, reference)
        .then(() => {}),
    );

  const clearError = () => setError(null);

  return {
    inviteAffiliate,
    updateAffiliate,
    deleteAffiliate,
    suspendAffiliate,
    activateAffiliate,
    approveAffiliate,
    rejectAffiliate,
    assignProduct,
    removeProduct,
    uploadPaymentProofImage,
    clearError,
    isLoading,
    error,
  };
};
