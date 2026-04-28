"use client";

import { CheckCircle2, Loader2, Image as ImageIcon } from "lucide-react";
import { Affiliate } from "@/types/affiliate.types";

interface Props {
  readonly affiliate: Affiliate;
  readonly onConfirm: () => void;
  readonly onClose: () => void;
  readonly isLoading: boolean;
}

export default function ApproveConfirmModal({
  affiliate,
  onConfirm,
  onClose,
  isLoading,
}: Props) {
  const formatDate = (dateStr: string | null | undefined): string => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPaymentStatusMessage = (
    hasProof: boolean,
    paymentStatus: string | null | undefined,
  ): string => {
    if (hasProof) return "Payment proof has been verified";
    if (paymentStatus === "paid") return "Payment has been completed";
    return "No payment proof available";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="px-6 py-6 flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 size={22} className="text-emerald-500" />
          </div>
          <h2 className="text-base font-semibold text-gray-900">
            Approve Affiliate
          </h2>
          <p className="text-sm text-gray-500">
            Are you sure you want to approve{" "}
            <span className="font-medium">{affiliate.name}</span>?
          </p>

          {/* Payment Proof Preview */}
          {affiliate.paymentProofUrl && (
            <div className="w-full mt-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon size={16} className="text-blue-600" />
                <span className="text-xs font-medium text-blue-700">
                  Payment Proof
                </span>
              </div>
              <div className="relative rounded-lg overflow-hidden bg-white border border-gray-100">
                <img
                  src={affiliate.paymentProofUrl}
                  alt="Payment proof"
                  className="w-full h-24 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239CA3AF'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E";
                  }}
                />
              </div>
              {affiliate.paymentProofRef && (
                <p className="mt-2 text-xs text-blue-600 truncate">
                  Ref: {affiliate.paymentProofRef}
                </p>
              )}
              <p className="mt-1 text-xs text-blue-500">
                Submitted: {formatDate(affiliate.paymentProofSubmittedAt)}
              </p>
            </div>
          )}

          {getPaymentStatusMessage(
            !!affiliate.paymentProofUrl,
            affiliate.paymentStatus,
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            {isLoading && <Loader2 size={14} className="animate-spin" />}
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
