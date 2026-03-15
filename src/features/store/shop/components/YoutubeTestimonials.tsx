"use client";

import { useState, useRef } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    videoId: "J5Ggjvimb8M",
    label: "Real Results ✨",
    quote: "Watch what this customer had to say about their experience!",
  },
  {
    videoId: "ohuK7-U25rI",
    label: "Highly Recommended 🔥",
    quote: "This supplement completely changed my daily routine.",
  },
  {
    videoId: "SNINF7JSPJo",
    label: "Feeling Amazing 💪",
    quote: "I noticed a huge difference in my energy levels within weeks.",
  },
  {
    videoId: "mVx4JIaqb3I",
    label: "Life Changing 🌟",
    quote: "I can't imagine going back to life without this product.",
  },
];

function VideoCard({
  testimonial,
}: {
  readonly testimonial: (typeof TESTIMONIALS)[number];
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex-shrink-0 w-[calc(85vw-24px)] xs:w-64 sm:w-60 md:w-64 lg:w-60 xl:w-64 flex flex-col gap-3">
      {/* 9:16 portrait ratio — Shorts format */}
      <div
        className="relative w-full rounded-2xl overflow-hidden bg-gray-900 shadow-lg shadow-purple-100/50"
        style={{ aspectRatio: "9 / 16" }}
      >
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${testimonial.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
            title={`Testimonial ${testimonial.videoId}`}
          />
        ) : (
          <>
            <img
              src={`https://img.youtube.com/vi/${testimonial.videoId}/hqdefault.jpg`}
              alt={testimonial.label}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

            {/* Play button */}
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play video"
              className="absolute inset-0 flex items-center justify-center group"
            >
              <span className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-purple-600 flex items-center justify-center shadow-xl transition-all duration-200 group-hover:scale-110">
                <Play
                  size={22}
                  className="text-purple-600 group-hover:text-white fill-current ml-1"
                />
              </span>
            </button>

            {/* Label pill */}
            <div className="absolute bottom-3 left-3 right-3">
              <span className="inline-block text-xs font-bold text-white bg-purple-600/80 backdrop-blur-sm px-2.5 py-1 rounded-full leading-tight">
                {testimonial.label}
              </span>
            </div>
          </>
        )}
      </div>

      <p className="text-xs text-gray-500 italic leading-relaxed px-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
    </div>
  );
}

export default function YoutubeTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-500 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full">
          Real People, Real Results
        </span>
        <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
          Hear It From Our Customers
        </h2>
        <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-md mx-auto">
          Thousands of Filipinos have transformed their health. You could be
          next.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Prev arrow — hidden on mobile, shown sm+ */}
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="hidden sm:flex absolute -left-4 lg:-left-6 top-[45%] -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white border-2 border-gray-100 shadow-md hover:border-purple-300 hover:text-purple-600 transition-all"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Track */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS.map((t) => (
            <div key={t.videoId} className="snap-start first:pl-0 last:pr-0">
              <VideoCard testimonial={t} />
            </div>
          ))}
        </div>

        {/* Next arrow */}
        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="hidden sm:flex absolute -right-4 lg:-right-6 top-[45%] -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white border-2 border-gray-100 shadow-md hover:border-purple-300 hover:text-purple-600 transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Mobile swipe hint */}
      <p className="mt-4 text-center text-xs text-gray-400 sm:hidden">
        Swipe to see more →
      </p>
    </section>
  );
}
