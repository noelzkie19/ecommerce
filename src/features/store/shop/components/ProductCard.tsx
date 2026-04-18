"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, ShoppingCart, Loader2, Star } from "lucide-react";
import type { Product, ProductBundle } from "@/types/product.types";
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

// Helper to find the best bundle (lowest per-item price)
function findBestBundle(
  bundles: ProductBundle[] | undefined,
): ProductBundle | undefined {
  if (!bundles || bundles.length === 0) return undefined;
  return [...bundles]
    .filter((b) => b.isActive)
    .sort(
      (a, b) => a.bundlePrice / a.bundleQty - b.bundlePrice / b.bundleQty,
    )[0];
}

// Helper to check if bundle is a good deal
function isBundleCheaper(bundle: ProductBundle, unitPrice: number): boolean {
  return bundle.bundlePrice / bundle.bundleQty < unitPrice;
}

interface PriceDisplayProps {
  readonly product: Product;
  readonly selectedBundle: ProductBundle | null | undefined;
  readonly outOfStock: boolean;
  readonly atCapacity: boolean;
  readonly onSelectBundle: (bundle: ProductBundle | null) => void;
}

function PriceDisplay({
  product,
  selectedBundle,
  outOfStock,
  atCapacity,
  onSelectBundle,
}: PriceDisplayProps) {
  const hasBundles = product.bundles && product.bundles.length > 0;
  const bundles = product.bundles ?? [];
  const bestBundle = hasBundles ? findBestBundle(bundles) : undefined;
  const isDisabled = outOfStock || atCapacity;

  // Case 1: Specific bundle is selected - show that bundle's price
  if (selectedBundle !== null && selectedBundle !== undefined) {
    return (
      <div className="flex flex-col">
        <span
          className={`text-lg font-extrabold tracking-tight ${
            isDisabled ? "text-gray-300" : "text-orange-600"
          }`}
        >
          ₱{selectedBundle.bundlePrice.toLocaleString()}
        </span>
        <span className="text-[10px] text-gray-500">
          {selectedBundle.name} ({selectedBundle.bundleQty} items)
        </span>
        <span className="text-[10px] text-gray-400 line-through">
          ₱{(product.price * selectedBundle.bundleQty).toLocaleString()}
        </span>
        {/* Bundle selector */}
        <BundleSelector
          bundles={bundles}
          selectedBundle={selectedBundle}
          productPrice={product.price}
          onSelect={onSelectBundle}
        />
      </div>
    );
  }

  // Case 2: Has bundles but none explicitly selected - show best bundle price
  if (hasBundles && bestBundle && selectedBundle === undefined) {
    return (
      <div className="flex flex-col">
        <span
          className={`text-lg font-extrabold tracking-tight ${
            isDisabled ? "text-gray-300" : "text-orange-600"
          }`}
        >
          ₱{bestBundle.bundlePrice.toLocaleString()}
        </span>
        <span className="text-[10px] text-emerald-600 font-semibold">
          {bestBundle.name} ({bestBundle.bundleQty} items)
        </span>
        <span className="text-[10px] text-gray-400 line-through">
          ₱{(product.price * bestBundle.bundleQty).toLocaleString()}
        </span>
        {/* Bundle selector */}
        <BundleSelector
          bundles={bundles}
          selectedBundle={bestBundle ?? undefined}
          productPrice={product.price}
          onSelect={onSelectBundle}
        />
      </div>
    );
  }

  // Case 2b: User explicitly selected 1pc (no bundle)
  if (hasBundles && selectedBundle === null) {
    return (
      <div className="flex flex-col">
        <span
          className={`text-lg font-extrabold tracking-tight ${
            isDisabled ? "text-gray-300" : "text-gray-900"
          }`}
        >
          ₱{product.price.toLocaleString()}
        </span>
        <span className="text-[10px] text-gray-500">1 item</span>
        {/* Bundle selector */}
        <BundleSelector
          bundles={bundles}
          selectedBundle={null}
          productPrice={product.price}
          onSelect={onSelectBundle}
        />
      </div>
    );
  }

  // Case 3: No bundles - show regular price
  return (
    <span
      className={`text-lg font-extrabold tracking-tight ${
        isDisabled ? "text-gray-300" : "text-gray-900"
      }`}
    >
      ₱{product.price.toLocaleString()}
    </span>
  );
}

interface BundleSelectorProps {
  readonly bundles: ProductBundle[];
  readonly selectedBundle: ProductBundle | null | undefined;
  readonly productPrice: number;
  readonly onSelect: (bundle: ProductBundle | null) => void;
}

function BundleSelector({
  bundles,
  selectedBundle,
  productPrice,
  onSelect,
}: BundleSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-colors ${
          selectedBundle === null || selectedBundle === undefined
            ? "bg-orange-500 text-white border-orange-500"
            : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
        }`}
      >
        1pc
      </button>
      {bundles.slice(0, 2).map((bundle) => {
        const isCheaper = isBundleCheaper(bundle, productPrice);
        const isSelected = selectedBundle?.id === bundle.id;
        let buttonClass: string;
        if (isSelected) {
          buttonClass = "bg-orange-500 text-white border-orange-500";
        } else if (isCheaper) {
          buttonClass =
            "bg-emerald-50 text-emerald-600 border-emerald-200 hover:border-emerald-300";
        } else {
          buttonClass = "bg-white text-gray-600 border-gray-200";
        }
        return (
          <button
            key={bundle.id}
            type="button"
            onClick={() => onSelect(bundle)}
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-colors ${buttonClass}`}
          >
            {bundle.name}
          </button>
        );
      })}
    </div>
  );
}

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
  const [selectedBundle, setSelectedBundle] = useState<
    ProductBundle | null | undefined
  >(undefined);
  const { addToCart } = useCartStore();

  const thumb = product.images?.length
    ? product.images[0].url
    : product.image_url;

  const outOfStock = stock !== null && stock === 0;
  const atCapacity = stock !== null && stock > 0 && cartQty >= stock;
  // Check if selected bundle quantity exceeds available stock
  const bundleExceedsStock =
    selectedBundle !== null &&
    selectedBundle !== undefined &&
    stock !== null &&
    stock > 0 &&
    selectedBundle.bundleQty > stock;
  const lowStock =
    stock !== null &&
    stock > 0 &&
    !atCapacity &&
    stock <= getLowStockThreshold(stock);
  const isDisabled = outOfStock || atCapacity || isAdding || bundleExceedsStock;

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
      let bundleId: string | null = null;
      let price = product.price;

      if (selectedBundle === undefined) {
        // Default: use best bundle
        const best = findBestBundle(product.bundles ?? []);
        if (best) {
          bundleId = best.id;
          price = best.bundlePrice;
        }
      } else if (selectedBundle === null) {
        // User chose 1pc - already initialized correctly
        // quantity = 1, bundleId = null, price = product.price
      } else {
        // User chose specific bundle
        bundleId = selectedBundle.id;
        price = selectedBundle.bundlePrice;
      }

      // Determine quantity based on selection
      let quantity: number;
      if (bundleId) {
        if (selectedBundle === undefined) {
          quantity = findBestBundle(product.bundles ?? [])?.bundleQty ?? 1;
        } else {
          quantity = (selectedBundle as ProductBundle).bundleQty;
        }
      } else {
        quantity = 1;
      }

      await addToCart({
        productId: product.id,
        quantity,
        productBundleId: bundleId,
      });
      trackAddToCart(price, [{ id: product.id, quantity, price }]);
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

        {/* Bundle Badges - dynamic from product.bundles */}
        {product.bundles && product.bundles.length > 0 && (
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1">
            {product.bundles.map((bundle) => (
              <span
                key={bundle.id}
                className="bg-emerald-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-md"
              >
                {bundle.name} ₱{bundle.bundlePrice.toLocaleString()}
              </span>
            ))}
          </div>
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
            <PriceDisplay
              product={product}
              selectedBundle={selectedBundle}
              outOfStock={outOfStock}
              atCapacity={atCapacity}
              onSelectBundle={setSelectedBundle}
            />
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
              className="flex items-center justify-center gap-1 border-2 border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600 text-[11px] font-bold px-3 py-2 rounded-xl transition-all whitespace-nowrap"
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
