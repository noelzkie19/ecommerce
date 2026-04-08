"use client";

import { useState, useEffect, useMemo } from "react";
import { Loader2, Download, Copy, Check } from "lucide-react";
import { AffiliateTopBar } from "../shared/components/AffiliateTopBar";
import { mediaLibraryPublicApi } from "@/infrastructure/api/media-library-public.api";
import {
  ImageLibrary,
  IMAGE_LIBRARY_CATEGORIES,
} from "@/types/image-library.types";
import FilterSelect from "@/features/admin/components/FilterSelect";

export const AffiliateMediaLibraryPage = () => {
  const [images, setImages] = useState<ImageLibrary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const response = await mediaLibraryPublicApi.getAll({ isActive: true });
        // API returns { success: true, data: [...], meta: {...} }
        // response.data.data contains the actual array
        const result = response.data as unknown as {
          success: boolean;
          data: ImageLibrary[];
        };
        setImages(Array.isArray(result.data) ? result.data : []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to fetch images");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Get unique categories from images
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      images.map((img) => img.category).filter(Boolean),
    );
    return IMAGE_LIBRARY_CATEGORIES.filter((cat) => uniqueCategories.has(cat));
  }, [images]);

  // Filter images by selected category
  const filteredImages = useMemo(() => {
    if (!selectedCategory) return images;
    return images.filter((img) => img.category === selectedCategory);
  }, [images, selectedCategory]);

  // Group images by category
  const groupedImages = useMemo(() => {
    const groups: Record<string, ImageLibrary[]> = {};

    filteredImages.forEach((image) => {
      const category = image.category || "uncategorized";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(image);
    });

    return groups;
  }, [filteredImages]);

  const categoryOptions = [
    { label: "All Categories", value: "" },
    ...categories.map((cat) => ({
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
      value: cat,
    })),
  ];

  const formatCategoryName = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  if (isLoading) {
    return (
      <div>
        <AffiliateTopBar
          title="Media Library"
          subtitle="Browse available images and media"
          showDate={true}
        />
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <AffiliateTopBar
          title="Media Library"
          subtitle="Browse available images and media"
          showDate={true}
        />
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <AffiliateTopBar
        title="Media Library"
        subtitle="Browse available images and media"
        showDate={true}
      />

      {/* Category Filter */}
      <div className="mb-6">
        <FilterSelect
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={categoryOptions}
          placeholder="Filter by category..."
        />
      </div>

      {images.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No images available at the moment.
        </div>
      ) : (
        <>
          {selectedCategory ? (
            /* Single category view (filtered) */
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                {formatCategoryName(selectedCategory)}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredImages.map((image, index) => (
                  <ImageCard key={image.id} image={image} index={index} />
                ))}
              </div>
            </div>
          ) : (
            /* Grouped by category view */
            <div className="space-y-8">
              {Object.entries(groupedImages).map(
                ([category, categoryImages]) => (
                  <div key={category}>
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">
                      {formatCategoryName(category)}
                      <span className="ml-2 text-sm font-normal text-gray-500">
                        ({categoryImages.length}{" "}
                        {categoryImages.length === 1 ? "image" : "images"})
                      </span>
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {categoryImages.map((image, index) => (
                        <ImageCard key={image.id} image={image} index={index} />
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Image Card Component
interface ImageCardProps {
  readonly image: ImageLibrary;
  readonly index: number;
}

function ImageCard({ image, index }: ImageCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyDescription = async () => {
    const textToCopy = image.description || image.title || "";
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  };

  const handleDownload = async () => {
    try {
      // Fetch the image as a blob to ensure direct download
      const response = await fetch(image.imageUrl);
      const blob = await response.blob();
      const blobUrl = globalThis.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = image.title || `image-${image.id}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      globalThis.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      console.error("Download failed:", e);
      // Fallback: open in new tab
      globalThis.open(image.imageUrl, "_blank");
    }
  };

  return (
    <div className="group relative flex flex-col rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
      {/* Image section */}
      <div className="relative aspect-square">
        <img
          src={image.thumbnailUrl || image.imageUrl}
          alt={image.title || "Image"}
          className="w-full h-full object-cover"
        />
        {/* Day badge in top right of image */}
        <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          Day {index + 1}
        </div>
      </div>
      {/* Info section with description and copy button */}
      <div className="flex flex-col p-3 bg-white border-t border-gray-200 gap-2">
        <div className="flex flex-col flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800">
            {image.title || "Untitled"}
          </p>
          {image.description && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-3">
              {image.description}
            </p>
          )}
        </div>
        <button
          onClick={handleCopyDescription}
          className="flex items-center justify-center gap-1.5 w-full py-1.5 px-2 text-xs text-gray-600 hover:text-orange-600 hover:bg-orange-50 border border-gray-200 rounded transition-colors"
          title="Copy description"
          disabled={!image.description && !image.title}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-500" />
              <span className="text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Description</span>
            </>
          )}
        </button>
      </div>
      {/* Download button at bottom */}
      <button
        onClick={handleDownload}
        className="w-full py-2 bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-1"
      >
        <Download className="w-4 h-4" />
        Download
      </button>
    </div>
  );
}
