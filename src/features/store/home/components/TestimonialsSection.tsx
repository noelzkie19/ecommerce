"use client";

import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { FadeIn, SectionLabel, StarRating } from "./HomePrimitives";
import { useTestimonials } from "../../testimonials/hooks/useTestimonials";
import { TestimonialItem } from "@/types/testimonial.types";

const TestimonialCard = ({
  testimonial,
  index,
}: {
  readonly testimonial: TestimonialItem;
  readonly index: number;
}) => (
  <FadeIn delay={index * 100}>
    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 border border-gray-100 hover:shadow-xl hover:shadow-purple-50 hover:border-purple-100 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
      <StarRating rating={testimonial.rating} size={15} />
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-4 sm:mt-6 mb-6 sm:mb-8 flex-1 italic">
        "{testimonial.message}"
      </p>
      <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-5 border-t border-gray-100">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-700 flex items-center justify-center text-white text-sm sm:text-base font-extrabold flex-shrink-0 shadow-lg shadow-purple-200">
          {testimonial.customer_name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-extrabold text-gray-900">
            {testimonial.customer_name}
          </p>
          {testimonial.location && (
            <p className="text-xs text-gray-400 mt-0.5">
              {testimonial.location}
            </p>
          )}
        </div>
        {/* Verified badge */}
        <span className="flex-shrink-0 text-xs bg-purple-50 text-purple-600 font-bold px-2.5 py-1 rounded-full border border-purple-100">
          Verified
        </span>
      </div>
    </div>
  </FadeIn>
);

export const TestimonialsSection = () => {
  const { testimonials, isLoading, error } = useTestimonials({
    page: 1,
    limit: 9,
  });

  const topThree = testimonials?.slice(0, 3) ?? [];

  return (
    <section className="bg-gradient-to-b from-gray-50/80 to-white py-20 sm:py-28 lg:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <FadeIn className="text-center mb-12 sm:mb-16 lg:mb-20">
          <SectionLabel>Customer Reviews</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-gray-900 mt-4 sm:mt-6 tracking-tight mb-4 sm:mb-5">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <Star size={18} className="fill-purple-500 text-purple-500" />
            <span className="font-extrabold text-gray-900 text-xl sm:text-2xl">
              5.0
            </span>
            <span className="text-gray-400 text-sm sm:text-base">
              (verified reviews)
            </span>
          </div>
        </FadeIn>

        {/* Loading skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-10 sm:mb-14">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={`skeleton-${i}`}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 border border-gray-100 h-64 animate-pulse"
              />
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-gray-400 text-sm mb-10">
            Unable to load reviews at this time.
          </p>
        )}

        {!isLoading && !error && topThree.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-10 sm:mb-14">
            {topThree.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>
        )}

        <FadeIn className="flex justify-center">
          <Link
            href="/testimonials"
            className="group inline-flex items-center gap-2.5 border-2 border-gray-200 bg-white hover:border-purple-300 hover:text-purple-600 text-gray-700 text-sm sm:text-base font-bold px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            See All Reviews
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
};
