/**
 * Order Detail Modal Component
 *
 * Modal showing complete order details.
 */

"use client";

import { X, MapPin, Mail, Phone, Package } from "lucide-react";
import type { Order } from "@/domain/entities";
import { OrderStatusTimeline } from "./OrderStatusTimeline";

interface OrderDetailModalProps {
  readonly order: Order;
  readonly onClose: () => void;
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
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  return (
    <dialog
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 m-0 w-full h-full max-w-full max-h-full bg-transparent"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      open
    >
      {/* Backdrop — button makes it interactive and keyboard-accessible */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 w-full h-full cursor-default bg-transparent border-0 p-0"
      />
      <div className="relative flex items-center justify-center min-h-screen px-4 pointer-events-none">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between rounded-t-3xl">
            <div>
              <p className="text-xs text-gray-500">Order Details</p>
              <h2 id="modal-title" className="text-lg font-bold text-gray-900">
                #{order.id.slice(0, 8).toUpperCase()}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status Timeline */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Order Status
              </p>
              <OrderStatusTimeline status={order.status} />
            </div>

            {/* Order Date */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Order Date
              </p>
              <p className="text-sm text-gray-900">
                {formatDate(order.createdAt)}
              </p>
            </div>

            {/* Payment Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Payment Method</span>
                <span className="text-sm font-medium text-gray-900">
                  {PAYMENT_METHOD_LABELS[order.paymentMethod] ||
                    order.paymentMethod}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Payment Status</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    PAYMENT_STATUS_COLORS[order.paymentStatus] ||
                    "text-gray-600 bg-gray-100"
                  }`}
                >
                  {PAYMENT_STATUS_LABELS[order.paymentStatus] ||
                    order.paymentStatus}
                </span>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-gray-400" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Shipping Address
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-900">{order.fullName}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {order.shippingAddress}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <Phone size={12} />
                  <span>{order.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <Mail size={12} />
                  <span>{order.email}</span>
                </div>
              </div>
            </div>

            {/* Order Notes */}
            {order.orderNotes && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Order Notes
                </p>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-4">
                  {order.orderNotes}
                </p>
              </div>
            )}

            {/* Order Items */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package size={14} className="text-gray-400" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Order Items
                </p>
              </div>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                  >
                    {item.product.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} × {formatCurrency(item.unitPrice)}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">
                  {formatCurrency(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900">Total</span>
                <span className="text-blue-600">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
