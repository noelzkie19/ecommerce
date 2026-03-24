"use client";

import {
  Loader2,
  Banknote,
  Package,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { useDashboard } from "./hooks/useDashboard";
import { RecentOrder } from "@/types/dashboard.types";

const STATUS_STYLES: Record<string, string> = {
  delivered: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
  processing: "bg-blue-100 text-blue-700",
};

const STAT_ICONS = [
  { icon: Package, color: "text-orange-500", bg: "bg-orange-50" },
  { icon: ShoppingCart, color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Banknote, color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-50" },
];

export default function DashboardPage() {
  const { stats, recentOrders, isLoading, error } = useDashboard();

  const statCards: {
    label: string;
    value: string;
  }[] = [
    {
      label: "Total Products",
      value: String(stats?.totalProducts ?? "—"),
    },
    {
      label: "Total Orders",
      value: String(stats?.totalOrders ?? "—"),
    },
    {
      label: "Revenue",
      value: stats ? `₱${stats.totalRevenue.toLocaleString()}` : "—",
    },
    {
      label: "Pending Orders",
      value: String(stats?.pendingOrders ?? "—"),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={24} className="animate-spin text-orange-500" />
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Overview of your store performance
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value }, i) => {
          const { icon: Icon, color, bg } = STAT_ICONS[i];
          return (
            <div
              key={label}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div
                className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-3`}
              >
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-gray-500 text-sm mt-0.5">{label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Recent Orders</h2>
          <span className="text-xs text-gray-400 font-medium">
            Latest activity
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100 uppercase tracking-wide bg-gray-50/60">
                <th className="p-4 font-semibold">Order</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order: RecentOrder) => (
                  <tr
                    key={order.id}
                    className="text-sm hover:bg-orange-50/30 transition-colors border-b border-gray-50 last:border-0"
                  >
                    <td className="p-4 text-gray-700 font-medium">
                      #{order.id.slice(0, 6)}
                    </td>
                    <td className="p-4 text-gray-700">{order.customer_name}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[order.status.toLowerCase()] ?? "bg-gray-100 text-gray-700"}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-900 font-semibold">
                      ₱{order.total.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-gray-400 text-sm"
                  >
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
