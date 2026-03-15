"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { FadeIn, SectionLabel } from "./HomePrimitives";
import { shopService } from "@/features/store/shop/services/shop.service";
import type { Product } from "@/types/product.types";
import { useCartStore } from "@/store/cart.store";
import { CheckoutModal } from "../modals/CheckoutModal";
import ProductCard from "@/features/store/shop/components/ProductCard";
import { ModalCartItem } from "@/types/checkout.types";

export const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [stockMap, setStockMap] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const { cart, updateItem, removeItem, clearCart, fetchCart } = useCartStore();

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await shopService.getAll({ limit: 3, page: 1 });
      setProducts(res.data);
      const stocks = await Promise.all(
        res.data.map((p: Product) =>
          shopService
            .getStockByProductId(p.id)
            .then((qty: number) => ({ id: p.id, quantity: qty }))
            .catch(() => ({ id: p.id, quantity: 0 })),
        ),
      );
      const map: Record<string, number> = {};
      for (const s of stocks) map[s.id] = s.quantity;
      setStockMap(map);
    } catch {
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
    fetchCart();
  }, []);

  const modalItems: ModalCartItem[] = cart.items.map((item) => ({
    id: item.id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    image: item.product.images?.[0]?.url ?? item.product.image_url ?? undefined,
  }));

  return (
    <section className="bg-white py-20 sm:py-28 lg:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14 lg:mb-16">
          <div>
            <SectionLabel>Our Products</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-gray-900 mt-4 sm:mt-6 tracking-tight">
              Popular Health Products
            </h2>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-bold text-sm sm:text-base transition-colors flex-shrink-0"
          >
            View All Products
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </FadeIn>

        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={28} className="animate-spin text-purple-400" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {products.map((p, i) => (
              <FadeIn key={p.id} delay={i * 100}>
                <ProductCard
                  product={p}
                  stock={stockMap[p.id] ?? 0}
                  cartQty={
                    cart.items.find((item) => (item as any).product_id === p.id)
                      ?.quantity ?? 0
                  }
                  onAddSuccess={() => setCheckoutOpen(true)}
                />
              </FadeIn>
            ))}
          </div>
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
    </section>
  );
};
