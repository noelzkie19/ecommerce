"use client";

import { useEffect, useState } from "react";
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
import type { ProductImage, ProductBundle } from "@/types/product.types";
import { useCartStore } from "@/store/cart.store";
import { CheckoutModal } from "@/features/store/home/modals/CheckoutModal";
import {
  getStockColorClass,
  getStockLabel,
  getLowStockThreshold,
  getCartButtonLabel,
} from "@/utils/stock.utils";
import { ModalCartItem } from "@/types/checkout.types";
import { trackViewContent, trackAddToCart } from "@/lib/meta-pixel";
import TestimonialCarousel from "./components/TestimonialCarousel";
import MoneyBackGuarantee from "./components/MoneyBackGuarantee";
import YoutubeTestimonials from "./components/YoutubeTestimonials";
import FAQSection from "./components/FaqSection";

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
  videoUrl?: string | null;
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

function calculateStockState(
  stock: number | null,
  cartQty: number,
  productId: string | undefined,
) {
  const outOfStock = stock !== null && stock === 0;
  const atCapacity = stock !== null && cartQty >= stock;
  const lowStock =
    stock !== null &&
    stock > 0 &&
    !atCapacity &&
    stock <= getLowStockThreshold(stock);
  const remaining =
    stock !== null && stock > 0 ? Math.max(0, stock - cartQty) : Infinity;
  const overStock = remaining !== Infinity && remaining === 0;
  return { outOfStock, atCapacity, lowStock, remaining, overStock };
}

function calculateDiscount(
  originalPrice: number | null,
  currentPrice: number,
): number | null {
  if (!originalPrice || originalPrice <= currentPrice) return null;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

export default function ShopDetailPage() {
  const params = useParams();
  const id = String(params?.id ?? "");

  const { product, stock, isLoading, error } = useShop(id);
  const [qty, setQty] = useState(1);
  const [selectedBundle, setSelectedBundle] = useState<ProductBundle | null>(
    null,
  );
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const { cart, addToCart, updateItem, removeItem, clearCart } = useCartStore();

  useEffect(() => {
    if (product?.id && product.price) {
      trackViewContent(product.id, product.price, "PHP");
    }
  }, [product?.id, product?.price]);

  const cartQty =
    cart.items.find((i) => i.product_id === product?.id)?.quantity ?? 0;
  const { outOfStock, atCapacity, lowStock, remaining, overStock } =
    calculateStockState(stock, cartQty, product?.id);

  const handleSelectBundle = (bundle: ProductBundle | null) => {
    setSelectedBundle(bundle);
    setQty(bundle?.bundleQty || 1);
  };

  const handleDecrement = () => setQty((q) => Math.max(1, q - 1));
  const handleIncrement = () =>
    setQty((q) =>
      remaining === Infinity ? q + 1 : Math.min(remaining, q + 1),
    );

  const qtyDisabled = outOfStock || atCapacity;

  const handleAddToCart = async () => {
    if (!product || outOfStock || atCapacity || overStock) return;
    const payload = {
      productId: product.id,
      quantity: qty,
      productBundleId: selectedBundle?.id ?? null,
    };
    console.log(
      "handleAddToCart payload:",
      payload,
      "selectedBundle:",
      selectedBundle,
    );
    await addToCart(payload);
    trackAddToCart(selectedBundle?.bundlePrice || product.price * qty, [
      {
        id: product.id,
        quantity: qty,
        price: selectedBundle?.bundlePrice || product.price,
      },
    ]);
    setCheckoutOpen(true);
  };

  const handlePlaceOrder = async () => {
    await clearCart();
  };

  const modalItems: ModalCartItem[] = cart.items.map((item) => {
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

  const discount = calculateDiscount(product.original_price, product.price);

  const stockColorClass = getStockColorClass(outOfStock, atCapacity, lowStock);
  const stockLabel =
    stock === null
      ? null
      : getStockLabel(outOfStock, atCapacity, lowStock, stock ?? 0);
  const cartBtnLabel = getCartButtonLabel(outOfStock, atCapacity, overStock);
  const savingsBadge = discount ? (
    <span className="text-sm font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
      -{discount}% OFF
    </span>
  ) : null;

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

            <div className="flex flex-col gap-4 sm:gap-5">
              {/* Category + badge pills */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                {product.badge && (
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Rating */}
              {product.rating != null && (
                <div className="flex items-center gap-2 flex-wrap">
                  <StarRating rating={product.rating} />
                  <span className="text-sm font-semibold text-gray-700">
                    {Number(product.rating).toFixed(1)}
                  </span>
                  {product.review_count != null && (
                    <span className="text-sm text-gray-400">
                      ({Number(product.review_count).toLocaleString()} reviews)
                    </span>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-2xl sm:text-3xl font-extrabold text-orange-600">
                  ₱
                  {selectedBundle?.bundlePrice !== null &&
                  selectedBundle?.bundlePrice !== undefined
                    ? selectedBundle.bundlePrice.toLocaleString()
                    : (product.price * qty).toLocaleString()}
                </span>
                {selectedBundle?.bundlePrice !== null &&
                  selectedBundle?.bundlePrice !== undefined && (
                    <span className="text-base sm:text-lg text-gray-400 line-through">
                      ₱{(product.price * qty).toLocaleString()}
                    </span>
                  )}
                {product.original_price &&
                  selectedBundle === null &&
                  qty === 1 && (
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

              {/* Bundle Selector */}
              {product.bundles && product.bundles.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  <p className="text-sm font-semibold text-gray-800">
                    Bundle:{" "}
                    <span className="text-gray-500 font-normal">
                      {selectedBundle?.name || "1 Pack"}
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectBundle(null)}
                      className={`relative flex flex-col items-center justify-center min-w-[84px] sm:min-w-[90px] px-4 sm:px-5 py-3 rounded-2xl border-2 transition-all duration-150 ${
                        selectedBundle === null
                          ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-200 scale-105"
                          : "bg-white border-gray-200 text-gray-700 hover:border-orange-400 hover:bg-orange-50"
                      }`}
                    >
                      <span className="text-sm font-bold leading-tight">
                        1 Pack
                      </span>
                    </button>
                    {product.bundles.map((bundle) => {
                      const isActive = selectedBundle?.id === bundle.id;
                      return (
                        <button
                          key={bundle.id}
                          type="button"
                          onClick={() => handleSelectBundle(bundle)}
                          className={`relative flex flex-col items-center justify-center min-w-[84px] sm:min-w-[90px] px-4 sm:px-5 py-3 rounded-2xl border-2 transition-all duration-150 ${
                            isActive
                              ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-200 scale-105"
                              : "bg-white border-gray-200 text-gray-700 hover:border-orange-400 hover:bg-orange-50"
                          }`}
                        >
                          <span className="text-sm font-bold leading-tight">
                            {bundle.name}
                          </span>
                          {bundle.bundlePrice !== null && (
                            <span
                              className={`mt-0.5 text-[11px] font-semibold ${
                                isActive
                                  ? "text-orange-200"
                                  : "text-emerald-600"
                              }`}
                            >
                              ₱{bundle.bundlePrice.toLocaleString()}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity + Add to Cart */}
              {selectedBundle === null && (
                <p className="text-sm font-semibold text-gray-800 -mb-1">
                  Quantity
                </p>
              )}

              <div className="flex items-center gap-3">
                {selectedBundle === null ? (
                  <div
                    className={`flex items-center rounded-2xl border-2 overflow-hidden bg-white transition-colors ${
                      qtyDisabled
                        ? "border-gray-100 bg-gray-50"
                        : "border-gray-200"
                    }`}
                  >
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={handleDecrement}
                      disabled={qtyDisabled || qty <= 1}
                      className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-gray-500 hover:text-orange-600 hover:bg-orange-50 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
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
                        qtyDisabled ||
                        (remaining !== Infinity && qty >= remaining)
                      }
                      className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-gray-500 hover:text-orange-600 hover:bg-orange-50 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-50 px-4 py-2 rounded-xl">
                    <span>Quantity:</span>
                    <span className="text-orange-600">
                      {selectedBundle?.bundleQty} items
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={outOfStock || atCapacity || overStock}
                  className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed active:scale-[0.98] disabled:active:scale-100 text-white font-bold text-sm h-10 sm:h-11 px-4 sm:px-6 rounded-2xl transition-all shadow-md shadow-orange-200 disabled:shadow-none"
                >
                  <ShoppingCart size={16} />
                  {cartBtnLabel}
                </button>
              </div>

              {/* Info rows */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                  <span>{outOfStock ? "Out of stock" : "In stock"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <PackageCheck size={16} className="text-blue-500 shrink-0" />
                  <span>FREE SHIPPING on all orders</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
                {TRUST_BADGES.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5 bg-white border border-gray-100 rounded-2xl py-3 sm:py-4 px-2 shadow-sm"
                  >
                    <Icon size={20} className="text-orange-500" />
                    <span className="text-[11px] sm:text-xs font-medium text-gray-600 text-center leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Below-the-fold sections */}
      <div className="border-t border-gray-100 bg-gray-50/80">
        <YoutubeTestimonials />
      </div>

      <div className="border-t border-gray-100 bg-white">
        <MoneyBackGuarantee />
      </div>

      <div className="border-t border-gray-100 bg-gray-50/80">
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
