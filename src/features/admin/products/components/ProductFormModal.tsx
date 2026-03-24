"use client";

import { useRef, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Loader2, GripVertical, Trash2, ImagePlus } from "lucide-react";
import { productSchema, ProductFormValues } from "../schemas/product.schema";
import { Product, ProductImage } from "@/types/product.types";
import { useProductMutations } from "../hooks/useProductMutation";
import { productsService } from "../../../shared/services/products.service";

interface Props {
  readonly product?: Product | null;
  readonly onClose: () => void;
  readonly onSuccess: () => void;
}

const CATEGORIES = [
  "Superfoods",
  "Supplements",
  "Beverages",
  "Snacks",
  "Others",
];

interface ThumbnailProps {
  readonly image: GalleryItem;
  readonly index: number;
  readonly onRemove: (id: string) => void;
  readonly onDragStart: (index: number) => void;
  readonly onDragEnter: (index: number) => void;
  readonly onDragEnd: () => void;
  readonly isDragging: boolean;
  readonly isOver: boolean;
}

function Thumbnail({
  image,
  index,
  onRemove,
  onDragStart,
  onDragEnter,
  onDragEnd,
  isDragging,
  isOver,
}: ThumbnailProps) {
  return (
    <li
      draggable
      onDragStart={() => onDragStart(index)}
      onDragEnter={() => onDragEnter(index)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      className={`relative group flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-grab active:cursor-grabbing select-none list-none
        ${isOver ? "border-emerald-400 scale-105 shadow-lg" : "border-gray-200"}
        ${isDragging ? "opacity-40" : "opacity-100"}
      `}
    >
      <img
        src={image.url}
        alt={`${index + 1}`}
        className="w-full h-full object-cover pointer-events-none"
      />
      {index === 0 && (
        <span className="absolute top-1 left-1 bg-emerald-500 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full leading-none">
          Main
        </span>
      )}
      <div className="absolute bottom-1 left-1 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical size={12} />
      </div>
      <button
        type="button"
        onClick={() => onRemove(image.id)}
        className="absolute top-1 right-1 w-5 h-5 bg-black/60 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
      >
        <Trash2 size={10} />
      </button>
    </li>
  );
}

interface GalleryItem {
  id: string;
  url: string;
  isPending: boolean;
}

export default function ProductFormModal({
  product,
  onClose,
  onSuccess,
}: Props) {
  const isEdit = !!product;
  const fileRef = useRef<HTMLInputElement>(null);

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const imgs: ProductImage[] = product?.images ?? [];
    return imgs
      .slice()
      .sort((a, b) => a.position - b.position)
      .map((img) => ({ id: img.id, url: img.url, isPending: false }));
  });

  const [uploadingImages, setUploadingImages] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const { uploadImages, isLoading, error } = useProductMutations(onSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          description: product.description ?? "",
          price: product.price,
          original_price: product.original_price ?? undefined,
          category: product.category,
          image_url: product.image_url ?? "",
          badge: product.badge ?? "",
          rating: product.rating ?? undefined,
          review_count: product.review_count ?? undefined,
          affiliate_link: product.affiliate_link ?? "",
        }
      : {},
  });

  const handleFilesSelected = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      if (files.length === 0) return;
      const slots = 10 - gallery.length;
      const toUpload = files.slice(0, slots);
      setUploadingImages(true);
      const urls = await uploadImages(toUpload);
      setUploadingImages(false);
      if (urls.length === 0) return;
      setGallery((prev) => [
        ...prev,
        ...urls.map((url, i) => ({
          id: `pending-${Date.now()}-${i}`,
          url,
          isPending: true,
        })),
      ]);
      e.target.value = "";
    },
    [gallery.length, uploadImages],
  );

  const removeFromGallery = useCallback((id: string) => {
    setGallery((prev) => prev.filter((img) => img.id !== id));
  }, []);

  const handleDragStart = useCallback((index: number) => {
    setDragIndex(index);
  }, []);

  const handleDragEnter = useCallback((index: number) => {
    setOverIndex(index);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (dragIndex === null || overIndex === null || dragIndex === overIndex) {
      setDragIndex(null);
      setOverIndex(null);
      return;
    }
    setGallery((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(overIndex, 0, moved);
      return next;
    });
    setDragIndex(null);
    setOverIndex(null);
  }, [dragIndex, overIndex]);

  // ---------------------------------------------------------------------------
  // Form submit — atomic: both product + images saved before onSuccess fires
  // ---------------------------------------------------------------------------
  const onSubmit = async (values: ProductFormValues) => {
    const primaryImageUrl =
      gallery.length > 0 ? gallery[0].url : (values.image_url ?? null);
    const payload = {
      ...values,
      image_url: primaryImageUrl,
      affiliate_link: values.affiliate_link?.trim() || null,
    };
    const galleryUrls = gallery.map((img) => img.url);

    setSubmitError(null);
    try {
      if (isEdit) {
        await productsService.update(product.id, payload);
        await productsService.replaceProductImages(product.id, galleryUrls);
      } else {
        const created = await productsService.create(payload);
        if (galleryUrls.length > 0 && created?.id) {
          await productsService.replaceProductImages(created.id, galleryUrls);
        }
      }
      onSuccess();
      onClose();
    } catch {
      setSubmitError("Operation failed. Please try again.");
    }
  };

  const displayError = submitError ?? error;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0 w-full h-full cursor-default"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 relative">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEdit ? "Edit Product" : "Add Product"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {displayError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {displayError}
            </div>
          )}

          {/* ── Images ────────────────────────────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <label
                  htmlFor="product-images-input"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Images
                </label>
                <span className="text-xs font-normal text-gray-400">
                  (up to 10 · drag to reorder · first = main)
                </span>
              </div>
              <span className="text-xs text-gray-400">{gallery.length}/10</span>
            </div>

            {gallery.length > 0 && (
              <ol className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-thin scrollbar-thumb-gray-200 list-none p-0 m-0">
                {gallery.map((img, i) => (
                  <Thumbnail
                    key={img.id}
                    image={img}
                    index={i}
                    onRemove={removeFromGallery}
                    onDragStart={handleDragStart}
                    onDragEnter={handleDragEnter}
                    onDragEnd={handleDragEnd}
                    isDragging={dragIndex === i}
                    isOver={overIndex === i && dragIndex !== i}
                  />
                ))}
              </ol>
            )}

            {gallery.length < 10 && (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploadingImages}
                className="w-full border-2 border-dashed border-gray-200 rounded-xl py-4 flex flex-col items-center gap-2 hover:border-emerald-400 hover:bg-emerald-50/30 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {uploadingImages ? (
                  <>
                    <Loader2
                      size={20}
                      className="animate-spin text-orange-500"
                    />
                    <span className="text-sm text-gray-500">Uploading…</span>
                  </>
                ) : (
                  <>
                    <ImagePlus size={20} className="text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {gallery.length === 0
                        ? "Click to add images"
                        : "Add more images"}
                    </span>
                    <span className="text-xs text-gray-400">
                      JPEG, PNG, WEBP, GIF · max 10 files
                    </span>
                  </>
                )}
              </button>
            )}

            <input
              id="product-images-input"
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFilesSelected}
            />
          </div>

          {/* ── Name ──────────────────────────────────────────────────────── */}
          <div>
            <label
              htmlFor="product-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name *
            </label>
            <input
              id="product-name"
              {...register("name")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Product name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* ── Description ───────────────────────────────────────────────── */}
          <div>
            <label
              htmlFor="product-description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="product-description"
              {...register("description")}
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              placeholder="Product description"
            />
          </div>

          {/* ── Price / Original Price ─────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="product-price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price *
              </label>
              <input
                id="product-price"
                {...register("price")}
                type="number"
                step="0.01"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="product-original-price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Original Price
              </label>
              <input
                id="product-original-price"
                {...register("original_price")}
                type="number"
                step="0.01"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* ── Category / Badge ──────────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="product-category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category *
              </label>
              <select
                id="product-category"
                {...register("category")}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="product-badge"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Badge
              </label>
              <input
                id="product-badge"
                {...register("badge")}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g. Best Seller"
              />
            </div>
          </div>

          {/* ── Rating / Review Count ─────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="product-rating"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Rating (0–5)
              </label>
              <input
                id="product-rating"
                {...register("rating")}
                type="number"
                step="0.1"
                min="0"
                max="5"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="4.5"
              />
            </div>
            <div>
              <label
                htmlFor="product-review-count"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Review Count
              </label>
              <input
                id="product-review-count"
                {...register("review_count")}
                type="number"
                min="0"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="0"
              />
            </div>
          </div>

          {/* ── Affiliate Link ────────────────────────────────────────────── */}
          <div>
            <label
              htmlFor="product-affiliate-link"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Affiliate Link
            </label>
            <input
              id="product-affiliate-link"
              {...register("affiliate_link")}
              type="url"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="https://example.com/ref=..."
            />
            {errors.affiliate_link && (
              <p className="text-red-500 text-xs mt-1">
                {errors.affiliate_link.message}
              </p>
            )}
          </div>

          {/* ── Actions ───────────────────────────────────────────────────── */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-700 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || uploadingImages}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white rounded-lg py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              {(isLoading || uploadingImages) && (
                <Loader2 size={15} className="animate-spin" />
              )}
              {isEdit ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
