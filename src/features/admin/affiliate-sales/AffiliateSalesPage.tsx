"use client";

import { useState, useCallback } from "react";
import { Loader2, Search } from "lucide-react";
import { AffiliateSaleStatus } from "@/types/affiliate-sales.types";
import { useAffiliateSales } from "./hooks/useAffiliateSales";
import { useAffiliateSalesMutations } from "./hooks/useAffiliateSalesMutations";
import AffiliateSalesTable from "./components/AffiliateSalesTable";
import AffiliateSalesPagination from "./components/AffiliateSalesPagination";

const STATUS_OPTIONS: { label: string; value: AffiliateSaleStatus | "" }[] = [
  { label: "All Status", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

export default function AffiliateSalesPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<AffiliateSaleStatus | "">("");
  const [search, setSearch] = useState("");

  const { sales, meta, isLoading, error, refetch } = useAffiliateSales({
    page,
    limit: 20,
    status,
    search: search || undefined,
  });

  const mutations = useAffiliateSalesMutations(refetch);

  const handleStatusFilter = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setStatus(e.target.value as AffiliateSaleStatus | "");
      setPage(1);
    },
    [],
  );

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const content = (() => {
    if (isLoading)
      return (
        <div className="flex items-center justify-center py-24">
          <Loader2 size={24} className="animate-spin text-indigo-500" />
        </div>
      );
    if (error)
      return (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-5 py-4">
          {error}
        </div>
      );
    return (
      <>
        <AffiliateSalesTable
          sales={sales}
          onApprove={(id) => mutations.approve(id)}
          onReject={(id) => mutations.reject(id)}
          onDelete={(id) => mutations.deleteSale(id)}
        />
        {meta && meta.totalPages > 1 && (
          <AffiliateSalesPagination meta={meta} onPageChange={setPage} />
        )}
      </>
    );
  })();

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Affiliate Sales
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage and approve affiliate commission sales
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search by affiliate or product..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
        </div>
        <select
          value={status}
          onChange={handleStatusFilter}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Table / Loading / Error */}
      {content}
    </div>
  );
}
