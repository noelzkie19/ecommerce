"use client";

import { FadeIn, SectionLabel } from "./HomePrimitives";
import { homeService } from "../services/home.service";
import { HomeBenefit } from "@/types/home.types";

const BenefitCard = ({
  benefit,
  index,
}: {
  readonly benefit: HomeBenefit;
  readonly index: number;
}) => (
  <FadeIn delay={index * 70}>
    <div className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 border border-gray-100 hover:border-orange-100 hover:shadow-xl hover:shadow-purple-50/80 hover:-translate-y-1.5 transition-all duration-300 h-full">
      <div
        className={[
          "w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-7 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300",
          benefit.iconBg,
          benefit.iconColor,
        ].join(" ")}
      >
        {benefit.icon}
      </div>
      <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-2 sm:mb-3">
        {benefit.title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">
        {benefit.description}
      </p>
    </div>
  </FadeIn>
);

export const BenefitsSection = () => {
  const benefits = homeService.getBenefits();

  return (
    <section className="bg-gradient-to-b from-gray-50/80 to-white py-20 sm:py-28 lg:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <FadeIn className="text-center mb-12 sm:mb-16 lg:mb-20">
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-gray-900 mt-4 sm:mt-6 tracking-tight">
            Why Shop With Us
          </h2>
          <p className="text-gray-500 text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed">
            Discover quality products at great prices with fast delivery and
            excellent customer service.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7">
          {benefits.map((b, i) => (
            <BenefitCard key={b.title} benefit={b} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
