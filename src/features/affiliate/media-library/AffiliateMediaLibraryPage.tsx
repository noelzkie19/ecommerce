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

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  };

  const handleDownload = () => {
    // Open the Supabase URL directly in new tab to download
    window.open(image.imageUrl, "_blank");
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
      {/* Info section with copy button */}
      <div className="flex items-center justify-between p-2 bg-white border-t border-gray-200">
        <div className="flex flex-col flex-1 min-w-0">
          <p className="text-xs truncate font-medium text-gray-700">
            {image.title || "Untitled"}
          </p>
        </div>
        <button
          onClick={() => handleCopyUrl(image.imageUrl)}
          className="p-1 text-gray-500 hover:text-orange-600 transition-colors"
          title="Copy URL"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
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
