"use client";

import { Ban, Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  readonly affiliateName: string;
  readonly onConfirm: (reason: string) => void;
  readonly onClose: () => void;
  readonly isLoading: boolean;
}

export default function RejectConfirmModal({
  affiliateName,
  onConfirm,
  onClose,
  isLoading,
}: Props) {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    onConfirm(reason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="px-6 py-6 flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <Ban size={22} className="text-red-500" />
          </div>
          <h2 className="text-base font-semibold text-gray-900">
            Reject Affiliate
          </h2>
          <p className="text-sm text-gray-500">
            Are you sure you want to reject{" "}
            <span className="font-medium">{affiliateName}</span>? This action
            cannot be undone.
          </p>
        </div>

        <div className="px-6 py-4">
          <label
            htmlFor="reject-reason"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Rejection Reason (optional)
          </label>
          <textarea
            id="reject-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter a reason for rejection..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm resize-none"
            rows={3}
            disabled={isLoading}
          />
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
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            {isLoading && <Loader2 size={14} className="animate-spin" />}
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
