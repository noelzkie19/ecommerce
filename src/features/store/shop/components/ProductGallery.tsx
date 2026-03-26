"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductImage } from "@/types/product.types";

interface Props {
  readonly images: ProductImage[];
  readonly productName: string;
  readonly badge?: string | null;
}

export default function ProductGallery({ images, productName, badge }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeUrl = images[activeIndex]?.url ?? null;
  const hasMultiple = images.length > 1;
  // Show thumbnails whenever there are real images (id !== "fallback")
  const hasRealImages = images.some((img) => img.id !== "fallback");

  const prev = () =>
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-square bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
        {activeUrl ? (
          <img
            src={activeUrl}
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
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-xl shadow-md flex items-center justify-center text-gray-600 hover:text-orange-600 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-xl shadow-md flex items-center justify-center text-gray-600 hover:text-orange-600 transition-all"
            >
              <ChevronRight size={18} />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to image ${i + 1}`}
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

      {/* Thumbnail strip — show for all real images including single */}
      {hasRealImages && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                activeIndex === i
                  ? "border-orange-500 shadow-md shadow-orange-100"
                  : "border-transparent hover:border-gray-200"
              }`}
            >
              <img
                src={img.url}
                alt={`${productName} view ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
