"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  Minus,
  Plus,
  ShieldCheck,
  Leaf,
  Truck,
  Loader2,
  CheckCircle2,
  PackageCheck,
} from "lucide-react";
import { useShop } from "./hooks/useShop";
import ProductGallery from "./components/ProductGallery";
import type { ProductImage } from "@/types/product.types";
import { useCartStore } from "@/store/cart.store";
import { CheckoutModal } from "@/features/store/home/modals/CheckoutModal";
import {
  getStockColorClass,
  getStockLabel,
  getLowStockThreshold,
  getCartButtonLabel,
} from "@/utils/stock.utils";
import { ModalCartItem } from "@/types/checkout.types";
import TestimonialCarousel from "./components/TestimonialCarousel";
import MoneyBackGuarantee from "./components/MoneyBackGuarantee";
import YoutubeTestimonials from "./components/YoutubeTestimonials";
import FAQSection from "./components/FaqSection";

const BUNDLE_OPTIONS = [
  { label: "1 Pack", multiplier: 1, discount: 0 },
  { label: "Bundle of 2", multiplier: 2, discount: 100 },
  { label: "Bundle of 4", multiplier: 4, discount: 200 },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "FDA Approved" },
  { icon: Leaf, label: "100% Natural" },
  { icon: Truck, label: "Fast Delivery" },
];

const StarRating = ({ rating }: { readonly rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => {
      const filled = i < Math.floor(rating);
      const partial = !filled && i < rating;
      return (
        <span key={i} className="relative inline-block w-4 h-4">
          <Star
            size={16}
            className="text-gray-200 fill-gray-200"
            strokeWidth={0}
          />
          {(filled || partial) && (
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: filled ? "100%" : `${(rating % 1) * 100}%` }}
            >
              <Star
                size={16}
                className="text-amber-400 fill-amber-400"
                strokeWidth={0}
              />
            </span>
          )}
        </span>
      );
    })}
  </div>
);

interface ProductLike {
  images?: ProductImage[];
  image_url?: string | null;
  id: string;
}

function buildImages(product: ProductLike): ProductImage[] {
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

function buildSavingsBadge(
  packDiscount: number,
  productDiscount: number | null,
): React.ReactNode {
  if (packDiscount > 0) {
    return (
      <span className="text-sm font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
        Save ₱{packDiscount}
      </span>
    );
  }
  if (productDiscount) {
    return (
      <span className="text-sm font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
        -{productDiscount}% OFF
      </span>
    );
  }
  return null;
}

export default function ShopDetailPage() {
  const params = useParams();
  const id = String(params?.id ?? "");

  const { product, stock, isLoading, error } = useShop(id);
  const [qty, setQty] = useState(1);
  const [selectedPack, setSelectedPack] = useState(BUNDLE_OPTIONS[0]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const { cart, addToCart, updateItem, removeItem, clearCart } = useCartStore();

  const outOfStock = stock !== null && stock === 0;
  const atCapacity =
    stock !== null &&
    (cart.items.find((i) => i.product_id === product?.id)?.quantity ?? 0) >=
      stock;
  const lowStock =
    stock !== null &&
    stock > 0 &&
    !atCapacity &&
    stock <= getLowStockThreshold(stock);

  const cartQty =
    cart.items.find((i) => i.product_id === product?.id)?.quantity ?? 0;
  const remaining =
    stock !== null && stock > 0 ? Math.max(0, stock - cartQty) : Infinity;
  const overStock = remaining !== Infinity && qty > remaining;

  const handleSelectPack = (pack: (typeof BUNDLE_OPTIONS)[number]) => {
    setSelectedPack(pack);
    setQty(pack.multiplier);
  };

  const handleDecrement = () => setQty((q) => Math.max(1, q - 1));
  const handleIncrement = () =>
    setQty((q) =>
      remaining === Infinity ? q + 1 : Math.min(remaining, q + 1),
    );

  const qtyDisabled = outOfStock || atCapacity;

  const handleAddToCart = async () => {
    if (!product || outOfStock || atCapacity || overStock) return;
    await addToCart({ productId: product.id, quantity: qty });
    setCheckoutOpen(true);
  };

  const handlePlaceOrder = async () => {
    await clearCart();
  };

  const modalItems: ModalCartItem[] = cart.items.map((item) => ({
    id: item.id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    image: item.product.images?.[0]?.url ?? item.product.image_url ?? undefined,
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-purple-500" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-gray-500 text-sm">Product not found.</p>
        <Link
          href="/shop"
          className="text-sm font-semibold text-purple-600 hover:underline"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const discount =
    product.original_price && product.original_price > product.price
      ? Math.round(
          ((product.original_price - product.price) / product.original_price) *
            100,
        )
      : null;

  const stockColorClass = getStockColorClass(outOfStock, atCapacity, lowStock);
  const stockLabel = getStockLabel(
    outOfStock,
    atCapacity,
    lowStock,
    stock ?? 0,
  );
  const cartBtnLabel = getCartButtonLabel(outOfStock, atCapacity, overStock);
  const savingsBadge = buildSavingsBadge(selectedPack.discount, discount);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* ── Product Hero ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-6 sm:py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-20">
          <ProductGallery
            images={buildImages(product)}
            productName={product.name}
            badge={product.badge}
          />

          <div className="flex flex-col gap-4 sm:gap-5">
            {/* Category + badge pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full">
                {product.category}
              </span>
              {product.badge && (
                <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating !== null && (
              <div className="flex items-center gap-2 flex-wrap">
                <StarRating rating={product.rating} />
                <span className="text-sm font-semibold text-gray-700">
                  {product.rating.toFixed(1)}
                </span>
                {product.review_count !== null && (
                  <span className="text-sm text-gray-400">
                    ({product.review_count.toLocaleString()} reviews)
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-2xl sm:text-3xl font-extrabold text-purple-600">
                ₱
                {(product.price * qty - selectedPack.discount).toLocaleString()}
              </span>
              {selectedPack.multiplier > 1 && (
                <span className="text-base sm:text-lg text-gray-400 line-through">
                  ₱{(product.price * qty).toLocaleString()}
                </span>
              )}
              {product.original_price && selectedPack.multiplier === 1 && (
                <span className="text-base sm:text-lg text-gray-400 line-through">
                  ₱{product.original_price.toLocaleString()}
                </span>
              )}
              {savingsBadge}
            </div>

            {/* Stock label */}
            {stock !== null && (
              <p className={`text-xs font-semibold ${stockColorClass}`}>
                {stockLabel}
              </p>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {product.description}
              </p>
            )}

            <TestimonialCarousel />

            <hr className="border-gray-100" />

            {/* ── Bundle Selector ── */}
            <div className="flex flex-col gap-2.5">
              <p className="text-sm font-semibold text-gray-800">
                Bundle:{" "}
                <span className="text-gray-500 font-normal">
                  {selectedPack.label}
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {BUNDLE_OPTIONS.map((pack) => {
                  const isActive = selectedPack.label === pack.label;
                  return (
                    <button
                      key={pack.label}
                      type="button"
                      onClick={() => handleSelectPack(pack)}
                      className={`relative flex flex-col items-center justify-center min-w-[84px] sm:min-w-[90px] px-4 sm:px-5 py-3 rounded-2xl border-2 transition-all duration-150 ${
                        isActive
                          ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-200 scale-105"
                          : "bg-white border-gray-200 text-gray-700 hover:border-purple-400 hover:bg-purple-50"
                      }`}
                    >
                      <span className="text-sm font-bold leading-tight">
                        {pack.label}
                      </span>
                      {pack.discount > 0 && (
                        <span
                          className={`mt-0.5 text-[11px] font-semibold ${
                            isActive ? "text-purple-200" : "text-emerald-600"
                          }`}
                        >
                          Save ₱{pack.discount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Quantity + Add to Cart ── */}
            <p className="text-sm font-semibold text-gray-800 -mb-1">
              Quantity
            </p>

            <div className="flex items-center gap-3">
              <div
                className={`flex items-center rounded-2xl border-2 overflow-hidden bg-white transition-colors ${
                  qtyDisabled ? "border-gray-100 bg-gray-50" : "border-gray-200"
                }`}
              >
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={handleDecrement}
                  disabled={qtyDisabled || qty <= 1}
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-gray-500 hover:text-purple-600 hover:bg-purple-50 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span
                  className={`w-9 sm:w-10 text-base font-bold text-center ${
                    qtyDisabled ? "text-gray-300" : "text-gray-900"
                  }`}
                >
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={handleIncrement}
                  disabled={
                    qtyDisabled || (remaining !== Infinity && qty >= remaining)
                  }
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-gray-500 hover:text-purple-600 hover:bg-purple-50 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={outOfStock || atCapacity || overStock}
                className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed active:scale-[0.98] disabled:active:scale-100 text-white font-bold text-sm h-10 sm:h-11 px-4 sm:px-6 rounded-2xl transition-all shadow-md shadow-purple-200 disabled:shadow-none"
              >
                <ShoppingCart size={16} />
                {cartBtnLabel}
              </button>
            </div>

            {/* ── Info rows ── */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                <span>{outOfStock ? "Out of stock" : "In stock"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <PackageCheck size={16} className="text-blue-500 shrink-0" />
                <span>
                  FREE SHIPPING on all orders above{" "}
                  <span className="font-semibold">₱2500</span>
                </span>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 bg-white border border-gray-100 rounded-2xl py-3 sm:py-4 px-2 shadow-sm"
                >
                  <Icon size={20} className="text-purple-500" />
                  <span className="text-[11px] sm:text-xs font-medium text-gray-600 text-center leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Below-the-fold sections ── */}
      <div className="border-t border-gray-100 bg-white">
        <YoutubeTestimonials />
      </div>

      <div className="border-t border-gray-100 bg-gray-50/60">
        <MoneyBackGuarantee />
      </div>

      <div className="border-t border-gray-100 bg-white">
        <FAQSection />
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
