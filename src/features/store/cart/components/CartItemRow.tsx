"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItemWithProduct } from "@/types/cart.types";

interface Props {
  readonly item: CartItemWithProduct;
  readonly onUpdate: (id: string, quantity: number) => Promise<void>;
  readonly onRemove: (id: string) => Promise<void>;
}

export default function CartItemRow({ item, onUpdate, onRemove }: Props) {
  const thumb =
    item.product.images && item.product.images.length > 0
      ? [...item.product.images].sort((a, b) => a.position - b.position)[0].url
      : item.product.image_url;

  return (
    <div className="flex items-center gap-4 py-5 border-b border-gray-100 last:border-0">
      {/* Thumbnail */}
      <Link
        href={`/shop/${item.product.id}`}
        className="flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors"
      >
        {thumb ? (
          <img
            src={thumb}
            alt={item.product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100" />
        )}
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/shop/${item.product.id}`}
          className="font-bold text-sm text-gray-900 hover:text-orange-600 transition-colors line-clamp-2 leading-snug"
        >
          {item.product.name}
        </Link>
        <p className="text-sm font-extrabold text-orange-600 mt-1">
          ₱{item.product.price.toLocaleString()}
        </p>
      </div>

      {/* Qty stepper */}
      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white flex-shrink-0">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => onUpdate(item.id, Math.max(1, item.quantity - 1))}
          className="px-2.5 py-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 transition-colors"
        >
          <Minus size={13} />
        </button>
        <span className="px-3 text-sm font-bold text-gray-900 min-w-[2rem] text-center">
          {item.quantity}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => onUpdate(item.id, item.quantity + 1)}
          className="px-2.5 py-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 transition-colors"
        >
          <Plus size={13} />
        </button>
      </div>

      {/* Line total */}
      <p className="text-sm font-extrabold text-gray-900 w-20 text-right flex-shrink-0">
        ₱{(item.product.price * item.quantity).toLocaleString()}
      </p>

      {/* Remove */}
      <button
        type="button"
        aria-label="Remove item"
        onClick={() => onRemove(item.id)}
        className="flex-shrink-0 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
