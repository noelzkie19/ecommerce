"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, AlertTriangle } from "lucide-react";
import { trackInitiateCheckout } from "@/lib/meta-pixel";
import { calculateItemTotal } from "@/domain/rules";
import type { CartItemWithProduct } from "@/types/cart.types";

interface Props {
  readonly subtotal: number;
  readonly itemCount: number;
  readonly totalQty: number;
  readonly hasStockIssues?: boolean;
  readonly items: CartItemWithProduct[];
}

export default function CartSummary({
  subtotal,
  itemCount,
  totalQty,
  hasStockIssues = false,
  items,
}: Props) {
  const router = useRouter();
  const shipping = 0;
  const total = subtotal + shipping;

  const handleCheckoutClick = () => {
    if (itemCount > 0 && !hasStockIssues) {
      // Build tracking items with effective unit prices using calculateItemTotal
      const trackingItems = items.map((item) => {
        const lineTotal = calculateItemTotal(
          item.product.price,
          item.quantity,
          item.productBundle,
        );
        return {
          id: item.id,
          quantity: item.quantity,
          price: lineTotal / item.quantity,
        };
      });

      trackInitiateCheckout(subtotal, trackingItems, "PHP");
      router.push("/order");
    }
  };

  const canCheckout = itemCount > 0 && !hasStockIssues;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm sticky top-24">
      <h2 className="text-base font-extrabold text-gray-900 mb-5">
        Order Summary
      </h2>

      {/* Stock issue warning */}
      {hasStockIssues && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 mb-4">
          <AlertTriangle size={15} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs font-semibold text-red-600 leading-snug">
            Some items exceed available stock. Please adjust quantities before
            checking out.
          </p>
        </div>
      )}

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
          <span className="font-semibold text-emerald-600">Free</span>
        </div>
      </div>

      <hr className="my-5 border-gray-100" />

      <div className="flex justify-between items-baseline mb-6">
        <span className="text-base font-extrabold text-gray-900">Total</span>
        <span className="text-xl font-extrabold text-orange-600">
          ₱{total.toLocaleString()}
        </span>
      </div>

      <button
        onClick={handleCheckoutClick}
        disabled={!canCheckout}
        className={[
          "w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-2xl transition-all shadow-md",
          canCheckout
            ? "bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white shadow-orange-200 cursor-pointer"
            : "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none",
        ].join(" ")}
      >
        <ShoppingBag size={16} />
        Proceed to Checkout
      </button>

      <Link
        href="/shop"
        className="flex items-center justify-center gap-1.5 mt-3 text-sm font-semibold text-gray-500 hover:text-orange-600 transition-colors"
      >
        <ArrowLeft size={13} />
        Continue Shopping
      </Link>
    </div>
  );
}
