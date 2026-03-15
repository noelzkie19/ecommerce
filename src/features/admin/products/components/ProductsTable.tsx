"use client";

import { Pencil, Trash2, Images } from "lucide-react";
import { Product } from "@/types/product.types";

interface Props {
  readonly products: Product[];
  readonly onEdit: (product: Product) => void;
  readonly onDelete: (product: Product) => void;
}

export default function ProductsTable({ products, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Product
            </th>
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Category
            </th>
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Price
            </th>
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Badge
            </th>
            <th className="text-right px-6 py-4 text-gray-500 font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {products.map((product) => {
            // Prefer the first gallery image, fall back to legacy image_url
            const galleryImages = product.images ?? [];
            const primaryUrl =
              galleryImages.length > 0
                ? galleryImages[0].url
                : product.image_url;
            const extraCount = galleryImages.length - 1;

            return (
              <tr
                key={product.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* Thumbnail with extra-count badge */}
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden">
                        {primaryUrl ? (
                          <img
                            src={primaryUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                            N/A
                          </div>
                        )}
                      </div>
                      {extraCount > 0 && (
                        <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                          +{extraCount > 9 ? "9" : extraCount}
                        </span>
                      )}
                    </div>

                    <div>
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      {product.description && (
                        <p className="text-xs text-gray-400 truncate max-w-xs">
                          {product.description}
                        </p>
                      )}
                      {galleryImages.length > 0 && (
                        <p className="text-[10px] text-emerald-600 flex items-center gap-0.5 mt-0.5">
                          <Images size={10} />
                          {galleryImages.length}{" "}
                          {galleryImages.length === 1 ? "image" : "images"}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{product.category}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      ₱{product.price.toLocaleString()}
                    </span>
                    {product.original_price && (
                      <span className="text-xs text-gray-400 line-through">
                        ₱{product.original_price.toLocaleString()}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {product.badge ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {product.badge}
                    </span>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => onDelete(product)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {products.length === 0 && (
        <div className="py-16 text-center text-gray-400 text-sm">
          No products found.
        </div>
      )}
    </div>
  );
}
