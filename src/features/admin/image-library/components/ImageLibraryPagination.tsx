"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLibraryPaginationProps {
  readonly meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  readonly onPageChange: (page: number) => void;
}

export function ImageLibraryPagination({
  meta,
  onPageChange,
}: ImageLibraryPaginationProps) {
  if (meta.totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
      <div className="text-sm text-gray-600">
        Showing {(meta.page - 1) * meta.limit + 1} to{" "}
        {Math.min(meta.page * meta.limit, meta.total)} of {meta.total}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(meta.page - 1)}
          disabled={meta.page <= 1}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft size={18} />
        </button>
        {Array.from({ length: Math.min(5, meta.totalPages) }, (_, i) => {
          let pageNum: number;
          if (meta.totalPages <= 5) {
            pageNum = i + 1;
          } else if (meta.page <= 3) {
            pageNum = i + 1;
          } else if (meta.page >= meta.totalPages - 2) {
            pageNum = meta.totalPages - 4 + i;
          } else {
            pageNum = meta.page - 2 + i;
          }
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded-lg text-sm ${meta.page === pageNum ? "bg-emerald-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
            >
              {pageNum}
            </button>
          );
        })}
        <button
          onClick={() => onPageChange(meta.page + 1)}
          disabled={meta.page >= meta.totalPages}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
