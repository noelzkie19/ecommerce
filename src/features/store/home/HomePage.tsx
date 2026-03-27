"use client";

import Link from "next/link";
import { Suspense, useRef, useState, useEffect } from "react";
import {
  TrendingUp,
  BookOpen,
  Users,
  ArrowRight,
  CheckCircle2,
  Package,
  Bot,
  ShoppingBag,
  Star,
  Shield,
  Zap,
  Phone,
  Truck,
  Award,
  Clock,
  Banknote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { useHomePageRedirect } from "@/features/auth/hooks/useAuthRedirect";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { ScrollToTop } from "./components/ScrollToTop";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: Package,
    title: "Ready Products",
    description:
      "Hindi ka magsisimula sa zero. Lahat ng kailangan mo — nandito na. Ready-to-sell products para sa iyong negosyo.",
  },
  {
    icon: Bot,
    title: "Automation System",
    description:
      "Chatbot system at auto replies para sa iyong negosyo. Done-for-you automation na gagawin ang trabaho para sa iyo.",
  },
  {
    icon: BookOpen,
    title: "Training & Support",
    description:
      "Step-by-step videos at beginner-friendly guide. May dedicated support team na handang tumulong sa iyo.",
  },
];

const WHY_CHOOSE_LEFT = [
  {
    icon: Award,
    title: "Experience",
    description:
      "With years of industry know-how, we help dropshipping and affiliate entrepreneurs scale and succeed.",
  },
  {
    icon: Package,
    title: "Products",
    description:
      "Our carefully selected, high-quality products ensure customer satisfaction and repeat orders.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Join a thriving network of entrepreneurs. Learn, grow, and succeed together.",
  },
];

const WHY_CHOOSE_RIGHT = [
  {
    icon: Banknote,
    title: "Pricing",
    description:
      "Our transparent, flexible pricing suits any business stage. No hidden fees.",
  },
  {
    icon: Truck,
    title: "Delivery",
    description:
      "Fast, reliable delivery is our priority. Streamlined logistics guarantee timely fulfillment.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Round-the-clock assistance for your success. We're always here when you need us.",
  },
];

const PLANS = [
  {
    name: "Affiliate",
    price: "999",
    features: [
      "Dropshipping Training Series",
      "3-Day Dropship Bootcamp",
      "3-Day Retail Mastery Bootcamp",
      "Dropshipping Website",
      "Dropshipping System",
    ],
    available: true,
    href: "/affiliate/registration",
    cta: "Subscribe Now",
  },
  {
    name: "E-Commerce Shop",
    price: "30K-50K",
    features: [
      "Complete e-commerce website",
      "Product sourcing & inventory",
      "Payment gateway integration",
      "Order management system",
      "Marketing & branding support",
    ],
    available: true,
    href: "/pricing",
    cta: "Get Started",
  },
  {
    name: "Web Development",
    price: "50K+",
    features: [
      "Custom web application",
      "Business website development",
      "E-commerce system setup",
      "Inventory system development",
      "Ongoing maintenance support",
    ],
    available: true,
    href: "/services",
    cta: "Get a Quote",
  },
];

const TESTIMONIALS = [
  {
    id: "1",
    name: "Maria Santos",
    role: "Stay-at-home Mom",
    rating: 5,
    quote:
      "As a stay-at-home mom with no tech skills, I never thought I could succeed in online business. Thanks to the training, tools, and community, I did it. I'm so glad I took the leap of faith!",
    avatar: null,
  },
  {
    id: "2",
    name: "Juan dela Cruz",
    role: "Traditional Businessman",
    rating: 5,
    quote:
      "The coaches and leaders are very supportive. The training and insights are truly priceless. I highly recommend this to anyone looking for a reliable business system.",
    avatar: null,
  },
  {
    id: "3",
    name: "Ana Reyes",
    role: "Fresh Graduate",
    rating: 5,
    quote:
      "I started with zero experience and now I'm earning consistently. The system is so easy to follow and the community is amazing. Best investment I've ever made!",
    avatar: null,
  },
  {
    id: "4",
    name: "Pedro Bautista",
    role: "OFW",
    rating: 5,
    quote:
      "Even while working abroad, I can manage my online business. The automation tools make everything so easy. Kumikita na ako kahit tulog!",
    avatar: null,
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

// ─── Section Wrapper with Reveal Animation ────────────────────────────────────

function RevealSection({
  children,
  className = "",
  delay = 0,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}>) {
  const { ref, visible } = useScrollReveal({ threshold: 0.08 });
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating }: Readonly<{ rating: number }>) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? "fill-orange-400 text-orange-400"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
}

// ─── Testimonials Carousel ────────────────────────────────────────────────────

function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Scroll buttons */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 border border-white/20 shadow-lg text-white hover:bg-orange-500 hover:border-orange-500 transition-all"
        >
          <ChevronLeft size={18} />
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 border border-white/20 shadow-lg text-white hover:bg-orange-500 hover:border-orange-500 transition-all"
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* Cards */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
      >
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="flex-shrink-0 w-72 sm:w-80 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 snap-start card-hover card-hover-orange"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {t.name[0]}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.role}</p>
                <StarRating rating={t.rating} />
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              <span className="text-orange-500 text-xl font-black mr-1">"</span>
              {t.quote}
              <span className="text-orange-500 text-xl font-black ml-1">"</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {FAQ.map((faq, idx) => (
        <div
          key={faq.question}
          className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
            openIdx === idx
              ? "border-orange-300 shadow-md shadow-orange-100/60"
              : "border-gray-200 hover:border-orange-200"
          }`}
        >
          <button
            type="button"
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <span className="font-bold text-gray-900 text-sm sm:text-base">
              {faq.question}
            </span>
            <span
              className={`text-orange-500 transition-transform duration-200 flex-shrink-0 ml-3 ${
                openIdx === idx ? "rotate-45" : ""
              }`}
            >
              +
            </span>
          </button>
          {openIdx === idx && (
            <div className="px-5 pb-4">
              <p className="text-gray-500 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main HomePage ────────────────────────────────────────────────────────────

const HomePageInner = () => {
  const { status } = useHomePageRedirect();
  const { isHydrated } = useAuthStore();

  if (!isHydrated || status.willRedirect) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO SECTION — Full screen, dark bg + photo overlay
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with dark overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/background.jpeg"
            alt="Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gray-950/80" />
        </div>

        {/* Constellation decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            viewBox="0 0 900 600"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Constellation lines */}
            <line
              x1="100"
              y1="80"
              x2="250"
              y2="150"
              stroke="white"
              strokeWidth="0.5"
            />
            <line
              x1="250"
              y1="150"
              x2="380"
              y2="100"
              stroke="white"
              strokeWidth="0.5"
            />
            <line
              x1="380"
              y1="100"
              x2="500"
              y2="200"
              stroke="white"
              strokeWidth="0.5"
            />
            <line
              x1="600"
              y1="80"
              x2="750"
              y2="160"
              stroke="white"
              strokeWidth="0.5"
            />
            <line
              x1="750"
              y1="160"
              x2="820"
              y2="100"
              stroke="white"
              strokeWidth="0.5"
            />
            <line
              x1="150"
              y1="400"
              x2="300"
              y2="350"
              stroke="white"
              strokeWidth="0.5"
            />
            <line
              x1="300"
              y1="350"
              x2="450"
              y2="420"
              stroke="white"
              strokeWidth="0.5"
            />
            {/* Stars */}
            <circle cx="100" cy="80" r="2" fill="white" className="twinkle" />
            <circle
              cx="250"
              cy="150"
              r="1.5"
              fill="white"
              className="twinkle"
              style={{ animationDelay: "0.5s" }}
            />
            <circle
              cx="380"
              cy="100"
              r="2"
              fill="white"
              className="twinkle"
              style={{ animationDelay: "1s" }}
            />
            <circle
              cx="500"
              cy="200"
              r="1.5"
              fill="white"
              className="twinkle"
              style={{ animationDelay: "1.5s" }}
            />
            <circle
              cx="600"
              cy="80"
              r="2"
              fill="white"
              className="twinkle"
              style={{ animationDelay: "0.3s" }}
            />
            <circle
              cx="750"
              cy="160"
              r="1.5"
              fill="white"
              className="twinkle"
              style={{ animationDelay: "0.8s" }}
            />
            <circle
              cx="820"
              cy="100"
              r="2"
              fill="white"
              className="twinkle"
              style={{ animationDelay: "1.2s" }}
            />
            <circle
              cx="150"
              cy="400"
              r="1.5"
              fill="white"
              className="twinkle"
              style={{ animationDelay: "0.6s" }}
            />
            <circle
              cx="300"
              cy="350"
              r="2"
              fill="white"
              className="twinkle"
              style={{ animationDelay: "1.4s" }}
            />
            <circle
              cx="450"
              cy="420"
              r="1.5"
              fill="white"
              className="twinkle"
              style={{ animationDelay: "0.9s" }}
            />
          </svg>
        </div>

        {/* Hero content */}
        <div className="relative text-center px-6 sm:px-10 max-w-5xl mx-auto py-32">
          {/* Badge */}
          <div className="hero-animate-1 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white text-xs sm:text-sm font-semibold mb-8">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse flex-shrink-0" />{" "}
            YOUR TRUSTED BUSINESS PARTNER
          </div>

          {/* Main headline */}
          <h1 className="hero-animate-2 text-5xl sm:text-7xl lg:text-8xl font-black text-white uppercase leading-none tracking-tight mb-2">
            TRIAD365
          </h1>
          <h2 className="hero-animate-3 text-3xl sm:text-5xl lg:text-6xl font-black text-orange-500 uppercase leading-none tracking-tight mb-8">
            MULTISTREAM SYSTEM
          </h2>

          {/* Subtitle */}
          <p className="hero-animate-4 text-gray-300 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            We aim to support businesses and entrepreneurs in creating
            sustainable wealth and achieving their financial objectives through
            a combination of strategic guidance and technological solutions.
          </p>

          {/* CTA Buttons */}
          <div className="hero-animate-5 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base sm:text-lg px-10 py-4 rounded-full transition-all shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 active:scale-95"
            >
              VIEW SERVICES
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold text-base sm:text-lg px-10 py-4 rounded-full transition-all border border-white/20 hover:border-white/40 hover:-translate-y-1"
            >
              <ShoppingBag className="w-5 h-5" />
              Browse Products
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-gray-400 text-sm">
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 text-xs animate-bounce">
          <span>Scroll Down</span>
          <div className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. SERVICES SECTION — White bg, 3 icon cards
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <RevealSection className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3">
              Services We Offer
            </h2>
            <p className="text-orange-500 font-semibold text-lg">
              Your Partner in Scaling Dropshipping & Affiliate Success
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 reveal-stagger">
            {SERVICES.map((service, idx) => (
              <RevealSection key={service.title} delay={idx * 120}>
                <div className="border border-gray-200 rounded-2xl p-8 text-center card-hover card-hover-orange h-full flex flex-col items-center">
                  <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center text-orange-500 bg-orange-50 rounded-2xl">
                    <service.icon size={36} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-orange-500 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold text-lg transition-colors"
            >
              View All Services
              <ArrowRight size={20} />
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. WHY CHOOSE US — Light gray bg, 2-col + center image
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <RevealSection className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-orange-500 mb-3">
              Why Choose Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Your trusted partner for tailored solutions to fuel your business
              growth.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Left column */}
            <div className="space-y-8">
              {WHY_CHOOSE_LEFT.map((item, idx) => (
                <RevealSection
                  key={item.title}
                  delay={idx * 100}
                  className="reveal-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex-shrink-0 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1 text-base">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>

            {/* Center image */}
            <RevealSection className="flex justify-center reveal-scale">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/10 rounded-3xl blur-3xl scale-110" />
                <img
                  src="/images/Drpshipping-1.jpg"
                  alt="Our System"
                  className="relative w-full max-w-sm rounded-3xl shadow-2xl shadow-orange-500/20 border border-orange-100"
                />
              </div>
            </RevealSection>

            {/* Right column */}
            <div className="space-y-8">
              {WHY_CHOOSE_RIGHT.map((item, idx) => (
                <RevealSection
                  key={item.title}
                  delay={idx * 100}
                  className="reveal-right"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex-shrink-0 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1 text-base">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. HOW IT WORKS — White bg, 3-step process
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <RevealSection className="text-center mb-16">
            <span className="inline-block text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-4 tracking-widest uppercase border border-orange-200">
              How It Works
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Ganito ka kikita sa system na ito
            </h2>
            <p className="text-gray-500 text-lg">
              ₱999 one-time access • 15–20% commission per sale
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {HOW_IT_WORKS.map((item, idx) => (
              <RevealSection
                key={item.step}
                delay={idx * 150}
                className="text-center"
              >
                {/* Connector line */}
                <div className="relative">
                  {idx < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[calc(50%+3rem)] right-0 h-px bg-gradient-to-r from-orange-200 to-transparent" />
                  )}
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex flex-col items-center justify-center mx-auto mb-5 shadow-lg shadow-orange-200">
                    <span className="text-orange-100 text-[10px] font-bold tracking-widest">
                      {item.step}
                    </span>
                    <item.icon className="w-6 h-6 text-white mt-0.5" />
                  </div>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. PRICING PLANS — White bg, 2 pricing cards
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <RevealSection className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-orange-500 mb-3">
              Pricing Plans
            </h2>
            <p className="text-gray-600 text-lg">
              Choose a Plan That Suits Your Business Needs
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan, idx) => (
              <RevealSection key={plan.name} delay={idx * 150}>
                <div
                  className={`rounded-3xl p-8 h-full flex flex-col border-2 transition-all duration-300 ${
                    plan.available
                      ? "border-orange-200 bg-white hover:border-orange-400 hover:shadow-xl hover:shadow-orange-100 hover:-translate-y-1"
                      : "border-gray-200 bg-gray-50 opacity-75"
                  }`}
                >
                  <h3 className="text-2xl font-black text-orange-500 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-5xl font-black text-gray-900 mb-6">
                    ₱{plan.price}
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle2 className="text-orange-500 w-4 h-4 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {plan.available ? (
                    <Link
                      href={plan.href}
                      className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-full text-center transition-all shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5"
                    >
                      {plan.cta}
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="block w-full bg-gray-200 text-gray-400 font-bold py-3.5 rounded-full text-center cursor-not-allowed"
                    >
                      {plan.cta}
                    </button>
                  )}
                  {!plan.available && (
                    <p className="text-center text-xs text-red-500 mt-2 flex items-center justify-center gap-1">
                      <span>🚫</span> All slots filled — subscription currently
                      closed.
                    </p>
                  )}
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6. TESTIMONIALS — Light gray bg, carousel
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <RevealSection className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-orange-500 mb-3">
              Testimonials
            </h2>
            <p className="text-gray-600 text-lg">
              What Our Clients Say About Us
            </p>
          </RevealSection>

          <RevealSection>
            <TestimonialsCarousel />
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          8. INCLUSIONS — White bg, checklist
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <RevealSection className="text-center mb-16">
            <span className="inline-block text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-4 tracking-widest uppercase border border-orange-200">
              What You Get
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Lahat ng makukuha mo pag nag-activate ka
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "Ready dropshipping system",
              "Order processing setup",
              "Ready-to-sell items (no need mag stock)",
              "Chatbot system with auto replies",
              "Ready funnel page (high-converting design)",
              "Step-by-step training videos",
              "Beginner-friendly guide",
              "Lifetime access",
            ].map((item, idx) => (
              <RevealSection key={item} delay={idx * 60}>
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all">
                  <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-gray-700 font-semibold text-sm">
                    {item}
                  </span>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          9. FAQ — Light gray bg, accordion
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <RevealSection className="text-center mb-16">
            <span className="inline-block text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full mb-4 tracking-widest uppercase border border-orange-200">
              FAQ
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </RevealSection>

          <RevealSection className="max-w-2xl mx-auto">
            <FAQAccordion />
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          10. CTA SECTION — Dark bg + photo overlay
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/images/background.jpeg"
            alt="Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gray-950/80" />
        </div>

        <div className="relative w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <RevealSection className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 leading-tight">
              Ready to take your dropshipping business to the next level?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Let us know how we can support you in building a successful
              business. Start your journey today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/affiliate/registration"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-10 py-4 rounded-full transition-all shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1"
              >
                ACTIVATE NOW — ₱999
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-lg px-10 py-4 rounded-full transition-all border border-white/20 hover:border-white/40 hover:-translate-y-1"
              >
                <ShoppingBag className="w-5 h-5" />
                Browse Products
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              <Phone className="w-4 h-4" />
              <span>CONTACT US: 0920 329 5363</span>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
};

const HomePage = () => (
  <>
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <HomePageInner />
    </Suspense>
    <ScrollToTop />
  </>
);

export default HomePage;
