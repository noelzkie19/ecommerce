"use client";

import { useState, useEffect, useMemo } from "react";
import { Loader2, Download } from "lucide-react";
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
        const result = response as unknown as {
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

  const handleDownload = async (image: ImageLibrary) => {
    try {
      const response = await fetch(`/api/image-library/${image.id}/download`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = globalThis.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${image.title || "image"}.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      globalThis.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Download error:", e);
      // Fallback: open image URL in new tab
      window.open(image.imageUrl, "_blank");
    }
  };

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
        />
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
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
                {filteredImages.map((image) => (
                  <ImageCard
                    key={image.id}
                    image={image}
                    onDownload={handleDownload}
                  />
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
                      {categoryImages.map((image) => (
                        <ImageCard
                          key={image.id}
                          image={image}
                          onDownload={handleDownload}
                        />
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
  readonly onDownload: (image: ImageLibrary) => void;
}

function ImageCard({ image, onDownload }: ImageCardProps) {
  return (
    <div className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
      <img
        src={image.thumbnailUrl || image.imageUrl}
        alt={image.title || "Image"}
        className="w-full h-full object-cover"
      />
      {/* Hover overlay with actions */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
        <a
          href={image.imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-sm font-medium hover:text-purple-300 transition-colors"
        >
          View Full
        </a>
        <button
          onClick={() => onDownload(image)}
          className="text-white text-sm font-medium hover:text-purple-300 transition-colors flex items-center gap-1"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
      {/* Title overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2">
        <p className="text-xs truncate font-medium">
          {image.title || "Untitled"}
        </p>
      </div>
    </div>
  );
}
