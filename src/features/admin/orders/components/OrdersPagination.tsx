"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { OrderMeta } from "@/types/order.types";

interface Props {
  readonly meta: OrderMeta;
  readonly onPageChange: (page: number) => void;
}

export default function OrdersPagination({ meta, onPageChange }: Props) {
  const { page, totalPages, total, limit } = meta;
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    .reduce<(number | string)[]>((acc, p, i, arr) => {
      const prev = arr[i - 1];
      if (i > 0 && typeof prev === "number" && p - prev > 1) {
        acc.push(`ellipsis-${i}`);
      }
      acc.push(p);
      return acc;
    }, []);

  return (
    <div className="flex items-center justify-between px-1 py-2">
      <p className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-medium text-gray-700">
          {from}–{to}
        </span>{" "}
        of <span className="font-medium text-gray-700">{total}</span> orders
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((p) =>
          typeof p === "string" ? (
            <span key={p} className="px-2 text-gray-400 text-sm">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                p === page
                  ? "bg-emerald-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
