"use client";

import { Star } from "lucide-react";
import type { TestimonialItem } from "@/types/testimonial.types";

interface Props {
  readonly testimonial: TestimonialItem;
}

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
          <Star
            key={star}
            size={14}
            className={
              star <= testimonial.rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-200"
            }
          />
        ))}
      </div>

      {/* Message */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
        &ldquo;{testimonial.message}&rdquo;
      </p>

      {/* Customer */}
      <div className="flex items-center gap-3 pt-1">
        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-sm font-semibold flex-shrink-0">
          {testimonial.customer_name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            {testimonial.customer_name}
          </p>
          {testimonial.location && (
            <p className="text-xs text-gray-400">
              {[testimonial.location].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
