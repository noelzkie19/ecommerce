"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2, Package, Loader2 } from "lucide-react";
import {
  Affiliate,
  AffiliateProduct,
  AssignProductDTO,
  CommissionType,
} from "@/types/affiliate.types";
import { affiliatesService } from "../services/affiliate.service";
import { useAffiliateMutations } from "../hooks/useAffiliateMutations";
import type { Product } from "@/types/product.types";
import { productsService } from "../../products";

interface Props {
  readonly affiliate: Affiliate;
  readonly onClose: () => void;
  readonly onSuccess?: () => void;
}

// S3358 — extracted nested ternary into its own component
const AssignedProductsContent = ({
  isLoading,
  products,
  onRemove,
  mutating,
}: {
  readonly isLoading: boolean;
  readonly products: AffiliateProduct[];
  readonly onRemove: (productId: string) => void;
  readonly mutating: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8 text-gray-300">
        <Loader2 size={20} className="animate-spin" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-300 gap-2">
        <Package size={28} strokeWidth={1.5} />
        <span className="text-xs">No products assigned yet</span>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {products.map((ap) => (
        <li
          key={ap.id}
          className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 group"
        >
          <div className="flex items-center gap-3 min-w-0">
            {ap.product?.image_url ? (
              <img
                src={ap.product.image_url}
                alt={ap.product.name}
                className="w-8 h-8 rounded-lg object-cover flex-shrink-0 border border-gray-100"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <Package size={14} className="text-indigo-300" />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {ap.product?.name ?? ap.productId}
              </p>
              <p className="text-xs text-gray-400">
                {ap.commissionType === "percentage"
                  ? `${ap.commissionValue}% commission`
                  : `₱${ap.commissionValue} fixed`}
              </p>
            </div>
          </div>
          <button
            onClick={() => onRemove(ap.productId)}
            disabled={mutating}
            className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
            title="Remove product"
          >
            <Trash2 size={13} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default function ManageProductsModal({
  affiliate,
  onClose,
  onSuccess,
}: Props) {
  const [assignedProducts, setAssignedProducts] = useState<AffiliateProduct[]>(
    [],
  );
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [commissionType, setCommissionType] =
    useState<CommissionType>("percentage");
  const [commissionValue, setCommissionValue] = useState("");

  const { assignProduct, removeProduct, isLoading, error, clearError } =
    useAffiliateMutations(async () => {
      await loadAssigned();
      onSuccess?.();
    });

  const loadAssigned = async () => {
    setLoadingProducts(true);
    try {
      const data = await affiliatesService.getProducts(affiliate.id);
      setAssignedProducts(Array.isArray(data) ? data : []);
    } catch {
      // ignore
    } finally {
      setLoadingProducts(false);
    }
  };

  // Fetch all products once on mount for the assign dropdown
  useEffect(() => {
    productsService
      .getAllAdmin({ limit: 200 })
      .then((res) => setAllProducts(Array.isArray(res.data) ? res.data : []))
      .catch(() => setAllProducts([]));
  }, []);

  useEffect(() => {
    loadAssigned();
  }, [affiliate.id]);

  const handleAssign = async () => {
    if (!selectedProductId || !commissionValue) return;
    const dto: AssignProductDTO = {
      productId: selectedProductId,
      commissionType,
      commissionValue: Number.parseFloat(commissionValue),
    };
    const ok = await assignProduct(affiliate.id, dto);
    if (ok) {
      setShowAssignForm(false);
      setSelectedProductId("");
      setCommissionValue("");
      setCommissionType("percentage");
    }
  };

  const handleRemove = (productId: string) =>
    removeProduct(affiliate.id, productId);

  const assignedIds = new Set(assignedProducts.map((ap) => ap.productId));
  const availableProducts = allProducts.filter((p) => !assignedIds.has(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* S1082 / S6848 — native <button> satisfies keyboard + interactivity requirements */}
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-default"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      />

      {/* Modal — S6819: native <dialog> for built-in accessibility */}
      <dialog
        open
        aria-labelledby="manage-products-title"
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] flex flex-col overflow-hidden p-0 border-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2
              id="manage-products-title"
              className="text-base font-semibold text-gray-900"
            >
              Manage Products
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">{affiliate.name}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* Error banner */}
          {error && (
            <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={clearError}
                aria-label="Dismiss error"
                className="ml-2 text-red-400 hover:text-red-600"
              >
                <X size={12} />
              </button>
            </div>
          )}

          {/* Assigned products */}
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Assigned Products
            </p>
            <AssignedProductsContent
              isLoading={loadingProducts}
              products={assignedProducts}
              onRemove={handleRemove}
              mutating={isLoading}
            />
          </div>

          {/* Assign form / trigger */}
          {showAssignForm ? (
            <div className="border border-indigo-100 rounded-xl p-4 space-y-3 bg-indigo-50/30">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Assign Product
              </p>

              {/* S6853 — all labels linked via htmlFor/id pairs */}
              <div>
                <label
                  htmlFor="assign-product"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Product
                </label>
                <select
                  id="assign-product"
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent appearance-none"
                >
                  <option value="">Select product</option>
                  {availableProducts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="commission-type"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Commission Type
                </label>
                <select
                  id="commission-type"
                  value={commissionType}
                  onChange={(e) =>
                    setCommissionType(e.target.value as CommissionType)
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent appearance-none"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed (₱)</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="commission-value"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Commission Value
                </label>
                <input
                  id="commission-value"
                  type="number"
                  min={0}
                  max={commissionType === "percentage" ? 100 : undefined}
                  placeholder={
                    commissionType === "percentage" ? "e.g. 20" : "e.g. 150"
                  }
                  value={commissionValue}
                  onChange={(e) => setCommissionValue(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => {
                    setShowAssignForm(false);
                    clearError();
                  }}
                  className="flex-1 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg py-2 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssign}
                  disabled={isLoading || !selectedProductId || !commissionValue}
                  className="flex-1 bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white text-sm font-medium rounded-lg py-2 transition-colors flex items-center justify-center gap-1.5"
                >
                  {isLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    "Assign"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAssignForm(true)}
              className="w-full flex items-center justify-center gap-2 border border-dashed border-gray-200 rounded-xl py-3 text-sm text-gray-400 hover:text-indigo-500 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors"
            >
              <Plus size={14} />
              Assign Product
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full border border-gray-200 text-gray-600 text-sm font-medium rounded-lg py-2.5 hover:bg-gray-50 transition-colors"
          >
            Done
          </button>
        </div>
      </dialog>
    </div>
  );
}
