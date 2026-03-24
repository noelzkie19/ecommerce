"use client";

import { useState } from "react";
import { Pencil, Trash2, Images, Loader2 } from "lucide-react";
import { Product } from "@/types/product.types";
import { useStockMutation } from "../../stocks/hooks/useStockMutation";

interface Props {
  readonly products: Product[];
  readonly onEdit: (product: Product) => void;
  readonly onDelete: (product: Product) => void;
  readonly onStockUpdate: () => void;
}

const getQuantityColor = (quantity: number): string => {
  if (quantity === 0) return "text-red-500";
  if (quantity <= 5) return "text-yellow-500";
  return "text-emerald-600";
};

const StatusBadge = ({ quantity }: { readonly quantity: number }) => {
  if (quantity === 0)
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-100 text-red-600">
        Out
      </span>
    );
  if (quantity <= 5)
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-yellow-100 text-yellow-600">
        Low
      </span>
    );
  return (
    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-600">
      OK
    </span>
  );
};

const StockCell = ({
  product,
  onSuccess,
}: {
  readonly product: Product;
  readonly onSuccess: () => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(String(product.stock ?? 0));
  const { updateStock, isLoading } = useStockMutation(() => {
    setEditing(false);
    onSuccess();
  });

  const handleSave = () => {
    const qty = Number.parseInt(value, 10);
    if (!Number.isNaN(qty) && qty >= 0) updateStock(product.id, qty);
  };

  const handleCancel = () => {
    setValue(String(product.stock ?? 0));
    setEditing(false);
  };

  const stock = product.stock ?? 0;

  // Quick adjust buttons
  const handleAdjust = (amount: number) => {
    const newValue = Math.max(0, stock + amount);
    updateStock(product.id, newValue);
  };

  if (editing) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setValue(String(Math.max(0, Number(value) - 1)))}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            −
          </button>
          <input
            type="number"
            min="0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-16 text-center border border-gray-200 rounded-lg py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button
            onClick={() => setValue(String(Number(value) + 1))}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            +
          </button>
        </div>
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={handleCancel}
            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-1 text-xs bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white px-3 py-1 rounded-lg transition"
          >
            {isLoading && <Loader2 size={12} className="animate-spin" />}
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <button
          onClick={() => handleAdjust(-1)}
          disabled={stock === 0}
          className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Decrease stock"
        >
          −
        </button>
        <span
          className={`min-w-[32px] text-center text-sm font-semibold ${getQuantityColor(stock)}`}
        >
          {stock}
        </span>
        <button
          onClick={() => handleAdjust(1)}
          className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-600 transition-colors"
          title="Increase stock"
        >
          +
        </button>
      </div>
      <StatusBadge quantity={stock} />
      <button
        onClick={() => setEditing(true)}
        className="text-xs text-gray-400 hover:text-emerald-600 transition-colors ml-1"
        title="Edit stock"
      >
        <Pencil size={12} />
      </button>
    </div>
  );
};

export default function ProductsTable({
  products,
  onEdit,
  onDelete,
  onStockUpdate,
}: Props) {
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
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Stock
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
                  <StockCell product={product} onSuccess={onStockUpdate} />
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
