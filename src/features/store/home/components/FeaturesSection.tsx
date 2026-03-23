"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronUp, CheckCircle2 } from "lucide-react";
import { FadeIn, SectionLabel } from "./HomePrimitives";

// ── FDA / CGMP Split ─────────────────────────────────────────────

export const FDASection = () => (
  <section className="bg-white py-20 sm:py-28 lg:py-32">
    <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 xl:gap-28 items-center">
        {/* YouTube Embed */}
        <FadeIn>
          <div
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl shadow-purple-50 border border-purple-100"
            style={{ aspectRatio: "4/3" }}
          >
            <iframe
              src="https://www.youtube.com/embed/J5Ggjvimb8M"
              title="Product video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </FadeIn>

        {/* Copy */}
        <FadeIn delay={150} className="text-center lg:text-left">
          <SectionLabel>Quality Assured</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-5 sm:mt-6 tracking-tight leading-tight">
            Premium Quality Products
            <br className="hidden sm:block" /> You Can Trust
          </h2>
          <p className="text-gray-500 text-base sm:text-lg mt-4 sm:mt-6 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Discover our curated selection of quality products designed to meet
            your everyday needs. Every item is carefully selected for its value
            and reliability.
          </p>
          <div className="flex flex-col gap-3 mt-6 sm:mt-8 mb-8 sm:mb-10 text-left max-w-sm mx-auto lg:mx-0">
            {[
              "Quality Guaranteed",
              "Fast Delivery",
              "Secure Payments",
              "Excellent Support",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2
                  size={18}
                  className="text-purple-600 flex-shrink-0"
                />
                <span className="text-sm sm:text-base text-gray-700 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold text-base px-10 py-4 rounded-2xl shadow-xl shadow-purple-200 hover:-translate-y-0.5 transition-all duration-200"
          >
            Shop Now
          </Link>
        </FadeIn>
      </div>
    </div>
  </section>
);

// ── Product Benefits Accordion ─────────────────────────────────────

const ACCORDION_ITEMS = [
  {
    title: "Premium Quality",
    body: "Our products are carefully selected to ensure the highest quality standards for your satisfaction.",
  },
  {
    title: "Great Value",
    body: "Competitive pricing on quality products, giving you the best bang for your buck.",
  },
  {
    title: "Reliable Service",
    body: "Fast delivery and dedicated support to ensure a smooth shopping experience.",
  },
] as const;

export const CellularRepairSection = () => {
  const [open, setOpen] = useState<string | null>("Premium Quality");

  return (
    <section className="bg-gradient-to-b from-gray-50/80 to-white py-20 sm:py-28 lg:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 xl:gap-28 items-center">
          {/* Copy + accordion */}
          <FadeIn className="text-center lg:text-left order-2 lg:order-1">
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-5 sm:mt-6 tracking-tight leading-tight mb-8 sm:mb-10">
              Quality products at
              <br />
              prices you'll love
            </h2>

            <div className="flex flex-col gap-0 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              {ACCORDION_ITEMS.map(({ title, body }) => {
                const isOpen = open === title;
                return (
                  <div
                    key={title}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : title)}
                      className="w-full flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 bg-white hover:bg-purple-50/40 transition-colors text-left"
                    >
                      <span
                        className={`font-bold text-sm sm:text-base ${isOpen ? "text-purple-600" : "text-gray-900"}`}
                      >
                        {title}
                      </span>
                      <ChevronUp
                        size={18}
                        className={`text-gray-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <p className="px-5 sm:px-7 pb-4 sm:pb-5 text-sm text-gray-500 leading-relaxed">
                        {body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 sm:mt-10 flex justify-center lg:justify-start">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold text-base px-10 py-4 rounded-2xl shadow-xl shadow-purple-200 hover:-translate-y-0.5 transition-all duration-200"
              >
                Shop Now
              </Link>
            </div>
          </FadeIn>

          {/* Image placeholder */}
          <FadeIn delay={150} className="order-1 lg:order-2">
            <div
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl shadow-purple-50 border border-purple-100"
              style={{ aspectRatio: "4/3" }}
            >
              <iframe
                src="https://www.youtube.com/embed/ohuK7-U25rI"
                title="Product video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
