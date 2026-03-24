"use client";

import Link from "next/link";
import { Suspense } from "react";
import {
  TrendingUp,
  BookOpen,
  Wallet,
  Users,
  ArrowRight,
  CheckCircle2,
  Package,
  Bot,
  Video,
  ShoppingBag,
  Star,
  Shield,
  Zap,
  Phone,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { useHomePageRedirect } from "@/features/auth/hooks/useAuthRedirect";

const BENEFITS = [
  {
    icon: Package,
    title: "Ready Products",
    description:
      "Hindi ka magsisimula sa zero. Lahat ng kailangan mo — nandito na.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: Bot,
    title: "Automation",
    description: "Chatbot system at auto replies para sa iyong negosyo.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: TrendingUp,
    title: "Earnings",
    description: "Kumita ng 15–20% per sale gamit ang systemang ito.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: BookOpen,
    title: "Training",
    description: "Step-by-step videos at beginner-friendly guide.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Users,
    title: "System",
    description:
      "DONE-FOR-YOU online business system. May system ka na gagamitin from Day 1.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: Wallet,
    title: "Easy Cashout",
    description: "Withdraw your earnings anytime through Maya Wallet.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Mag-activate",
    description: "Magbayad ng ₱999 one-time access para makuha ang system.",
    icon: Zap,
  },
  {
    step: "02",
    title: "Mag-share",
    description:
      "Gamitin ang iyong unique referral link para ipakita ang system.",
    icon: Users,
  },
  {
    step: "03",
    title: "Kumita",
    description:
      "Kumita ng commission sa benta na gagawin mo gamit ang system.",
    icon: TrendingUp,
  },
];

const FAQ = [
  {
    question: "Beginner ako — pwede ba?",
    answer: "Yes. Designed ito for beginners. Walang experience needed.",
  },
  {
    question: "Kailangan ba magbenta?",
    answer: "Opo — pero may system kang susundan, hindi trial and error.",
  },
  {
    question: "Ilang oras kailangan?",
    answer: "1–2 hrs/day sapat na para magsimula.",
  },
  {
    question: "May support ba?",
    answer: "Yes, may guide + system ka. Hindi ka mag-iisa.",
  },
];

const INCLUSIONS = [
  "Ready e-commerce system",
  "Order processing setup",
  "Ready-to-sell items (no need mag stock)",
  "Chatbot system with auto replies",
  "Ready funnel page (high-converting design)",
  "Step-by-step training videos",
  "Beginner-friendly guide",
  "Lifetime access",
];

const STATS = [
  { value: "₱999", label: "One-time only", sub: "No monthly fees" },
  { value: "15–20%", label: "Commission per sale", sub: "Earn every time" },
  { value: "100%", label: "Done-for-you", sub: "System ready to use" },
];

const HomePageInner = () => {
  const { status } = useHomePageRedirect();
  const { isHydrated } = useAuthStore();

  if (!isHydrated || status.willRedirect) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* ── Hero Section ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-16 sm:py-24 lg:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white text-sm font-semibold mb-8">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse flex-shrink-0" />{" "}
              DONE-FOR-YOU BUSINESS SYSTEM
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Mag-activate Ng{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                Your System
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Bibigyan ka namin ng SYSTEM na pwede mong gamitin agad. No
              inventory. No packing. No courier. Kumita ka na.
            </p>

            {/* System Image */}
            <div className="mb-10">
              <img
                src="/images/Drpshipping-1.jpg"
                alt="Our System"
                className="w-full max-w-3xl mx-auto rounded-2xl shadow-2xl shadow-orange-500/20 border border-white/10"
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white px-8 py-4 rounded-2xl font-extrabold transition-all text-lg shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5"
              >
                Activate Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold transition-all text-lg border border-white/20 hover:border-white/40"
              >
                <ShoppingBag className="w-5 h-5" />
                Browse Products
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-gray-400 text-sm">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-green-400" />
                Secure Payment
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                No Monthly Fees
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                Lifetime Access
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-3 divide-x divide-gray-100">
            {STATS.map((stat) => (
              <div key={stat.label} className="py-6 sm:py-8 text-center px-4">
                <p className="text-2xl sm:text-3xl font-extrabold text-orange-500 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-gray-900">{stat.label}</p>
                <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What is this system? ─────────────────────────────────────────────── */}
      <section id="ano-ba" className="py-16 sm:py-20 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="inline-block text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-4 tracking-widest uppercase border border-orange-200">
              About the System
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              Ano ba talaga itong system na ito?
            </h2>
            <p className="text-gray-500 text-lg">
              Ito ay isang{" "}
              <span className="font-bold text-orange-600">
                DONE-FOR-YOU ONLINE BUSINESS SYSTEM
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Package,
                title: "PRODUCT",
                desc: "Hindi ka magsisimula sa zero. Lahat ng kailangan mo — nandito na.",
                color: "text-orange-600",
                bg: "bg-orange-50",
                border: "border-orange-100",
              },
              {
                icon: Bot,
                title: "SYSTEM & AUTOMATION",
                desc: "Susunod ka nalang sa proseso. Automated selling process gamit ang guided step-by-step system.",
                color: "text-blue-600",
                bg: "bg-blue-50",
                border: "border-blue-100",
              },
              {
                icon: Video,
                title: "TRAINING",
                desc: "May training videos at guide para sa iyong success.",
                color: "text-emerald-600",
                bg: "bg-emerald-50",
                border: "border-emerald-100",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`p-8 rounded-3xl ${item.bg} border ${item.border} flex flex-col items-start`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm`}
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-lg font-extrabold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inclusions Section ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-orange-50/40">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="inline-block text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
              What You Get
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              Lahat ng makukuha mo pag nag-activate ka
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {INCLUSIONS.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all"
              >
                <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                </div>
                <span className="text-gray-700 font-semibold text-sm">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works Section ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="inline-block text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-4 tracking-widest uppercase border border-orange-200">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              Ganito ka kikita sa system na ito
            </h2>
            <p className="text-gray-500">
              ₱999 one-time access • 15–20% commission per sale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {HOW_IT_WORKS.map((item, idx) => (
              <div key={item.step} className="relative text-center">
                {/* Connector line */}
                {idx < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+3rem)] right-0 h-px bg-gradient-to-r from-orange-200 to-transparent" />
                )}
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex flex-col items-center justify-center mx-auto mb-5 shadow-lg shadow-orange-200">
                  <span className="text-orange-100 text-[10px] font-bold tracking-widest">
                    {item.step}
                  </span>
                  <item.icon className="w-6 h-6 text-white mt-0.5" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits/Why Join Section ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-orange-50/60 to-amber-50/60">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="inline-block text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full mb-4 tracking-widest uppercase border border-orange-200">
              Why Join
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              Bakit pumili ng system na ito?
            </h2>
            <p className="text-gray-500">Hindi ito magic… pero gumagana ito</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="p-6 rounded-3xl bg-white border border-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div
                  className={`w-11 h-11 ${benefit.bg} rounded-2xl flex items-center justify-center mb-4`}
                >
                  <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                </div>
                <h3 className="text-base font-extrabold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-amber-50 border border-amber-200 rounded-3xl max-w-2xl mx-auto text-center">
            <p className="text-gray-800 font-bold text-base">
              💡 Hindi ito get-rich-quick. Kailangan mo pa din kumilos.
            </p>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              Pero ang difference ay{" "}
              <span className="font-bold text-amber-700">
                Hindi ka manghuhula
              </span>{" "}
              at{" "}
              <span className="font-bold text-amber-700">
                Hindi ka mag trial and error
              </span>{" "}
              — may system ka na susundin.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pricing Section ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-md mx-auto">
            <div className="relative overflow-hidden p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl shadow-gray-900/30">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative">
                <div className="text-center mb-6">
                  <span className="inline-block text-xs font-bold text-orange-300 bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
                    Pricing
                  </span>
                  <h3 className="text-2xl font-extrabold mb-2">
                    Magkano para makapag-start?
                  </h3>
                  <p className="text-gray-400 text-sm line-through">
                    Sa ibang system: ₱5,000 – ₱15,000
                  </p>
                </div>

                <div className="text-center mb-8">
                  <div className="flex items-end justify-center gap-2">
                    <span className="text-6xl font-extrabold tracking-tight text-orange-400">
                      ₱999
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2 font-semibold tracking-widest uppercase">
                    One-Time Activation Only
                  </p>
                </div>

                <Link
                  href="/affiliate/registration"
                  className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white text-center py-4 rounded-2xl font-extrabold transition-all text-lg shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:-translate-y-0.5"
                >
                  ACTIVATE NOW
                </Link>

                <p className="text-gray-400 text-xs text-center mt-4">
                  Kung gusto mo ng extra income… eto na yun
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ──────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-orange-50/40">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="inline-block text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full mb-4 tracking-widest uppercase border border-orange-200">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {FAQ.map((faq) => (
              <div
                key={faq.question}
                className="p-5 sm:p-6 bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md hover:border-orange-300 transition-all"
              >
                <h4 className="font-extrabold text-gray-900 mb-2 flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5 flex-shrink-0">
                    Q.
                  </span>
                  {faq.question}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed pl-5">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
              Hindi mo kailangan maging expert.
            </h2>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              Kailangan mo lang magsimula. Mag-activate ngayon at simulan ang
              iyong online business journey!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/affiliate/registration"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white px-8 py-4 rounded-2xl font-extrabold transition-all text-lg shadow-xl shadow-orange-500/20 hover:-translate-y-0.5"
              >
                ACTIVATE NOW — ₱999
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold transition-all text-lg border border-white/20 hover:border-white/40"
              >
                <ShoppingBag className="w-5 h-5" />
                Browse Products
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              <Phone className="w-4 h-4" />
              <span>CONTACT US: 0920 329 5363</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const HomePage = () => (
  <Suspense
    fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }
  >
    <HomePageInner />
  </Suspense>
);

export default HomePage;
