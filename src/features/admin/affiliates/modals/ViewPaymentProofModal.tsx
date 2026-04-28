"use client";

import { X, Download, ExternalLink } from "lucide-react";
import { Affiliate } from "@/types/affiliate.types";

interface Props {
  readonly affiliate: Affiliate | null;
  readonly onClose: () => void;
}

export default function ViewPaymentProofModal({ affiliate, onClose }: Props) {
  if (!affiliate?.paymentProofUrl) return null;

  // Capture non-null values after guard to satisfy TypeScript
  const paymentProofUrl = affiliate.paymentProofUrl;
  const id = affiliate.id;

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

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = paymentProofUrl;
    link.download = `payment-proof-${id}.jpg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Payment Proof</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Affiliate Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold">
                {affiliate.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-900">{affiliate.name}</p>
                <p className="text-sm text-gray-500">{affiliate.email}</p>
              </div>
            </div>
          </div>

          {/* Proof Image */}
          <div className="mb-6">
            <h3 className="block text-sm font-medium text-gray-700 mb-3">
              Payment Proof Image
            </h3>
            <div className="relative rounded-xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-200">
              <img
                src={paymentProofUrl}
                alt="Payment proof"
                className="w-full h-auto max-h-64 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239CA3AF'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <h3 className="block text-sm font-medium text-gray-700 mb-1">
                Reference Number
              </h3>
              <div className="flex items-center gap-2">
                <span className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                  {affiliate.paymentProofRef || "-"}
                </span>
                {affiliate.paymentProofRef && (
                  <button
                    onClick={() => {
                      if (affiliate.paymentProofRef) {
                        navigator.clipboard.writeText(
                          affiliate.paymentProofRef,
                        );
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    <ExternalLink size={16} />
                  </button>
                )}
              </div>
            </div>

            <div>
              <h3 className="block text-sm font-medium text-gray-700 mb-1">
                Submitted At
              </h3>
              <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                {formatDate(affiliate.paymentProofSubmittedAt)}
              </p>
            </div>

            <div>
              <h3 className="block text-sm font-medium text-gray-700 mb-1">
                Payment Status
              </h3>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  affiliate.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {affiliate.paymentStatus === "paid" ? "Paid" : "Unpaid"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg border border-gray-200 transition-colors"
          >
            <Download size={16} />
            Download
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
