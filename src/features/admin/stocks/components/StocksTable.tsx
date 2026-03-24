"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { StockItem } from "@/types/stock.types";
import { useStockMutation } from "../hooks/useStockMutation";

interface Props {
  readonly stock: StockItem[];
  readonly onSuccess: () => void;
}

const getQuantityColor = (quantity: number): string => {
  if (quantity === 0) return "text-red-500";
  if (quantity <= 5) return "text-yellow-500";
  return "text-emerald-600";
};

const StatusBadge = ({ quantity }: { readonly quantity: number }) => {
  if (quantity === 0)
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
        Out of Stock
      </span>
    );
  if (quantity <= 5)
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-600">
        Low Stock
      </span>
    );
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-600">
      In Stock
    </span>
  );
};

const StockRow = ({
  item,
  onSuccess,
}: {
  readonly item: StockItem;
  readonly onSuccess: () => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(String(item.quantity));
  const { updateStock, isLoading } = useStockMutation(() => {
    setEditing(false);
    onSuccess();
  });

  const handleSave = () => {
    const qty = Number.parseInt(value, 10);
    if (!Number.isNaN(qty) && qty >= 0) updateStock(item.product_id, qty);
  };

  return (
    <tr className="hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {item.products?.image_url ? (
            <img
              src={item.products.image_url}
              alt={item.products.name}
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center text-gray-300 text-xs">
              N/A
            </div>
          )}
          <span className="text-sm font-medium text-gray-900">
            {item.products?.name}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {item.products?.category}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        ₱{item.products?.price?.toLocaleString()}
      </td>
      <td className="px-6 py-4">
        {editing ? (
          <input
            type="number"
            min="0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-20 border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        ) : (
          <span
            className={`text-sm font-semibold ${getQuantityColor(item.quantity)}`}
          >
            {item.quantity}
          </span>
        )}
      </td>
      <td className="px-6 py-4">
        <StatusBadge quantity={item.quantity} />
      </td>
      <td className="px-6 py-4 text-right">
        {editing ? (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setEditing(false)}
              className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white text-sm px-3 py-1.5 rounded-lg transition"
            >
              {isLoading && <Loader2 size={13} className="animate-spin" />}
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-gray-500 hover:text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
          >
            Edit Stock
          </button>
        )}
      </td>
    </tr>
  );
};

export default function StocksTable({ stock, onSuccess }: Props) {
  if (stock.length === 0) {
    return (
      <tr>
        <td
          colSpan={6}
          className="px-6 py-16 text-center text-sm text-gray-400"
        >
          No products found.
        </td>
      </tr>
    );
  }
  return (
    <>
      {stock.map((item) => (
        <StockRow key={item.id} item={item} onSuccess={onSuccess} />
      ))}
    </>
  );
}
