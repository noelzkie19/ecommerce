"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { ProductImage } from "@/types/product.types";

interface Props {
  readonly images: ProductImage[];
  readonly productName: string;
  readonly badge?: string | null;
  readonly youtubeUrl?: string | null;
}

// Extract YouTube video ID from various URL formats
function extractVideoId(url: string): string | null {
  if (!url) return null;

  // Handle youtu.be format
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // Handle youtube.com/watch format
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // Handle youtube.com/embed format
  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  // Handle youtube.com/v format
  const vMatch = url.match(/youtube\.com\/v\/([a-zA-Z0-9_-]{11})/);
  if (vMatch) return vMatch[1];

  // Handle youtube.com/shorts format
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];

  return null;
}

// Get YouTube thumbnail URL
function getYoutubeThumbnail(url: string): string {
  const videoId = extractVideoId(url);
  if (!videoId) return "";
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

// Get YouTube embed URL with parameters
function getYoutubeEmbedUrl(url: string, autoplay = false): string {
  const videoId = extractVideoId(url);
  if (!videoId) return "";
  const autoplayParam = autoplay ? "&autoplay=1" : "";
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1${autoplayParam}`;
}

interface GalleryItem {
  id: string;
  url: string;
  thumbnailUrl?: string;
  isPending: boolean;
  type: "image" | "video";
}

export default function ProductGallery({
  images,
  productName,
  badge,
  youtubeUrl,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Build gallery items: video first (if exists), then images
  const galleryItems: GalleryItem[] = [];

  // Add video as first item if it exists
  if (youtubeUrl) {
    galleryItems.push({
      id: "youtube-video",
      url: youtubeUrl,
      thumbnailUrl: getYoutubeThumbnail(youtubeUrl),
      isPending: false,
      type: "video",
    });
  }

  // Add images
  images.forEach((img) => {
    galleryItems.push({
      id: img.id,
      url: img.url,
      isPending: false,
      type: "image",
    });
  });

  const activeItem = galleryItems[activeIndex];
  const hasMultiple = galleryItems.length > 1;
  const hasRealImages = images.some((img) => img.id !== "fallback");
  const isVideo = activeItem?.type === "video";

  const prev = () =>
    setActiveIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length);
  const next = () => setActiveIndex((i) => (i + 1) % galleryItems.length);

  return (
    <div>
      {/* Main display */}
      <div className="relative aspect-square bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
        {isVideo && youtubeUrl ? (
          // YouTube Video Embed
          <iframe
            src={getYoutubeEmbedUrl(youtubeUrl, true)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        ) : activeItem?.url ? (
          // Image Display
          <img
            src={activeItem.url}
            alt={productName}
            className="w-full h-full object-cover transition-opacity duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
            No image
          </div>
        )}

        {/* Prev / Next arrows */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous item"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-xl shadow-md flex items-center justify-center text-gray-600 hover:text-orange-600 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next item"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-xl shadow-md flex items-center justify-center text-gray-600 hover:text-orange-600 transition-all"
            >
              <ChevronRight size={18} />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {galleryItems.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={
                    item.type === "video"
                      ? "Go to video"
                      : `Go to image ${i + 1}`
                  }
                  className={`rounded-full transition-all ${
                    activeIndex === i
                      ? "w-5 h-1.5 bg-orange-500"
                      : "w-1.5 h-1.5 bg-white/60 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badge overlay */}
        {badge && (
          <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm shadow-orange-200">
            {badge}
          </span>
        )}
      </div>

      {/* Thumbnail strip — show for all real images and video */}
      {hasRealImages || youtubeUrl ? (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {galleryItems.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                activeIndex === i
                  ? "border-orange-500 shadow-md shadow-orange-100"
                  : "border-transparent hover:border-gray-200"
              }`}
            >
              {item.type === "video" ? (
                // Video thumbnail with play icon overlay
                <div className="relative w-full h-full bg-gray-900">
                  {item.thumbnailUrl && (
                    <img
                      src={item.thumbnailUrl}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover opacity-80"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                      <Play
                        size={14}
                        className="text-gray-900 ml-0.5"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={item.url}
                  alt={`${productName} view ${i}`}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
