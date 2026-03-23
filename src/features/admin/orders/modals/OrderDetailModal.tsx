"use client";

import { X } from "lucide-react";
import { Order } from "@/types/order.types";

const PAYMENT_LABELS: Record<string, string> = {
  cod: "COD",
  maya: "Maya",
  card: "Credit Card",
};

interface Props {
  readonly order: Order;
  readonly onClose: () => void;
}

export default function OrderDetailModal({ order, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">
            Order #{order.id.slice(0, 6)}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Customer info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 text-xs mb-1">Customer</p>
              <p className="text-gray-800 font-medium">{order.fullName}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Email</p>
              <p className="text-gray-800">{order.email}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Phone</p>
              <p className="text-gray-800">{order.phoneNumber}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Payment</p>
              <p className="text-gray-800">
                {PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-400 text-xs mb-1">Address</p>
              <p className="text-gray-800">{order.shippingAddress}</p>
            </div>
            {order.orderNotes && (
              <div className="col-span-2">
                <p className="text-gray-400 text-xs mb-1">Notes</p>
                <p className="text-gray-800">{order.orderNotes}</p>
              </div>
            )}
          </div>

          {/* Items */}
          <div>
            <p className="text-gray-400 text-xs mb-3">Items</p>
            <div className="space-y-3">
              {order.items.map((item) => {
                const imgUrl =
                  item.product.images?.[0]?.url ?? item.product.image_url;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                          N/A
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        x{item.quantity} · ₱{item.unitPrice.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-700 flex-shrink-0">
                      ₱{(item.quantity * item.unitPrice).toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between pt-1 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-900">Total</p>
            <p className="text-base font-bold text-emerald-600">
              ₱{order.total.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
