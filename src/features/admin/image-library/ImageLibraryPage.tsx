"use client";
import { useState, useCallback } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { useImageLibrary } from "./hooks/useImageLibrary";
import { useImageLibraryMutations } from "./hooks/useImageLibraryMutations";
import { ImageLibraryTable } from "./components/ImageLibraryTable";
import { ImageLibraryPagination } from "./components/ImageLibraryPagination";
import ImageLibraryFormModal from "./components/ImageLibraryFormModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import {
  ImageLibrary,
  IMAGE_LIBRARY_CATEGORIES,
} from "@/types/image-library.types";

export default function ImageLibraryPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [editImage, setEditImage] = useState<ImageLibrary | null>(null);
  const [deleteImage, setDeleteImage] = useState<ImageLibrary | null>(null);

  const { images, meta, isLoading, error, refetch } = useImageLibrary({
    page,
    search,
    category,
  });
  const { deleteImage: deleteApi, isDeleting } = useImageLibraryMutations({
    onSuccess: () => {
      setDeleteImage(null);
      refetch();
    },
  });

  const handleSearch = useCallback((e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
  }, []);
  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(e.target.value);
      setPage(1);
    },
    [],
  );
  const handleEdit = useCallback((image: ImageLibrary) => {
    setEditImage(image);
    setShowForm(true);
  }, []);
  const handleDelete = useCallback((image: ImageLibrary) => {
    setDeleteImage(image);
  }, []);
  const handleFormClose = useCallback(() => {
    setShowForm(false);
    setEditImage(null);
  }, []);

  const categoryOptions = [
    { value: "", label: "All Categories" },
    ...IMAGE_LIBRARY_CATEGORIES.map((c) => ({
      value: c,
      label: c.charAt(0).toUpperCase() + c.slice(1),
    })),
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Media Library
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage images for banners, gallery, and more
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          <Plus size={18} />
          Add Image
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search images..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
          />
        </form>
        <div className="relative">
          <Filter
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <select
            value={category}
            onChange={handleCategoryChange}
            className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg bg-white appearance-none"
          >
            {categoryOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-5 py-4">
          {error}
        </div>
      )}

      <ImageLibraryTable
        images={images}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {meta && <ImageLibraryPagination meta={meta} onPageChange={setPage} />}

      {showForm && (
        <ImageLibraryFormModal
          image={editImage}
          onClose={handleFormClose}
          onSuccess={() => {
            handleFormClose();
            refetch();
          }}
        />
      )}

      {deleteImage && (
        <DeleteConfirmModal
          title="Delete Image"
          message={`Are you sure you want to delete "${deleteImage.title}"? This action cannot be undone.`}
          onConfirm={() => deleteApi(deleteImage.id)}
          onCancel={() => setDeleteImage(null)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
