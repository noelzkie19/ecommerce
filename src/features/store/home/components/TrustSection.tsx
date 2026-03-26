"use client";

import Link from "next/link";
import {
  RotateCcw,
  Shield,
  Leaf,
  Zap,
  FlaskConical,
  Heart,
  Sparkles,
} from "lucide-react";
import { FadeIn, SectionLabel } from "./HomePrimitives";

// ── Money-Back Guarantee ─────────────────────────────────────────

export const MoneyBackSection = () => (
  <section className="bg-orange-500 py-16 sm:py-20">
    <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
      <FadeIn>
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
          <RotateCcw size={32} className="text-white" />
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 sm:mb-5">
          Money Back Guarantee
        </h2>
        <p className="text-orange-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
          Shop with confidence. If you're not satisfied with your purchase
          within 30 days, we'll give you your money back — no questions asked.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-orange-600 font-bold text-base px-10 sm:px-14 py-4 rounded-2xl shadow-xl shadow-orange-800/20 hover:-translate-y-0.5 transition-all duration-200"
        >
          Shop Now
        </Link>
      </FadeIn>
    </div>
  </section>
);

// ── Doctor Formulated Differentiators ────────────────────────────

const DIFFERENTIATORS = [
  {
    icon: <Shield size={22} />,
    title: "Quality Assured",
    body: "Every product meets strict quality standards for your peace of mind and satisfaction.",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    icon: <Leaf size={22} />,
    title: "Carefully Selected",
    body: "We curate products that meet our high standards for quality and value.",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: <Zap size={22} />,
    title: "Fast Delivery",
    body: "Quick and reliable shipping to get your products to you as soon as possible.",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: <FlaskConical size={22} />,
    title: "Secure Payments",
    body: "Multiple secure payment options including GCash, COD, and bank transfers.",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    icon: <Heart size={22} />,
    title: "Customer First",
    body: "Dedicated support team ready to help you with any questions or concerns.",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
  },
  {
    icon: <Sparkles size={22} />,
    title: "Best Prices",
    body: "Competitive pricing on quality products to give you the best value for your money.",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
] as const;

export const DifferentiatorsSection = () => (
  <section className="bg-white py-20 sm:py-28 lg:py-32">
    <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
      <FadeIn className="text-center mb-12 sm:mb-16 lg:mb-20">
        <SectionLabel>Why Choose Us</SectionLabel>
        <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-gray-900 mt-4 sm:mt-6 tracking-tight">
          Quality products at great prices
          <br className="hidden sm:block" /> with excellent service
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 mb-12 sm:mb-16">
        {DIFFERENTIATORS.map(({ icon, title, body, iconBg, iconColor }, i) => (
          <FadeIn key={title} delay={i * 60}>
            <div className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-100 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-50/80 hover:-translate-y-1.5 transition-all duration-300 h-full">
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 ${iconBg} ${iconColor}`}
              >
                {icon}
              </div>
              <h3 className="font-extrabold text-gray-900 text-sm sm:text-base mb-2">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                {body}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn className="flex justify-center">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold text-base px-10 sm:px-14 py-4 rounded-2xl shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 transition-all duration-200"
        >
          Shop Now
        </Link>
      </FadeIn>
    </div>
  </section>
);
