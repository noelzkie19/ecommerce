"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

const FREE_SHIPPING_THRESHOLD = 1500;

interface Props {
  readonly subtotal: number;
  readonly itemCount: number;
  readonly totalQty: number;
}

export default function CartSummary({ subtotal, itemCount, totalQty }: Props) {
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm sticky top-24">
      <h2 className="text-base font-extrabold text-gray-900 mb-5">
        Order Summary
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>
            Subtotal ({totalQty} {totalQty === 1 ? "item" : "items"})
          </span>
          <span className="font-semibold text-gray-900">
            ₱{subtotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className="font-semibold text-emerald-600">Free</span>
          ) : (
            <span className="font-semibold text-gray-900">
              ₱{shipping.toLocaleString()}
            </span>
          )}
        </div>
        {shipping > 0 && (
          <p className="text-xs text-gray-400 bg-gray-50 rounded-xl px-3 py-2">
            Add ₱{(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()} more
            for free shipping
          </p>
        )}
      </div>

      <hr className="my-5 border-gray-100" />

      <div className="flex justify-between items-baseline mb-6">
        <span className="text-base font-extrabold text-gray-900">Total</span>
        <span className="text-xl font-extrabold text-purple-600">
          ₱{total.toLocaleString()}
        </span>
      </div>

      <Link
        href={itemCount > 0 ? "/order" : "#"}
        aria-disabled={itemCount === 0}
        className={[
          "w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-2xl transition-all shadow-md",
          itemCount > 0
            ? "bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white shadow-purple-200"
            : "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none",
        ].join(" ")}
      >
        <ShoppingBag size={16} />
        Proceed to Checkout
      </Link>

      <Link
        href="/shop"
        className="flex items-center justify-center gap-1.5 mt-3 text-sm font-semibold text-gray-500 hover:text-purple-600 transition-colors"
      >
        <ArrowLeft size={13} />
        Continue Shopping
      </Link>
    </div>
  );
}
