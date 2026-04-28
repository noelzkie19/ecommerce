"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useShop } from "@/features/store/shop/hooks/useShop";
import ProductForm from "@/features/store/shop/components/ProductForm";
import ProductGallery from "@/features/store/shop/components/ProductGallery";
import { CheckoutModal } from "@/features/store/home/modals/CheckoutModal";
import { useCartStore } from "@/store/cart.store";
import { trackViewContent } from "@/lib/meta-pixel";
import type { ProductImage } from "@/types/product.types";

function buildImages(product: {
  images?: ProductImage[];
  image_url?: string | null;
  id: string;
}): ProductImage[] {
  if (product.images?.length) {
    return [...product.images].sort((a, b) => a.position - b.position);
  }
  if (product.image_url) {
    return [
      {
        id: "fallback",
        url: product.image_url,
        position: 0,
        product_id: product.id,
        created_at: "",
      },
    ];
  }
  return [];
}

export default function ShopFormPage() {
  const params = useParams();
  const id = String(params?.id ?? "");

  const { product, stock, isLoading, error } = useShop(id);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { cart, updateItem, removeItem, clearCart } = useCartStore();

  useEffect(() => {
    if (product?.id && product.price) {
      trackViewContent(product.id, product.price, "PHP");
    }
  }, [product?.id, product?.price]);

  const handlePlaceOrder = async () => {
    await clearCart();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-orange-500" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-gray-400 text-sm">Product not found.</p>
        <Link
          href="/shop"
          className="text-sm font-semibold text-orange-500 hover:underline"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const modalItems = cart.items.map((item) => {
    // Use bundle price if applicable
    const unitPrice =
      item.productBundle && item.quantity >= item.productBundle.bundleQty
        ? item.productBundle.bundlePrice / item.productBundle.bundleQty
        : item.product.price;
    return {
      id: item.id,
      name: item.product.name,
      price: unitPrice,
      quantity: item.quantity,
      image:
        item.product.images?.[0]?.url ?? item.product.image_url ?? undefined,
      stock: item.product.stock ?? null,
      productBundleId: item.productBundleId,
      productBundle: item.productBundle,
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <Link
              href="/shop"
              className="text-sm font-semibold text-gray-400 hover:text-orange-500 transition-colors"
            >
              Shop
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-sm font-semibold text-orange-500">
              {product.name}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {product.name}
          </h1>
        </div>
      </section>

      {/* Product Content */}
      <div className="bg-white rounded-t-3xl -mt-8 px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-20">
            <ProductGallery
              images={buildImages(product)}
              productName={product.name}
              badge={product.badge}
              youtubeUrl={product.videoUrl}
            />

            <ProductForm
              product={product}
              stock={stock}
              onCheckoutOpen={() => setCheckoutOpen(true)}
            />
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={modalItems}
        onQuantityChange={(id, qty) => updateItem(id, qty)}
        onRemove={(id) => removeItem(id)}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
}
