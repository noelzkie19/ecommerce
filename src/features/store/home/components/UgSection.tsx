"use client";

import { Star, Quote } from "lucide-react";
import { FadeIn, SectionLabel } from "./HomePrimitives";

const UGC_ITEMS = [
  {
    id: "1",
    name: "Julianne Louise Dionaldo",
    location: "Manila",
    product: "Product A",
    rating: 5,
    quote: "Great product! Highly recommend.",
    img: "/images/julianne.jpg",
  },
  {
    id: "2",
    name: "Irene Quiliste",
    location: "Manila",
    product: "Product B",
    rating: 5,
    quote: "Excellent quality and fast delivery.",
    img: "/images/irene.jpg",
  },
  {
    id: "3",
    name: "Aurelia Bernat",
    location: "Manila",
    product: "Product C",
    rating: 5,
    quote: "Very satisfied with my purchase!",
    img: "/images/aurelia.jpg",
  },
] as const;

const StarRow = ({ count = 5 }: { count?: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: count }, (_, i) => `star-${i + 1}`).map((key) => (
      <Star key={key} size={12} className="fill-amber-400 text-amber-400" />
    ))}
  </div>
);

export const UGCSection = () => (
  <section className="bg-gradient-to-b from-gray-50/80 to-white py-20 sm:py-28 lg:py-32 overflow-hidden">
    <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
      {/* Header */}
      <FadeIn className="mb-12 sm:mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <SectionLabel>Real Results</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.05] mt-4 sm:mt-6">
            Hear it straight
            <br className="hidden sm:block" />
            <span className="text-orange-600"> from them</span>
          </h2>
        </div>
        <p className="text-gray-500 text-base sm:text-lg max-w-md leading-relaxed lg:text-right">
          Read authentic reviews from our satisfied customers across the
          Philippines.
        </p>
      </FadeIn>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-12 sm:mb-16">
        {UGC_ITEMS.map((item, i) => (
          <FadeIn key={item.id} delay={i * 120}>
            <div
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-orange-100/60 hover:-translate-y-1.5 transition-all duration-300"
              style={{ aspectRatio: "3/4" }}
            >
              {/* Background photo */}
              <img
                src={item.img}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/20 to-transparent" />

              {/* Product badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {item.product}
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6">
                <Quote size={18} className="text-orange-400 mb-2 opacity-80" />
                <p className="text-white font-semibold text-sm sm:text-base leading-snug mb-3">
                  "{item.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-extrabold text-sm">
                      {item.name}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {item.location}
                    </p>
                  </div>
                  <StarRow count={item.rating} />
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);
