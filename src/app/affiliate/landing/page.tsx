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
      "Hindi ka magsisimula sa zero. Lahat ng kailangan mo — nandito na.",
  },
  {
    icon: Bot,
    title: "Automation",
    description: "Chatbot system at auto replies para sa iyong negosyo.",
  },
  {
    icon: TrendingUp,
    title: "Earnings",
    description: "Kumita ng 15–20% per sale gamit ang systemang ito.",
  },
  {
    icon: BookOpen,
    title: "Training",
    description: "Step-by-step videos at beginner-friendly guide.",
  },
  {
    icon: Users,
    title: "System",
    description:
      "DONE-FOR-YOU online business system. May system ka na gagamitin from Day 1.",
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
    title: "Mag-activate",
    description: "Magbayad ng ₱99 one-time access para makuha ang system.",
  },
  {
    step: "SHARE",
    title: "Mag-share",
    description:
      "Gamitin ang iyong unique referral link para ipakita ang system.",
  },
  {
    step: "EARN",
    title: "Kumita",
    description:
      "Kumita ng commission sa benta na gagawin mo gamit ang system.",
  },
];

const FAQ = [
  {
    question: "Beginner ako — pwede ba?",
    answer: "Yes. Designed ito for beginners.",
  },
  {
    question: "Kailangan ba magbenta?",
    answer: "Opo — pero may system kang susundan, hindi trial and error.",
  },
  {
    question: "Ilang oras kailangan?",
    answer: "1–2 hrs/day sapat na.",
  },
  {
    question: "May support ba?",
    answer: "Yes, may guide + system ka.",
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
              Mag-activate Ng{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                Your System
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              Bibigyan ka namin ng SYSTEM na pwede mong gamitin agad.
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
              Ano ba talaga itong system na ito?
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
              <h3 className="text-lg font-bold text-gray-900 mb-2">PRODUCT</h3>
              <p className="text-gray-600 text-sm">
                Hindi ka magsisimula sa zero. Lahat ng kailangan mo — nandito
                na.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
              <Bot className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                SYSTEM & AUTOMATION
              </h3>
              <p className="text-gray-600 text-sm">
                Susunod ka nalang sa proseso. Automated selling process gamit
                ang guided step-by-step system.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
              <Video className="w-10 h-10 text-emerald-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">TRAINING</h3>
              <p className="text-gray-600 text-sm">
                May training videos at guide para sa iyong success.
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
              Lahat ng makukuha mo pag nag activate ka
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
              Ganito ka kikita sa system na ito
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
              Bakit pumili ng system na ito?
            </h2>
            <p className="text-gray-600">Hindi ito magic… pero gumagana ito</p>
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
              Hindi ito get-rich-quick. 👉 Kailangan mo pa din kumilos.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Pero ang difference ay{" "}
              <span className="font-bold">Hindi ka manghuhula</span> at{" "}
              <span className="font-bold">Hindi ka mag trial and error</span> —
              may system ka na susundin.
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
                  Magkano para makapag start?
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
                  Kung gusto mo ng extra income… eto na yun
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
            Hindi mo kailangan maging expert.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-6">
            Kailangan mo lang magsimula. Mag-activate ngayon at simulan ang
            iyong online business journey!
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
