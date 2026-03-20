"use client";

import { Loader2, Banknote } from "lucide-react";
import { useDashboard } from "./hooks/useDashboard";
import { RecentOrder } from "@/types/dashboard.types";

const STATUS_STYLES: Record<string, string> = {
  delivered: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
  processing: "bg-blue-100 text-blue-700",
};

export default function DashboardPage() {
  const { stats, recentOrders, isLoading, error } = useDashboard();

  const statCards: {
    label: string;
    value: string;
    icon: string | React.ComponentType<{ className?: string }>;
  }[] = [
    {
      label: "Total Products",
      value: String(stats?.totalProducts ?? "—"),
      icon: "📦",
    },
    {
      label: "Total Orders",
      value: String(stats?.totalOrders ?? "—"),
      icon: "🛒",
    },
    {
      label: "Revenue",
      value: stats ? `₱${stats.totalRevenue.toLocaleString()}` : "—",
      icon: Banknote,
    },
    {
      label: "Pending Orders",
      value: String(stats?.pendingOrders ?? "—"),
      icon: "📈",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={24} className="animate-spin text-emerald-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-5 py-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, icon }) => (
          <div
            key={label}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
          >
            {typeof icon === "string" ? (
              <span className="text-2xl">{icon}</span>
            ) : (
              <Banknote className="w-6 h-6 text-gray-700" />
            )}
            <p className="text-2xl font-bold mt-2 text-gray-900">{value}</p>
            <p className="text-gray-500 text-sm mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500 border-b border-gray-100 uppercase tracking-wide">
              <th className="p-4 font-medium">Order</th>
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length > 0 ? (
              recentOrders.map((order: RecentOrder) => (
                <tr
                  key={order.id}
                  className="text-sm hover:bg-gray-50 transition"
                >
                  <td className="p-4 text-gray-700">#{order.id.slice(0, 6)}</td>
                  <td className="p-4 text-gray-700">{order.customer_name}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[order.status.toLowerCase()] ?? "bg-gray-100 text-gray-700"}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-700 font-medium">
                    ₱{order.total.toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-gray-400 text-sm"
                >
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
