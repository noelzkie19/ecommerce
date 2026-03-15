"use client";

import { useState, useCallback } from "react";
import { Plus, Search, Loader2 } from "lucide-react";
import { useAdminProducts } from "./hooks/useAdminProducts";
import { Product } from "@/types/product.types";
import ProductsTable from "./components/ProductsTable";
import ProductFormModal from "./components/ProductFormModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import Pagination from "./components/ProductsPagination";
import { useProductMutations } from "./hooks/useProductMutation";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const { products, meta, isLoading, error, refetch } = useAdminProducts({
    page,
    limit: 10,
    search: search || undefined,
    category: category || undefined,
  });

  const { deleteProduct: doDelete, isLoading: isDeleting } =
    useProductMutations(() => {
      setDeleteProduct(null);
      refetch();
    });

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const handleCategory = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(e.target.value);
      setPage(1);
    },
    [],
  );

  const content = (() => {
    if (isLoading)
      return (
        <div className="flex items-center justify-center py-24">
          <Loader2 size={24} className="animate-spin text-emerald-500" />
        </div>
      );
    if (error)
      return (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-5 py-4">
          {error}
        </div>
      );
    return (
      <>
        <ProductsTable
          products={products}
          onEdit={setEditProduct}
          onDelete={setDeleteProduct}
        />
        {meta && meta.totalPages > 1 && (
          <Pagination meta={meta} onPageChange={setPage} />
        )}
      </>
    );
  })();

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage your product catalog
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm shadow-emerald-200"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          />
        </div>
        <select
          value={category}
          onChange={handleCategory}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-700"
        >
          <option value="">All Categories</option>
          {["Superfoods", "Supplements", "Beverages", "Snacks", "Others"].map(
            (c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ),
          )}
        </select>
      </div>

      {content}

      {showAddModal && (
        <ProductFormModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            refetch();
          }}
        />
      )}
      {editProduct && (
        <ProductFormModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSuccess={() => {
            setEditProduct(null);
            refetch();
          }}
        />
      )}
      {deleteProduct && (
        <DeleteConfirmModal
          productName={deleteProduct.name}
          isLoading={isDeleting}
          onConfirm={() => doDelete(deleteProduct.id)}
          onCancel={() => setDeleteProduct(null)}
        />
      )}
    </div>
  );
}
