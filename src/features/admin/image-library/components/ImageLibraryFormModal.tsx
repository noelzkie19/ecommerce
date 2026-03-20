"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Loader2 } from "lucide-react";
import {
  imageLibrarySchema,
  ImageLibraryFormValues,
} from "../schemas/image-library.schema";
import { useImageLibraryMutations } from "../hooks/useImageLibraryMutations";
import {
  ImageLibrary,
  IMAGE_LIBRARY_CATEGORIES,
} from "@/types/image-library.types";

interface Props {
  readonly image?: ImageLibrary | null;
  readonly onClose: () => void;
  readonly onSuccess: () => void;
}

const categoryLabels: Record<string, string> = {
  banners: "Banners",
  gallery: "Gallery",
  testimonials: "Testimonials",
  partners: "Partners",
};

export default function ImageLibraryFormModal({
  image,
  onClose,
  onSuccess,
}: Props) {
  const isEdit = !!image;
  const { createImage, updateImage, isLoading, error } =
    useImageLibraryMutations({ onSuccess });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ImageLibraryFormValues>({
    resolver: zodResolver(imageLibrarySchema),
    defaultValues: image
      ? {
          title: image.title,
          imageUrl: image.imageUrl,
          thumbnailUrl: image.thumbnailUrl ?? "",
          category: image.category,
          description: image.description ?? "",
          displayOrder: image.displayOrder,
          isActive: image.isActive,
        }
      : { category: "gallery", displayOrder: 0, isActive: true },
  });

  const onSubmit = async (values: ImageLibraryFormValues) => {
    try {
      isEdit ? await updateImage(image.id, values) : await createImage(values);
      onClose();
    } catch {
      /* handled */
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0 w-full h-full cursor-default"
        onClick={onClose}
      />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto mx-4 relative">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEdit ? "Edit Image" : "Add Image"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title *
            </label>
            <input
              id="title"
              {...register("title")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
              placeholder="Image title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image URL *
            </label>
            <input
              id="imageUrl"
              {...register("imageUrl")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
              placeholder="https://..."
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-xs mt-1">
                {errors.imageUrl.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="thumbnailUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Thumbnail URL
            </label>
            <input
              id="thumbnailUrl"
              {...register("thumbnailUrl")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
              placeholder="https://..."
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              {...register("category")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
            >
              {IMAGE_LIBRARY_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {categoryLabels[c]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="displayOrder"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Order
              </label>
              <input
                id="displayOrder"
                {...register("displayOrder", { valueAsNumber: true })}
                type="number"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-col gap-2 pt-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("isActive")}
                  className="w-4 h-4"
                />
                <span className="text-sm">Active</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg flex items-center gap-2"
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
