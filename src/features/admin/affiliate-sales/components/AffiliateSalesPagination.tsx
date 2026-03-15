"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { AffiliateSalesMeta } from "@/types/affiliate-sales.types";

interface Props {
  readonly meta: AffiliateSalesMeta;
  readonly onPageChange: (page: number) => void;
}

export default function AffiliateSalesPagination({
  meta,
  onPageChange,
}: Props) {
  const { page, totalPages } = meta;

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
