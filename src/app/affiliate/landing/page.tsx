"use client";

import Link from "next/link";
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
} from "lucide-react";

const BENEFITS = [
  {
    icon: Package,
    title: "Ready Products",
    description:
      "Pre-curated inventory available immediately. Launch with ready-to-sell products.",
  },
  {
    icon: Bot,
    title: "Automation",
    description: "Intelligent chatbot system with automated responses.",
  },
  {
    icon: TrendingUp,
    title: "Earnings",
    description: "Earn 15–20% per sale using this system.",
  },
  {
    icon: BookOpen,
    title: "Training",
    description:
      "Comprehensive step-by-step video tutorials and documentation.",
  },
  {
    icon: Users,
    title: "System",
    description:
      "DONE-FOR-YOU online business system. You have a system to use from Day 1.",
  },
  {
    icon: Wallet,
    title: "Easy Cashout",
    description: "Withdraw your earnings anytime through Maya Wallet.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "ACTIVATE",
    title: "Activate",
    description: "Pay ₱999 one-time access to get the system.",
  },
  {
    step: "SHARE",
    title: "Share",
    description: "Use your unique referral link to share the system.",
  },
  {
    step: "EARN",
    title: "Earn",
    description: "Earn commission on every sale you make using the system.",
  },
];

const FAQ = [
  {
    question: "I'm a beginner — can I do this?",
    answer: "Yes. Designed for beginners.",
  },
  {
    question: "Do I need to sell products?",
    answer: "Yes — but you have a system to follow, no trial and error.",
  },
  {
    question: "How many hours do I need?",
    answer: "1–2 hours per day is enough.",
  },
  {
    question: "Is there support?",
    answer: "Yes, you have a guide and system.",
  },
];

const INCLUSIONS = [
  "Complete e-commerce system",
  "Automated order processing",
  "Pre-curated inventory (no stocking required)",
  "Automated chatbot with intelligent responses",
  "High-converting funnel template",
  "Comprehensive training video series",
  "Detailed documentation",
  "Lifetime access",
];

export default function AffiliateLandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-white text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse flex-shrink-0"></span>
              <span>DONE-FOR-YOU BUSINESS SYSTEM</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
              Activate{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                Your System Now
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              No setup. No experience needed. Just plug in and start.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/affiliate/registration"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white px-8 py-4 rounded-xl font-bold transition-all text-lg shadow-xl shadow-orange-500/30 hover:-translate-y-0.5"
              >
                Activate Now - ₱999
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="#ano-ba"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium transition-all text-lg border border-white/20 hover:border-white/40"
              >
                Learn More
              </Link>
            </div>

            <p className="text-gray-400 text-sm mt-4">
              🚫 No inventory 🚫 No packing 🚫 No courier 🚫 Manual follow-ups
            </p>
          </div>
        </div>
      </section>

      {/* What is this system? */}
      <section id="ano-ba" className="py-12 sm:py-16 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
              So what is this system exactly?
            </h2>
            <p className="text-gray-600 text-lg">
              Ito ay isang{" "}
              <span className="font-bold text-orange-600">
                DONE-FOR-YOU ONLINE BUSINESS SYSTEM
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-orange-50 border border-orange-100">
              <Package className="w-10 h-10 text-orange-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                READY PRODUCTS
              </h3>
              <p className="text-gray-600 text-sm">
                Pre-curated product catalog ready for immediate sales. Launch
                your business with ready-to-sell products.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
              <Bot className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                AUTOMATION SYSTEM
              </h3>
              <p className="text-gray-600 text-sm">
                Intelligent automated chatbot with auto-replies. Fully managed
                automation system handling customer interactions.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
              <Video className="w-10 h-10 text-emerald-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                TRAINING & SUPPORT
              </h3>
              <p className="text-gray-600 text-sm">
                Comprehensive step-by-step video tutorials. Dedicated support
                team available to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inclusions Section */}
      <section className="py-12 sm:py-16 bg-orange-50/40">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
              What You Get
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
              Everything you get when you activate
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {INCLUSIONS.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-orange-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all"
              >
                <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                </div>
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-4 tracking-widest uppercase border border-orange-200">
              How It Works
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
              Here's how you'll earn with this system
            </h2>
            <p className="text-gray-600">
              ₱999 one-time access • 15–20% commission per sale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="text-center p-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-sm font-extrabold shadow-lg shadow-orange-200">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits/Why Join Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-orange-50/60 to-amber-50/60">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full mb-4 tracking-widest uppercase border border-orange-200">
              Why Join
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
              Why choose this system?
            </h2>
            <p className="text-gray-600">This isn't magic… but it works</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="p-6 rounded-2xl bg-white border border-orange-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <benefit.icon className="w-8 h-8 text-orange-500 mb-3" />
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl max-w-2xl mx-auto text-center">
            <p className="text-gray-800 font-medium">
              This isn't get-rich-quick. You still need to take action.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              But the difference is you{" "}
              <span className="font-bold">won't have to guess</span> and{" "}
              <span className="font-bold">won't trial and error</span> — you
              have a proven system to follow.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-md mx-auto">
            <div className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-orange-500/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative">
                <h3 className="text-2xl font-bold mb-4 text-center">
                  How much to get started?
                </h3>

                <div className="text-center mb-2">
                  <span className="text-sm text-gray-400 line-through">
                    Sa ibang system: ₱5,000 – ₱15,000
                  </span>
                </div>
                <div className="text-center mb-6">
                  <span className="text-5xl font-extrabold text-orange-400">
                    ₱999
                  </span>
                  <p className="text-gray-400 text-sm mt-2">
                    ONE-TIME ACTIVATION ONLY
                  </p>
                </div>

                <Link
                  href="/affiliate/registration"
                  className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white text-center py-4 rounded-xl font-bold transition-all text-lg shadow-lg shadow-orange-500/20 hover:-translate-y-0.5"
                >
                  ACTIVATE NOW
                </Link>

                <p className="text-gray-400 text-xs text-center mt-4">
                  If you want extra income… here it is
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-orange-50/40">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full mb-4 tracking-widest uppercase border border-orange-200">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
              Frequently Asked Questions (FAQ)
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {FAQ.map((faq) => (
              <div
                key={faq.question}
                className="p-5 bg-white rounded-xl border border-orange-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all"
              >
                <h4 className="font-bold text-gray-900 mb-1 flex items-start gap-2">
                  <span className="text-orange-500 flex-shrink-0">Q.</span>
                  {faq.question}
                </h4>
                <p className="text-gray-600 text-sm pl-5">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            You don't need to be an expert.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-6">
            You just need to get started. Activate now and start your online
            business journey!
          </p>
          <p className="text-orange-400 text-sm mb-6 font-medium">
            CONTACT US: 0920 329 5363
          </p>
          <Link
            href="/affiliate/registration"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white px-8 py-4 rounded-xl font-bold transition-all text-lg shadow-xl shadow-orange-500/20 hover:-translate-y-0.5"
          >
            ACTIVATE NOW - ₱999
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <p className="text-gray-500 text-xs mt-6">
            Copyright ©2026 TRIAD MULTISTREAM SYSTEM
          </p>
        </div>
      </section>
    </div>
  );
}
