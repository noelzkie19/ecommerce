"use client";

import { FadeIn } from "./HomePrimitives";
import { homeService } from "../services/home.service";

export const StatsSection = () => {
  const stats = homeService.getStats();

  return (
    <section className="bg-white border-y border-gray-100">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 80}>
              <div
                className={[
                  "flex flex-col items-center text-center px-4 sm:px-8 lg:px-10 py-10 sm:py-14 lg:py-16",
                  "group hover:bg-purple-50/40 transition-colors border-r border-gray-100 last:border-r-0",
                  i < 2 ? "border-b lg:border-b-0 border-gray-100" : "",
                ].join(" ")}
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-purple-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-purple-500 mb-3 sm:mb-4 group-hover:scale-110 group-hover:bg-purple-100 transition-all duration-300">
                  {stat.icon}
                </div>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight mb-1 sm:mb-1.5">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
