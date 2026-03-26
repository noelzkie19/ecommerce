"use client";

import { useState, useCallback, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useShops } from "./hooks/useShops";
import ProductCard from "./components/ProductCard";
import ShopFilters from "./components/ShopFilters";
import ShopPagination from "./components/ShopPagination";
import { CheckoutModal } from "@/features/store/home/modals/CheckoutModal";
import { shopService } from "@/features/store/shop/services/shop.service";
import { useCartStore } from "@/store/cart.store";
import type { Product } from "@/types/product.types";
import { ModalCartItem } from "@/types/checkout.types";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [stockMap, setStockMap] = useState<Record<string, number>>({});
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const { products, meta, isLoading, error } = useShops({
    page,
    limit: 12,
    search: search || undefined,
    category: category || undefined,
  });

  const { cart, updateItem, removeItem, clearCart } = useCartStore();

  // Fetch stock for all products whenever the product list changes
  useEffect(() => {
    if (!products.length) return;
    Promise.all(
      products.map((p: Product) =>
        shopService
          .getStockByProductId(p.id)
          .then((qty: number) => ({ id: p.id, quantity: qty }))
          .catch(() => ({ id: p.id, quantity: 0 })),
      ),
    ).then((stocks) => {
      const map: Record<string, number> = {};
      for (const s of stocks) map[s.id] = s.quantity;
      setStockMap(map);
    });
  }, [products]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const handleSearchClear = useCallback(() => {
    setSearch("");
    setPage(1);
  }, []);

  const handleCategory = useCallback((cat: string) => {
    setCategory(cat);
    setPage(1);
  }, []);

  const modalItems: ModalCartItem[] = cart.items.map((item) => ({
    id: item.id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    image: item.product.images?.[0]?.url ?? item.product.image_url ?? undefined,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Header Section */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3 tracking-tight">
              Shop
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl">
              Browse our collection of premium products at great prices
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-8 sm:py-12 bg-white rounded-t-3xl -mt-8">
        {/* Filters */}
        <div className="mb-8">
          <ShopFilters
            search={search}
            category={category}
            onSearchChange={handleSearch}
            onSearchClear={handleSearchClear}
            onCategoryChange={handleCategory}
          />
        </div>

        {/* Results count */}
        {!isLoading && meta && (
          <p className="text-xs text-gray-400 mb-5">
            Showing{" "}
            <span className="font-semibold text-gray-600">
              {products.length}
            </span>{" "}
            of <span className="font-semibold text-gray-600">{meta.total}</span>{" "}
            products
          </p>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-32">
            <Loader2 size={28} className="animate-spin text-gray-400" />
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-5 py-4">
            {error}
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <p className="text-gray-400 text-sm">No products found.</p>
            {(search || category) && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("");
                  setPage(1);
                }}
                className="text-sm font-semibold text-gray-400 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        {!isLoading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {products.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                stock={stockMap[product.id] ?? null}
                cartQty={
                  cart.items.find((item) => item.product_id === product.id)
                    ?.quantity ?? 0
                }
                onAddSuccess={() => setCheckoutOpen(true)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {meta && (
          <ShopPagination meta={meta} page={page} onPageChange={setPage} />
        )}
      </div>

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={modalItems}
        onQuantityChange={(id, qty) => updateItem(id, qty)}
        onRemove={(id) => removeItem(id)}
        onPlaceOrder={async () => {
          await clearCart();
        }}
      />
    </div>
  );
}
