"use client";

import { useState } from "react";
import {
  MessageSquare,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import TestimonialCard from "./components/TestimonialCard";
import { useTestimonials } from "./hooks/useTestimonials";
import WriteTestimonialModal from "./modals/WriteTestimonialModal";

export default function TestimonialsPage() {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const { testimonials, meta, isLoading, error, refetch } = useTestimonials({
    page,
    limit: 9,
  });

  const content = (() => {
    if (isLoading)
      return (
        <div className="flex justify-center py-24">
          <Loader2 size={24} className="animate-spin text-orange-500" />
        </div>
      );
    if (error)
      return (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-5 py-4 max-w-md mx-auto">
          {error}
        </div>
      );
    if (testimonials.length === 0)
      return (
        <div className="py-24 text-center text-gray-400 text-sm">
          No testimonials yet. Be the first to share your experience!
        </div>
      );
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>
    );
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Header Section */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3">
              Customer Testimonials
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl mb-4">
              Hear from our happy customers about their wellness journey
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-600 hover:bg-gray-500 text-white text-sm font-bold transition-colors"
            >
              <MessageSquare size={15} />
              Share Your Experience
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-12 bg-white rounded-t-3xl -mt-8">
        {/* Cards */}
        {content}

        {/* Pagination */}
        {meta && meta.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page <= 1}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: meta.totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 || p === meta.totalPages || Math.abs(p - page) <= 1,
              )
              .reduce<(number | string)[]>((acc, p, i, arr) => {
                const prev = arr[i - 1];
                if (i > 0 && typeof prev === "number" && p - prev > 1)
                  acc.push(`ellipsis-${i}`);
                acc.push(p);
                return acc;
              }, [])
              .map((p) =>
                typeof p === "string" ? (
                  <span key={p} className="px-1 text-gray-400 text-sm">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      p === page
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= meta.totalPages}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <WriteTestimonialModal
            onClose={() => {
              setShowModal(false);
              refetch();
            }}
          />
        )}
      </div>
    </div>
  );
}
