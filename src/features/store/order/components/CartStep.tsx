"use client";

import { Minus, Plus, Trash2, ShoppingCart, AlertTriangle } from "lucide-react";
import type { ModalCartItem } from "@/types/checkout.types";
import {
  calcSubtotal,
  calcShipping,
  calcTotal,
  PRICING,
} from "@/utils/checkout.utils";
import { getLowStockThreshold } from "@/utils/stock.utils";

interface Props {
  readonly items: ModalCartItem[];
  readonly onQtyChange: (id: string, qty: number) => void;
  readonly onRemove: (id: string) => void;
  readonly compact?: boolean;
}

interface StockState {
  outOfStock: boolean;
  atMax: boolean;
  overStock: boolean;
  lowStock: boolean;
}

function getStockState(
  stock: number | null | undefined,
  quantity: number,
): StockState {
  if (stock == null) {
    return {
      outOfStock: false,
      atMax: false,
      overStock: false,
      lowStock: false,
    };
  }
  const outOfStock = stock === 0;
  const atMax = stock > 0 && quantity >= stock;
  const overStock = quantity > stock;
  const lowStock = stock > 0 && !atMax && stock <= getLowStockThreshold(stock);
  return { outOfStock, atMax, overStock, lowStock };
}

function getStockLabelText(
  overStock: boolean,
  outOfStock: boolean,
  lowStock: boolean,
  stock: number,
): string {
  if (overStock) return `Only ${stock} available`;
  if (outOfStock) return "Out of stock";
  if (lowStock) return `Only ${stock} left`;
  return `${stock} in stock`;
}

function getStockLabelColor(
  overStock: boolean,
  outOfStock: boolean,
  lowStock: boolean,
): string {
  if (overStock || outOfStock) return "text-red-500";
  if (lowStock) return "text-amber-500";
  return "text-emerald-500";
}

export const CartStep = ({
  items,
  onQtyChange,
  onRemove,
  compact = false,
}: Props) => {
  const subtotal = calcSubtotal(items);
  const shipping = calcShipping(subtotal);
  const total = calcTotal(subtotal);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
          <ShoppingCart size={24} className="text-gray-400" />
        </div>
        <p className="text-sm font-semibold text-gray-500">
          Your cart is empty
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${compact ? "gap-3" : "gap-4"}`}>
      {!compact && (
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
          Your Items
        </p>
      )}

      {/* ── Items list ────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2">
        {items.map((item) => {
          const { outOfStock, atMax, overStock, lowStock } = getStockState(
            item.stock,
            item.quantity,
          );
          const stockLabelText =
            item.stock == null
              ? null
              : getStockLabelText(overStock, outOfStock, lowStock, item.stock);
          const stockLabelColor = getStockLabelColor(
            overStock,
            outOfStock,
            lowStock,
          );

          return (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3 rounded-2xl border ${
                overStock
                  ? "bg-red-50 border-red-100"
                  : "bg-gray-50 border-gray-100"
              }`}
            >
              {/* Image */}
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-gray-100"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-gray-200 flex-shrink-0" />
              )}

              {/* Name + price + stock */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  ₱{item.price.toLocaleString()} each
                </p>
                {/* Stock label */}
                {stockLabelText !== null && (
                  <p
                    className={`text-[10px] font-semibold mt-0.5 ${stockLabelColor}`}
                  >
                    {stockLabelText}
                  </p>
                )}
              </div>

              {/* Qty controls */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => onQtyChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-orange-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Minus size={12} />
                </button>
                <span className="w-6 text-center text-sm font-bold text-gray-800">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => onQtyChange(item.id, item.quantity + 1)}
                  disabled={atMax || outOfStock}
                  className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-orange-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Plus size={12} />
                </button>
              </div>

              {/* Line total */}
              <p className="text-sm font-extrabold text-gray-900 w-16 text-right flex-shrink-0">
                ₱{(item.price * item.quantity).toLocaleString()}
              </p>

              {/* Over-stock warning */}
              {overStock && (
                <AlertTriangle
                  size={13}
                  className="text-red-400 flex-shrink-0"
                />
              )}

              {/* Remove */}
              <button
                type="button"
                aria-label={`Remove ${item.name}`}
                onClick={() => onRemove(item.id)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all"
              >
                <Trash2 size={13} />
              </button>
            </div>
          );
        })}
      </div>

      {/* ── Totals ────────────────────────────────────────────────────────── */}
      <div className="pt-3 border-t border-gray-100 flex flex-col gap-1.5 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900">
            ₱{subtotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className="font-semibold text-emerald-500">FREE</span>
          ) : (
            <span className="font-semibold text-gray-900">
              ₱{shipping.toLocaleString()}
            </span>
          )}
        </div>
        {shipping > 0 && (
          <p className="text-[11px] text-gray-400">
            Free shipping on orders ₱
            {PRICING.FREE_SHIPPING_THRESHOLD.toLocaleString()}+
          </p>
        )}
        <div className="flex justify-between font-extrabold text-gray-900 pt-2 border-t border-gray-100">
          <span>Total</span>
          <span className="text-orange-600">₱{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
