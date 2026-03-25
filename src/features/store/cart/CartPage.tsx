"use client";

import { useEffect } from "react";
import { Loader2, AlertTriangle } from "lucide-react";
import { useCart } from "./hooks/useCart";
import CartItemRow from "./components/CartItemRow";
import CartSummary from "./components/CartSummary";
import CartEmpty from "./components/CartEmpty";

export default function CartPage() {
  const { cart, isLoading, updateItem, removeItem, refetch } = useCart();

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Check if any cart item exceeds available stock
  const hasStockIssues = cart.items.some(
    (item) =>
      item.product.stock !== null &&
      item.product.stock !== undefined &&
      item.quantity > item.product.stock,
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="w-full px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Shopping Cart
            {cart.itemCount > 0 && (
              <span className="ml-3 text-xl font-semibold text-gray-400">
                ({cart.itemCount})
              </span>
            )}
          </h1>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-32">
            <Loader2 size={28} className="animate-spin text-orange-500" />
          </div>
        )}

        {/* Empty */}
        {!isLoading && cart.items.length === 0 && <CartEmpty />}

        {/* Cart content */}
        {!isLoading && cart.items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2">
              {/* Stock warning banner */}
              {hasStockIssues && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl px-5 py-4 mb-4">
                  <AlertTriangle
                    size={16}
                    className="text-red-500 shrink-0 mt-0.5"
                  />
                  <p className="text-sm font-semibold text-red-600">
                    Some items in your cart exceed available stock. Please
                    reduce quantities to proceed to checkout.
                  </p>
                </div>
              )}

              <div className="bg-white rounded-3xl border border-gray-100 px-6 shadow-sm">
                {cart.items.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onUpdate={updateItem}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </div>

            {/* Summary */}
            <CartSummary
              subtotal={cart.subtotal}
              itemCount={cart.totalQty}
              totalQty={cart.totalQty}
              hasStockIssues={hasStockIssues}
            />
          </div>
        )}
      </div>
    </div>
  );
}
