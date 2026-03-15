"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What is this product made of?",
    a: "Our product is crafted from 100% natural, doctor-formulated ingredients. Every batch is manufactured in FDA-approved, CGMP-certified facilities to ensure the highest quality and safety standards.",
  },
  {
    q: "How long before I see results?",
    a: "Most customers notice improvements within 2–4 weeks of consistent daily use. For optimal results, we recommend taking the full 90-day course.",
  },
  {
    q: "Are there any side effects?",
    a: "Our formula uses only natural ingredients and is free from artificial additives. It is generally well-tolerated. If you have a specific medical condition or are pregnant, please consult your doctor before use.",
  },
  {
    q: "How do I take this supplement?",
    a: "Take 1–2 capsules daily with a full glass of water, preferably with a meal. Do not exceed the recommended daily dose.",
  },
  {
    q: "Do you ship nationwide?",
    a: "Yes! We ship to all provinces across the Philippines. Orders above ₱2,500 qualify for FREE shipping. Standard delivery takes 3–7 business days.",
  },
  {
    q: "What if I'm not satisfied?",
    a: "We stand behind our product with a 30-day Money Back Guarantee. If you're not 100% satisfied, contact our support team for a full refund — no questions asked.",
  },
];

export default function FAQSection() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-500 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full">
          Got Questions?
        </span>
        <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-gray-500 text-sm sm:text-base">
          Everything you need to know before you order.
        </p>
      </div>

      {/* Accordion */}
      <div className="flex flex-col gap-3">
        {FAQS.map((faq) => {
          const isOpen = openKey === faq.q;
          return (
            <div
              key={faq.q}
              className={`rounded-2xl border-2 bg-white transition-all duration-200 ${
                isOpen
                  ? "border-purple-300 shadow-md shadow-purple-100/60"
                  : "border-gray-100 hover:border-purple-200"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenKey(isOpen ? null : faq.q)}
                className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left"
              >
                <span
                  className={`text-sm sm:text-base font-semibold leading-snug ${
                    isOpen ? "text-purple-700" : "text-gray-800"
                  }`}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-purple-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer — smooth expand */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-4 sm:px-5 pb-5 text-sm sm:text-base text-gray-500 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
