"use client";

import {
  Shield,
  Leaf,
  Pill,
  FlaskConical,
  RotateCcw,
  Heart,
} from "lucide-react";

const TRUST_ITEMS = [
  { icon: <Heart size={28} />, label: "Chronic Health Support" },
  { icon: <Leaf size={28} />, label: "All-Natural Ingredients" },
  { icon: <Pill size={28} />, label: "Easy to Take Daily" },
  { icon: <FlaskConical size={28} />, label: "CGMP & HACCP Certified" },
  { icon: <RotateCcw size={28} />, label: "Money-Back Guarantee" },
  { icon: <Shield size={28} />, label: "FDA Registered" },
] as const;

export const TrustBar = () => (
  <section className="bg-gray-50 border-y border-gray-100 py-8 sm:py-10">
    <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {TRUST_ITEMS.map(({ icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2.5 group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full border border-orange-100 flex items-center justify-center text-orange-600 shadow-sm group-hover:shadow-md group-hover:border-orange-300 group-hover:scale-105 transition-all duration-300">
              {icon}
            </div>
            <p className="text-center text-xs sm:text-sm font-semibold text-gray-600 leading-tight max-w-[90px]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
