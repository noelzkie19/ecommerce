"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const WHY_JOIN = [
  {
    id: "top-notch",
    num: 1,
    text: "Quality Products: Browse our premium selection of products at competitive prices.",
  },
  {
    id: "commissions",
    num: 2,
    text: "Earn Rewards: Enjoy competitive commissions on every sale through your referral link.",
  },
  {
    id: "payments",
    num: 3,
    text: "Secure Payments: Multiple payment options including GCash, COD, and bank transfer.",
  },
  {
    id: "support",
    num: 4,
    text: "Dedicated Support: We're here to help you with any questions or concerns.",
  },
];

export const HeroSection = () => (
  <section className="relative bg-white overflow-hidden">
    {/* Subtle bg blobs */}
    <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-100/30 rounded-full blur-3xl pointer-events-none" />

    <div className="relative w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
      {/* ── LEFT ── */}
      <div className="text-center lg:text-left">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-[1.25] tracking-tight mb-4"
          style={{ animation: "fadeSlideUp .5s ease both" }}
        >
          Triad Market:{" "}
          <span className="text-orange-600">
            Quality Products at Your Fingertips
          </span>
        </h1>

        <p
          className="text-gray-500 text-sm leading-relaxed mb-3 max-w-lg mx-auto lg:mx-0"
          style={{ animation: "fadeSlideUp .5s ease .1s both" }}
        >
          Shop top-quality products with fast delivery across the Philippines.
          We\n offer a curated selection of items to meet your everyday needs
          with reliable service and secure payments.
        </p>

        <div
          className="mb-5 text-left max-w-lg mx-auto lg:mx-0"
          style={{ animation: "fadeSlideUp .5s ease .15s both" }}
        >
          <p className="text-sm font-bold text-gray-800 mb-2">
            Why Choose Triad Market?
          </p>
          <ol className="space-y-1.5 list-none">
            {WHY_JOIN.map(({ id, num, text }) => (
              <li
                key={id}
                className="flex gap-2 text-sm text-gray-500 leading-snug"
              >
                <span className="text-orange-600 font-bold flex-shrink-0">
                  {num}.
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
          style={{ animation: "fadeSlideUp .5s ease .2s both" }}
        >
          <Link
            href="/shop"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-7 py-3 rounded-xl shadow-lg shadow-orange-200 hover:-translate-y-0.5 transition-all duration-200"
          >
            Shop Now
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="/testimonials"
            className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:text-orange-600 font-bold text-sm px-7 py-3 rounded-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            See Reviews
          </Link>
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div
        className="relative hidden lg:flex items-stretch"
        style={{ animation: "fadeSlideUp .6s ease .1s both" }}
      >
        <div className="w-full rounded-2xl overflow-hidden shadow-xl shadow-orange-100">
          <img
            src="/images/Ultima.jpg"
            alt="Ultima 17 product"
            className="w-full h-full object-cover object-center"
            style={{ maxHeight: "580px", minHeight: "420px" }}
          />
        </div>
      </div>
    </div>
  </section>
);
