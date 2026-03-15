"use client";

import { Star } from "lucide-react";
import { useFadeIn } from "../hooks/useFadeIn";

export const StarRating = ({
  rating,
  size = 14,
}: {
  readonly rating: number;
  readonly size?: number;
}) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
      <Star
        key={star}
        size={size}
        className={
          star <= rating
            ? "fill-purple-500 text-purple-500"
            : "fill-gray-200 text-gray-200"
        }
      />
    ))}
  </div>
);

export const SectionLabel = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => (
  <span className="inline-flex items-center gap-1.5 border border-purple-200 bg-purple-50 text-purple-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
    {children}
  </span>
);

export const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  readonly children: React.ReactNode;
  readonly delay?: number;
  readonly className?: string;
}) => {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .65s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .65s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};
