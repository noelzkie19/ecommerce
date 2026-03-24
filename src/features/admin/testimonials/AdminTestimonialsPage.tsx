"use client";

import { useState, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import TestimonialsTable from "./components/TestimonialsTable";
import TestimonialsPagination from "./components/TestimonialsPagination";
import { useAdminTestimonials } from "./hooks/useAdminTestimonials";
import type { TestimonialStatus } from "@/types/testimonial.types";

const STATUS_TABS: { label: string; value: TestimonialStatus | undefined }[] = [
  { label: "All", value: undefined },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

export default function AdminTestimonialsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [activeStatus, setActiveStatus] = useState<
    TestimonialStatus | undefined
  >(undefined);

  const { testimonials, stats, meta, isLoading, error, refetch } =
    useAdminTestimonials({
      page,
      limit: 10,
      search: search || undefined,
      status: activeStatus,
    });

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const handleTabChange = (status: TestimonialStatus | undefined) => {
    setActiveStatus(status);
    setPage(1);
  };

  const tabCount = (status: TestimonialStatus | undefined) => {
    if (!stats) return 0;
    if (!status) return stats.total;
    return stats[status];
  };

  const content = (() => {
    if (isLoading)
      return (
        <tr>
          <td colSpan={7} className="py-24 text-center">
            <Loader2
              size={24}
              className="animate-spin text-orange-500 mx-auto"
            />
          </td>
        </tr>
      );
    if (error)
      return (
        <tr>
          <td colSpan={7} className="px-4 py-4">
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-5 py-4">
              {error}
            </div>
          </td>
        </tr>
      );
    return (
      <TestimonialsTable testimonials={testimonials} onSuccess={refetch} />
    );
  })();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Testimonials</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage customer reviews and feedback
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {stats?.total ?? 0}
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5">
          <p className="text-sm text-yellow-600">Pending</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">
            {stats?.pending ?? 0}
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
          <p className="text-sm text-emerald-600">Approved</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">
            {stats?.approved ?? 0}
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Avg. Rating</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {(stats?.averageRating ?? 0).toFixed(1)}
            <span className="text-base font-normal text-gray-400"> / 5</span>
          </p>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.label}
              onClick={() => handleTabChange(tab.value)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeStatus === tab.value
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
              <span
                className={`ml-1.5 text-xs ${
                  activeStatus === tab.value
                    ? "text-emerald-600"
                    : "text-gray-400"
                }`}
              >
                ({tabCount(tab.value)})
              </span>
            </button>
          ))}
        </div>

        <div className="relative max-w-sm w-full">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search by name or message..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Customer
              </th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Product
              </th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Rating
              </th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Message
              </th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Status
              </th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Date
              </th>
              <th className="text-right px-6 py-4 text-gray-500 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">{content}</tbody>
        </table>
      </div>

      {meta && meta.totalPages > 1 && (
        <TestimonialsPagination meta={meta} onPageChange={setPage} />
      )}
    </div>
  );
}
