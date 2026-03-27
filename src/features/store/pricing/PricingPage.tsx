"use client";

import Link from "next/link";
import { Check, Star, Zap, ShoppingBag, Users, Code } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black">
      {/* Header */}
      <div className="pt-20 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Choose Your Path
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto px-4">
          Start your journey with Triad365. Whether you want to earn as an
          affiliate, build your own e-commerce empire, or get a custom web
          solution.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Affiliate Plan */}
          <div className="relative bg-gradient-to-br from-orange-900/30 to-orange-950/50 rounded-3xl border border-orange-500/30 p-8 hover:border-orange-500/60 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                START EARNING
              </span>
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Affiliate Program
              </h2>
              <p className="text-gray-400">
                Earn commissions by promoting our products
              </p>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2">
                <span className="text-5xl font-bold text-white">₱999</span>
              </div>
              <p className="text-gray-400 mt-2">One-time activation fee</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Unique referral link",
                "15-20% commission per sale",
                "Access to training materials",
                "Marketing resources",
                "Community support",
                "Real-time tracking dashboard",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/affiliate/onboarding"
              className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-center py-4 rounded-xl font-semibold transition-all duration-300"
            >
              Become an Affiliate
            </Link>
          </div>

          {/* Shop Plan */}
          <div className="relative bg-gradient-to-br from-blue-900/30 to-blue-950/50 rounded-3xl border border-blue-500/30 p-8 hover:border-blue-500/60 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <Star className="w-4 h-4" />
                MOST POPULAR
              </span>
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                E-Commerce Shop
              </h2>
              <p className="text-gray-400">
                Your own online store with full support
              </p>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2">
                <span className="text-5xl font-bold text-white">₱30K-50K</span>
              </div>
              <p className="text-gray-400 mt-2">One-time investment</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Complete e-commerce website",
                "Product sourcing & inventory",
                "Payment gateway integration",
                "Order management system",
                "Marketing & branding support",
                "24/7 customer support",
                "Training & onboarding",
                "Lifetime updates",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/login"
              className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-center py-4 rounded-xl font-semibold transition-all duration-300"
            >
              Start Your Shop
            </Link>
          </div>

          {/* Web Development Plan */}
          <div className="relative bg-gradient-to-br from-violet-900/30 to-violet-950/50 rounded-3xl border border-violet-500/30 p-8 hover:border-violet-500/60 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-violet-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                CUSTOM BUILD
              </span>
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-violet-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-violet-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Web Development
              </h2>
              <p className="text-gray-400">
                Custom web solutions tailored to your business
              </p>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2">
                <span className="text-5xl font-bold text-white">₱50K+</span>
              </div>
              <p className="text-gray-400 mt-2">Depends on scope</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Custom web application",
                "Business website development",
                "E-commerce system setup",
                "Inventory system development",
                "Affiliate system integration",
                "Responsive & mobile-ready",
                "SEO optimization",
                "Ongoing maintenance support",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-violet-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/services"
              className="block w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white text-center py-4 rounded-xl font-semibold transition-all duration-300"
            >
              Get a Quote
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-800/50 px-6 py-3 rounded-full">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-300">
              All prices in Philippine Peso (PHP)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
