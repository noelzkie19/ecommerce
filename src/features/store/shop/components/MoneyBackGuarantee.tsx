"use client";

import { ShieldCheck } from "lucide-react";

const TRUST_POINTS = ["No Questions Asked", "Full Refund", "Easy Process"];

export default function MoneyBackGuarantee() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="relative rounded-3xl overflow-hidden border-2 border-orange-100 bg-gradient-to-br from-orange-50 via-white to-emerald-50 shadow-xl shadow-orange-100/40">
        {/* Decorative blobs — clipped by overflow-hidden */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-200/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-orange-200/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-center gap-6 sm:gap-10 p-6 sm:p-10 lg:p-12">
          {/* Badge */}
          <div className="shrink-0 flex flex-col items-center justify-center w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white border-4 border-orange-200 shadow-lg shadow-orange-100">
            <ShieldCheck size={32} className="text-orange-500 sm:hidden" />
            <ShieldCheck
              size={40}
              className="text-orange-500 hidden sm:block"
            />
            <span className="mt-1 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-orange-600 text-center leading-tight">
              30-Day
              <br />
              Guarantee
            </span>
          </div>

          {/* Text */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
              100% Money Back <span className="text-orange-600">Guarantee</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed max-w-lg mx-auto sm:mx-0">
              We&apos;re confident you&apos;ll love the results. If for any
              reason you&apos;re not completely satisfied within{" "}
              <span className="font-semibold text-gray-700">30 days</span> of
              purchase, we&apos;ll give you a full refund — no questions asked,
              no hassle.
            </p>

            {/* Trust pills */}
            <div className="mt-5 flex flex-wrap gap-2 justify-center sm:justify-start">
              {TRUST_POINTS.map((badge) => (
                <span
                  key={badge}
                  className="text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
