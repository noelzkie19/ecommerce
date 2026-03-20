"use client";

import { useState, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import StocksTable from "./components/StocksTable";
import StocksPagination from "./components/StocksPagination";
import { useStock } from "./hooks/useStocks";

export default function StocksPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { stock, stats, meta, isLoading, error, refetch } = useStock({
    page,
    limit: 10,
    search: search || undefined,
  });

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const content = (() => {
    if (isLoading)
      return (
        <tr>
          <td colSpan={6} className="py-24 text-center">
            <Loader2
              size={24}
              className="animate-spin text-emerald-500 mx-auto"
            />
          </td>
        </tr>
      );
    if (error)
      return (
        <tr>
          <td colSpan={6} className="px-4 py-4">
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-5 py-4">
              {error}
            </div>
          </td>
        </tr>
      );
    return <StocksTable stock={stock} onSuccess={refetch} />;
  })();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Stock Monitor / POS
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage your product inventory
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Stock</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {stats.totalStock}
          </p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
          <p className="text-sm text-red-500">Out of Stock</p>
          <p className="text-3xl font-bold text-red-600 mt-1">
            {stats.outOfStock}
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5">
          <p className="text-sm text-yellow-600">Low Stock (≤5)</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">
            {stats.lowStock}
          </p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={search}
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Product
              </th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Category
              </th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Price
              </th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Stock
              </th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Status
              </th>
              <th className="text-right px-6 py-4 text-gray-500 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">{content}</tbody>
        </table>
      </div>

      {meta && meta.totalPages > 1 && (
        <StocksPagination meta={meta} onPageChange={setPage} />
      )}
    </div>
  );
}
