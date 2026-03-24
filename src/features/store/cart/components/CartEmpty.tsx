"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center">
        <ShoppingCart size={32} className="text-purple-300" />
      </div>
      <p className="text-gray-500 text-sm font-medium">Your cart is empty</p>
      <Link
        href="/shop"
        className="bg-orange-500 text-white text-sm font-semibold px-6 py-3 rounded-2xl hover:bg-orange-600 transition-colors shadow-md shadow-orange-200"
      >
        Browse Products
      </Link>
    </div>
  );
}
