"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, ShoppingCart, Loader2, Star } from "lucide-react";
import type { Product } from "@/types/product.types";
import { useCartStore } from "@/store/cart.store";
import { trackAddToCart } from "@/lib/meta-pixel";
import {
  getStockColorClass,
  getStockLabel,
  getLowStockThreshold,
} from "@/utils/stock.utils";

const StarRating = ({ rating }: { readonly rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={
          i < Math.round(rating)
            ? "text-amber-400 fill-amber-400"
            : "text-gray-200 fill-gray-200"
        }
        strokeWidth={0}
      />
    ))}
  </div>
);

interface Props {
  readonly product: Product;
  readonly stock?: number | null;
  readonly cartQty?: number;
  readonly onAddSuccess?: () => void;
}

export default function ProductCard({
  product,
  stock = null,
  cartQty = 0,
  onAddSuccess,
}: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCartStore();

  const thumb = product.images?.length
    ? product.images[0].url
    : product.image_url;

  const outOfStock = stock !== null && stock === 0;
  const atCapacity = stock !== null && stock > 0 && cartQty >= stock;
  const lowStock =
    stock !== null &&
    stock > 0 &&
    !atCapacity &&
    stock <= getLowStockThreshold(stock);
  const isDisabled = outOfStock || atCapacity || isAdding;

  const stockColorClass = getStockColorClass(outOfStock, atCapacity, lowStock);
  const stockLabel = getStockLabel(
    outOfStock,
    atCapacity,
    lowStock,
    stock ?? 0,
    cartQty,
  );

  const getAddButtonLabel = (): string => {
    if (outOfStock || atCapacity) return "Out of Stock";
    if (isAdding) return "Adding…";
    return "Add";
  };

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDisabled) return;
    setIsAdding(true);
    try {
      await addToCart({ productId: product.id, quantity: 1 });
      // Track AddToCart event
      trackAddToCart(product.price, [
        { id: product.id, quantity: 1, price: product.price },
      ]);
      onAddSuccess?.();
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-100 hover:shadow-xl hover:shadow-purple-50/80 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 aspect-video">
        {thumb ? (
          <img
            src={thumb}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gray-100" />
        )}

        {/* Quick View overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href={`/shop/${product.id}`}
            className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 flex items-center gap-1.5 bg-white text-gray-900 font-bold text-xs px-4 py-2 rounded-full shadow-xl hover:bg-gray-50"
          >
            <Eye size={13} /> Quick View
          </Link>
        </div>

        {/* Out of stock overlay */}
        {(outOfStock || atCapacity) && (
          <div className="absolute inset-0 bg-white/50 flex items-end justify-center pb-3 pointer-events-none">
            <span className="bg-gray-800/80 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wide">
              {outOfStock ? "Out of Stock" : "Max in Cart"}
            </span>
          </div>
        )}

        {/* Badge */}
        {product.badge && (
          <span
            className={[
              "absolute top-2.5 left-2.5 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md tracking-wide",
              product.badge === "New" ? "bg-emerald-500" : "bg-orange-500",
            ].join(" ")}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Stars */}
        <div className="flex items-center gap-1 mb-1.5">
          <StarRating rating={product.rating ?? 5} />
          <span className="text-[10px] font-semibold text-gray-400">
            ({product.rating ?? "—"})
          </span>
        </div>

        {/* Name */}
        <h3 className="font-extrabold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-[11px] text-gray-500 leading-relaxed flex-1 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price + Actions */}
        <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
          {/* Price row */}
          <div>
            <span
              className={`text-lg font-extrabold tracking-tight ${
                outOfStock || atCapacity ? "text-gray-300" : "text-gray-900"
              }`}
            >
              ₱{product.price.toLocaleString()}
            </span>
            {stock !== null && (
              <p
                className={`text-[10px] font-semibold mt-0.5 ${stockColorClass}`}
              >
                {stockLabel}
              </p>
            )}
          </div>

          {/* Button row */}
          <div className="flex items-center gap-2">
            <Link
              href={`/shop/${product.id}`}
              className="flex items-center justify-center gap-1 border-2 border-gray-200 text-gray-600 hover:border-purple-300 hover:text-orange-600 text-[11px] font-bold px-3 py-2 rounded-xl transition-all whitespace-nowrap"
            >
              <Eye size={12} /> View
            </Link>
            <button
              type="button"
              onClick={handleAdd}
              disabled={isDisabled}
              className="flex-1 flex items-center justify-center gap-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:shadow-none disabled:active:scale-100 active:scale-95 text-white text-[11px] font-bold px-3 py-2 rounded-xl shadow-sm shadow-orange-200 hover:shadow-orange-300 transition-all whitespace-nowrap"
            >
              {isAdding ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <ShoppingCart size={12} />
              )}
              {getAddButtonLabel()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
