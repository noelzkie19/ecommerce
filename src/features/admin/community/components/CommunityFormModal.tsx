"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Loader2 } from "lucide-react";
import {
  communityLinkSchema,
  CommunityLinkFormValues,
} from "../schemas/community.schema";
import { useCommunityMutations } from "../hooks/useCommunityMutations";
import {
  CommunityLink,
  COMMUNITY_LINK_CATEGORIES,
} from "@/types/community.types";

interface Props {
  readonly link?: CommunityLink | null;
  readonly onClose: () => void;
  readonly onSuccess: () => void;
}

const categoryLabels: Record<string, string> = {
  youtube: "YouTube",
  facebook: "Facebook",
  telegram: "Telegram",
  website: "Website",
  discord: "Discord",
  instagram: "Instagram",
  tiktok: "TikTok",
  twitter: "Twitter",
  linkedin: "LinkedIn",
  other: "Other",
};

export default function CommunityFormModal({
  link,
  onClose,
  onSuccess,
}: Props) {
  const isEdit = !!link;
  const { createLink, updateLink, isLoading, error } = useCommunityMutations({
    onSuccess,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommunityLinkFormValues>({
    resolver: zodResolver(communityLinkSchema),
    defaultValues: link
      ? {
          title: link.title,
          url: link.url,
          description: link.description ?? "",
          category: link.category,
          icon: link.icon ?? "",
          imageUrl: link.imageUrl ?? "",
          orderIndex: link.orderIndex,
          isActive: link.isActive,
        }
      : {
          category: "other",
          orderIndex: 0,
          isActive: true,
        },
  });

  const onSubmit = async (values: CommunityLinkFormValues) => {
    try {
      if (isEdit) {
        await updateLink(link.id, values);
      } else {
        await createLink(values);
      }
      onClose();
    } catch {
      // Error is handled by the hook
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0 w-full h-full cursor-default"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto mx-4 relative">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEdit ? "Edit Community Link" : "Add Community Link"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
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

          {/* Title */}
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
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Join our Discord"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* URL */}
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              URL *
            </label>
            <input
              id="url"
              {...register("url")}
              type="url"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="https://discord.gg/your-server"
            />
            {errors.url && (
              <p className="text-red-500 text-xs mt-1">{errors.url.message}</p>
            )}
          </div>

          {/* Category */}
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
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
            >
              {COMMUNITY_LINK_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {categoryLabels[cat]}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Description */}
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
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              placeholder="Optional description"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image URL
            </label>
            <input
              id="imageUrl"
              {...register("imageUrl")}
              type="url"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-xs mt-1">
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          {/* Order and Active */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="orderIndex"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Order
              </label>
              <input
                id="orderIndex"
                {...register("orderIndex", { valueAsNumber: true })}
                type="number"
                min="0"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="0"
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("isActive")}
                  className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Active</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
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
