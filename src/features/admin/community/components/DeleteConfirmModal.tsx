"use client";

import { AlertTriangle, Loader2, X } from "lucide-react";
import { useCommunityMutations } from "../hooks/useCommunityMutations";
import { CommunityLink } from "@/types/community.types";

interface DeleteConfirmModalProps {
  readonly link: CommunityLink;
  readonly onClose: () => void;
  readonly onSuccess: () => void;
}

export function DeleteConfirmModal({
  link,
  onClose,
  onSuccess,
}: DeleteConfirmModalProps) {
  const { deleteLink, isLoading, error } = useCommunityMutations({
    onSuccess: () => {
      onSuccess();
      onClose();
    },
  });

  const handleDelete = async () => {
    try {
      await deleteLink(link.id);
    } catch {
      // Error handled by hook
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0 w-full h-full cursor-default"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 relative">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Delete Community Link
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-gray-700">
                Are you sure you want to delete this community link?
              </p>
              <p className="mt-2 font-medium text-gray-900">"{link.title}"</p>
              <p className="mt-1 text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
