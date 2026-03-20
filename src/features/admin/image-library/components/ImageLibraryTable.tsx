"use client";
import { Edit, Trash2 } from "lucide-react";
import type { ImageLibrary } from "@/types/image-library.types";

interface ImageLibraryTableProps {
  readonly images: ImageLibrary[];
  readonly isLoading?: boolean;
  readonly onEdit: (image: ImageLibrary) => void;
  readonly onDelete: (image: ImageLibrary) => void;
}

const categoryLabels: Record<ImageLibrary["category"], string> = {
  banners: "Banners",
  gallery: "Gallery",
  testimonials: "Testimonials",
  partners: "Partners",
};

export function ImageLibraryTable({
  images,
  isLoading,
  onEdit,
  onDelete,
}: ImageLibraryTableProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12 text-gray-500">Loading images...</div>
    );
  }
  if (images.length === 0)
    return (
      <div className="text-center py-12 text-gray-500">
        No images found. Click "Add New" to create one.
      </div>
    );
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
              Image
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
              Title
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
              Category
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
              Status
            </th>
            <th className="text-right py-3 px-4 font-medium text-gray-600 text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {images.map((img) => (
            <tr
              key={img.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4">
                {img.thumbnailUrl ? (
                  <img
                    src={img.thumbnailUrl}
                    alt={img.title}
                    className="w-16 h-12 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-16 h-12 bg-gray-200 rounded-lg" />
                )}
              </td>
              <td className="py-3 px-4 font-medium text-gray-900">
                {img.title}
              </td>
              <td className="py-3 px-4">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  {categoryLabels[img.category]}
                </span>
              </td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${img.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}
                >
                  {img.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(img)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(img)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
