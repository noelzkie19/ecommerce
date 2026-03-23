"use client";

import { Eye } from "lucide-react";
import { Order, OrderStatus } from "@/types/order.types";

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-100",
  confirmed: "bg-blue-50 text-blue-700 border-blue-100",
  processing: "bg-purple-50 text-purple-700 border-purple-100",
  shipped: "bg-indigo-50 text-indigo-700 border-indigo-100",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-100",
  cancelled: "bg-red-50 text-red-700 border-red-100",
};

const ALL_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const PAYMENT_STATUS: Record<string, string> = {
  pending: "pending",
  paid: "paid",
  failed: "failed",
};

const PAYMENT_LABELS: Record<string, string> = {
  cod: "COD",
  maya: "Maya",
  card: "Credit Card",
};

interface Props {
  readonly orders: Order[];
  readonly onView: (order: Order) => void;
  readonly onStatusChange: (id: string, status: OrderStatus) => void;
}

export default function OrdersTable({ orders, onView, onStatusChange }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Order
            </th>
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Customer
            </th>
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Status
            </th>
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Payment
            </th>
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Payment Status
            </th>
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Amount
            </th>
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Date
            </th>
            <th className="text-right px-6 py-4 text-gray-500 font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-gray-50/50 transition-colors"
            >
              <td className="px-6 py-4 font-mono text-xs text-gray-600">
                #{order.id.slice(0, 6)}
              </td>
              <td className="px-6 py-4 text-gray-800">{order.fullName}</td>
              <td className="px-6 py-4">
                <div className="relative inline-block">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      onStatusChange(order.id, e.target.value as OrderStatus)
                    }
                    className={`appearance-none pl-3 pr-7 py-1 rounded-full text-xs font-medium border cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 ${STATUS_STYLES[order.status]}`}
                  >
                    {ALL_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-current opacity-60 text-[10px]">
                    ▾
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600">
                {PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {PAYMENT_STATUS[order.paymentStatus] ?? order.paymentStatus}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                ₱{order.total.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-gray-500">
                {new Date(order.createdAt).toLocaleDateString("en-PH", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end">
                  <button
                    onClick={() => onView(order)}
                    className="p-2 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                  >
                    <Eye size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && (
        <div className="py-16 text-center text-gray-400 text-sm">
          No orders found.
        </div>
      )}
    </div>
  );
}
