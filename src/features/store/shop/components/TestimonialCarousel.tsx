"use client";

import { useState, useEffect } from "react";
import { Loader2, ChevronLeft, ChevronRight, User, Star } from "lucide-react";
import { useTestimonials } from "@/features/store/testimonials/hooks/useTestimonials";

const StarRating = ({ rating }: { readonly rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => {
      const filled = i < Math.floor(rating);
      const partial = !filled && i < rating;
      return (
        <span key={i} className="relative inline-block w-4 h-4">
          <Star
            size={16}
            className="text-gray-200 fill-gray-200"
            strokeWidth={0}
          />
          {(filled || partial) && (
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: filled ? "100%" : `${(rating % 1) * 100}%` }}
            >
              <Star
                size={16}
                className="text-amber-400 fill-amber-400"
                strokeWidth={0}
              />
            </span>
          )}
        </span>
      );
    })}
  </div>
);

function maskName(name: string): string {
  if (!name || name.length <= 2) return name;
  return name.at(0) + "****" + name.at(-1);
}

export default function TestimonialCarousel() {
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(0);

  const { testimonials, meta, isLoading } = useTestimonials({ page, limit: 9 });

  const total = meta?.total ?? 0;
  const current = testimonials[index] ?? null;

  const handlePrev = () => {
    if (index > 0) {
      setIndex((i) => i - 1);
    } else if (page > 1) {
      setPage((p) => p - 1);
      setIndex(8);
    }
  };

  const handleNext = () => {
    if (index < testimonials.length - 1) {
      setIndex((i) => i + 1);
    } else if (meta && page < meta.totalPages) {
      setPage((p) => p + 1);
      setIndex(0);
    }
  };

  useEffect(() => {
    if (index >= testimonials.length && testimonials.length > 0) {
      setIndex(testimonials.length - 1);
    }
  }, [testimonials.length, index]);

  const globalIndex = (page - 1) * 9 + index;
  const isFirst = globalIndex === 0;
  const isLast = globalIndex >= total - 1;

  if (isLoading && testimonials.length === 0) {
    return (
      <div className="flex items-center justify-center py-6">
        <Loader2 size={18} className="animate-spin text-orange-400" />
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handlePrev}
        disabled={isFirst}
        className="shrink-0 p-1 text-gray-400 hover:text-orange-600 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex-1 flex items-center gap-4 bg-blue-50/60 border border-blue-100 rounded-2xl px-5 py-4">
        <div className="shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
          <User size={22} className="text-white" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-gray-800">
              {maskName(current.customer_name)}
            </span>
            <StarRating rating={current.rating} />
          </div>
          <p className="text-sm text-gray-500 italic leading-snug line-clamp-2">
            {current.message}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={isLast || (isLoading && index === testimonials.length - 1)}
        className="shrink-0 p-1 text-gray-400 hover:text-orange-600 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        aria-label="Next testimonial"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
