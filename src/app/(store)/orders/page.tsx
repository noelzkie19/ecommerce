/**
 * Client Orders Page
 *
 * Page for displaying user's order history with status tracking.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, PackageOpen, ShoppingBag } from "lucide-react";
import {
  useClientOrders,
  OrderCard,
  OrderDetailModal,
} from "@/features/store/orders";
import type { Order } from "@/domain/entities";

export default function OrdersPage() {
  const router = useRouter();
  const { orders, isLoading, error, refetch } = useClientOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleGoBack = () => {
    router.back();
  };

  const handleGoShopping = () => {
    router.push("/shop");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Header Section */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleGoBack}
              className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                My Orders
              </h1>
              <p className="text-gray-300 text-lg mt-0.5">
                Track and manage your orders
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-8 sm:py-12 bg-white rounded-t-3xl -mt-8">
        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={24} className="animate-spin text-gray-400" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-5 py-4 mb-6">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-2 text-red-600 underline hover:text-red-800"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !error && orders.length === 0 && (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <PackageOpen size={36} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              No orders yet
            </h2>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              You haven't placed any orders yet. Start shopping to see your
              orders here.
            </p>
            <button
              type="button"
              onClick={handleGoShopping}
              className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold text-sm py-3 px-6 rounded-xl transition-all shadow-md shadow-gray-500/20"
            >
              <ShoppingBag size={16} />
              Start Shopping
            </button>
          </div>
        )}

        {!isLoading && !error && orders.length > 0 && (
          /* Orders List */
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetails={setSelectedOrder}
              />
            ))}
          </div>
        )}

        {/* Order Detail Modal */}
        {selectedOrder && (
          <OrderDetailModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </div>
    </div>
  );
}
