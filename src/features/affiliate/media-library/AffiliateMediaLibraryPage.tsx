"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AffiliateTopBar } from "../shared/components/AffiliateTopBar";
import { mediaLibraryPublicApi } from "@/infrastructure/api/media-library-public.api";
import { ImageLibrary } from "@/types/image-library.types";

export const AffiliateMediaLibraryPage = () => {
  const [images, setImages] = useState<ImageLibrary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No images available at the moment.
          </div>
        ) : (
          images.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
            >
              <img
                src={image.thumbnailUrl || image.imageUrl}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a
                  href={image.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm font-medium"
                >
                  View Full
                </a>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2">
                <p className="text-xs truncate">{image.title}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
