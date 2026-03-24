"use client";

import { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { Order, OrderStatus } from "@/types/order.types";
import OrderDetailModal from "./modals/OrderDetailModal";
import { useAdminOrders } from "./hooks/useAdminOrders";
import { useOrderMutations } from "./hooks/useOrderMutations";
import OrdersTable from "./components/OrdersTable";
import OrdersPagination from "./components/OrdersPagination";

const STATUS_OPTIONS: { label: string; value: OrderStatus | "" }[] = [
  { label: "All Status", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

export default function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<OrderStatus | "">("");
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  const { orders, meta, isLoading, error, refetch } = useAdminOrders({
    page,
    limit: 10,
    status,
  });

  const { updateStatus } = useOrderMutations(refetch);

  const handleStatusFilter = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setStatus(e.target.value as OrderStatus | "");
      setPage(1);
    },
    [],
  );

  const handleStatusChange = useCallback(
    (id: string, newStatus: OrderStatus) => {
      updateStatus(id, newStatus);
    },
    [updateStatus],
  );

  const content = (() => {
    if (isLoading)
      return (
        <div className="flex items-center justify-center py-24">
          <Loader2 size={24} className="animate-spin text-orange-500" />
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
        <OrdersTable
          orders={orders}
          onView={setViewOrder}
          onStatusChange={handleStatusChange}
        />
        {meta && meta.totalPages > 1 && (
          <OrdersPagination meta={meta} onPageChange={setPage} />
        )}
      </>
    );
  })();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage and track customer orders
          </p>
        </div>

        <select
          value={status}
          onChange={handleStatusFilter}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-700"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {content}

      {viewOrder && (
        <OrderDetailModal
          order={viewOrder}
          onClose={() => setViewOrder(null)}
        />
      )}
    </div>
  );
}
