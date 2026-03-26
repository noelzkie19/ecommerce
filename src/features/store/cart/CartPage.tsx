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

  const hasStockIssues = cart.items.some(
    (item) =>
      item.product.stock !== null &&
      item.product.stock !== undefined &&
      item.quantity > item.product.stock,
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Shopping Cart
            {cart.itemCount > 0 && (
              <span className="ml-3 text-2xl font-semibold text-orange-500">
                ({cart.itemCount})
              </span>
            )}
          </h1>
        </div>
      </section>

      {/* Cart Content */}
      <div className="bg-white rounded-t-3xl -mt-8 px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
        <div className="w-full max-w-[1440px] mx-auto">
          {isLoading && (
            <div className="flex items-center justify-center py-32">
              <Loader2 size={28} className="animate-spin text-orange-500" />
            </div>
          )}

          {!isLoading && cart.items.length === 0 && <CartEmpty />}

          {!isLoading && cart.items.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
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
    </div>
  );
}
