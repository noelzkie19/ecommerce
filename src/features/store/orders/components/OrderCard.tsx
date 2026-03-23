/**
 * Order Card Component
 *
 * Card component for displaying a single order in the order history list.
 */

"use client";

import { useState } from "react";
import { Package, ChevronDown, ChevronUp } from "lucide-react";
import type { Order } from "@/domain/entities";
import { OrderStatusTimeline } from "./OrderStatusTimeline";

interface OrderCardProps {
  readonly order: Order;
  readonly onViewDetails: (order: Order) => void;
}

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cod: "Cash on Delivery",
  maya: "Maya",
};

const PAYMENT_STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  paid: "Paid",
  failed: "Failed",
};

const PAYMENT_STATUS_COLORS: Record<string, string> = {
  pending: "text-amber-600 bg-amber-50",
  paid: "text-green-600 bg-green-50",
  failed: "text-red-600 bg-red-50",
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function OrderCard({ order, onViewDetails }: OrderCardProps) {
  const [showItems, setShowItems] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500">Order ID</p>
            <p className="font-semibold text-gray-900">
              #{order.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs text-gray-500">Order Date</p>
            <p className="text-sm text-gray-700">
              {formatDate(order.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Items preview */}
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600">
              {order.items.length} {order.items.length === 1 ? "item" : "items"}
            </span>
          </div>
          <span className="font-bold text-lg text-gray-900">
            {formatCurrency(order.total)}
          </span>
        </div>

        {/* Status Timeline */}
        <div className="mb-4">
          <OrderStatusTimeline status={order.status} />
        </div>

        {/* Payment info */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs text-gray-500">Payment:</span>
          <span className="text-xs font-medium text-gray-700">
            {PAYMENT_METHOD_LABELS[order.paymentMethod] || order.paymentMethod}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              PAYMENT_STATUS_COLORS[order.paymentStatus] ||
              "text-gray-600 bg-gray-50"
            }`}
          >
            {PAYMENT_STATUS_LABELS[order.paymentStatus] || order.paymentStatus}
          </span>
        </div>

        {/* Expandable items */}
        {showItems && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                {item.product.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.quantity} × {formatCurrency(item.unitPrice)}
                  </p>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(item.quantity * item.unitPrice)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Toggle items button */}
        <button
          type="button"
          onClick={() => setShowItems(!showItems)}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium mt-2"
        >
          {showItems ? (
            <>
              <ChevronUp size={16} />
              Hide items
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              View items
            </>
          )}
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-100">
        <button
          type="button"
          onClick={() => onViewDetails(order)}
          className="w-full text-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View Order Details
        </button>
      </div>
    </div>
  );
}
