"use client";

import type { ProductMeta } from "@/types/product.types";

interface Props {
  readonly meta: ProductMeta;
  readonly page: number;
  readonly onPageChange: (page: number) => void;
}

export default function ShopPagination({ meta, page, onPageChange }: Props) {
  if (meta.totalPages <= 1) return null;

  // S4325: removed unnecessary `as number | undefined` cast — reduce infers the type correctly
  const pages = Array.from({ length: meta.totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === meta.totalPages || Math.abs(p - page) <= 1)
    .reduce<(number | string)[]>((acc, p, i, arr) => {
      const prev = arr[i - 1];
      if (prev !== undefined && p - prev > 1) acc.push(`ellipsis-${i}`);
      acc.push(p);
      return acc;
    }, []);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:text-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Previous
      </button>

      {pages.map((p) =>
        typeof p === "string" ? (
          <span key={p} className="text-gray-400 text-sm px-1">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
              p === page
                ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                : "bg-white border border-gray-200 text-gray-600 hover:border-purple-300 hover:text-orange-600"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(meta.totalPages, page + 1))}
        disabled={page >= meta.totalPages}
        className="px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:text-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Next
      </button>
    </div>
  );
}
