"use client";

import Link from "next/link";
import {
  ArrowRight,
  Package,
  ShoppingBag,
  Users,
  Shield,
  Clock,
  Banknote,
  Truck,
  Award,
  Code,
  Lock,
} from "lucide-react";
import { useScrollReveal } from "../home/hooks/useScrollReveal";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: Users,
    title: "LNG Reseller Package",
    description:
      "Start your online business today with premium Lean N' Green coffee products. Get up to 40% discount per item, a done-for-you dropshipping website, complete dropshipping system, step-by-step training, referral commission opportunity, and affiliate marketing access.",
    href: "#",
    isLocked: true,
    price: "₱6,990",
    features: [
      "Premium Lean N' Green Coffee Products",
      "Up to 40% Discount per item",
      "Done-for-you Dropshipping Website",
      "Complete Dropshipping System",
      "Step-by-step Training Included",
      "Referral Commission Opportunity",
      "Affiliate Marketing Access",
    ],
  },
  {
    icon: Users,
    title: "Affiliate 999",
    description:
      "Join our affiliate program and earn commissions by promoting our products. Perfect for entrepreneurs looking to build a sustainable income stream.",
    href: "/affiliate/landing",
    isLocked: false,
    features: [
      "Dropshipping Training Series",
      "3-Day Dropship Bootcamp",
      "3-Day Retail Mastery Bootcamp",
      "Dropshipping Website",
      "Dropshipping System",
    ],
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Shop",
    description:
      "Browse and purchase high-quality products from our curated collection. From ready-to-sell items to exclusive deals, we have everything you need.",
    href: "/shop",
    isLocked: false,
    features: [
      "Ready-to-sell Products",
      "High-quality Items",
      "Fast Delivery",
      "Secure Payments",
      "24/7 Support",
    ],
  },
  {
    icon: Code,
    title: "Web Development",
    description:
      "Custom web development solutions tailored to your business needs. From e-commerce platforms to custom applications, we build it all.",
    href: "/pricing",
    isLocked: false,
    features: [
      "Custom Website Design",
      "E-commerce Development",
      "Web Application Development",
      "Custom Web Apps",
      "Mobile-Responsive Design",
      "SEO Optimization",
      "Ongoing Maintenance",
    ],
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

// ─── Main Component ───────────────────────────────────────────────────────────

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <RevealSection>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Our Services
              </h1>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                We provide comprehensive solutions to help you build and grow
                your online business. From affiliate programs to e-commerce
                shops, we have everything you need to succeed.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {SERVICES.map((service, index) => (
              <RevealSection key={service.title} delay={index * 100}>
                <div
                  className={`bg-gray-900/50 border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-orange-500/50 transition-all duration-300 ${service.isLocked ? "relative overflow-hidden" : ""}`}
                >
                  {/* Locked Overlay */}
                  {service.isLocked && (
                    <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-center py-6 bg-gradient-to-t from-gray-900/90 to-transparent">
                      <div className="w-14 h-14 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mb-3">
                        <Lock size={28} className="text-orange-400" />
                      </div>
                      <p className="text-orange-400 font-semibold text-base mb-1">
                        Coming Soon
                      </p>
                      <p className="text-white font-bold text-xl">
                        {service.price}
                      </p>
                      <p className="text-orange-400 mt-2 text-sm">
                        Start Your Online Business Today 🚀
                      </p>
                    </div>
                  )}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      <service.icon size={24} className="text-orange-400" />
                    </div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-white">
                        {service.title}
                      </h2>
                      {service.isLocked && (
                        <span className="inline-flex items-center gap-1 text-orange-400 text-sm font-medium bg-orange-500/10 px-2 py-1 rounded-lg">
                          <Lock size={14} />
                          Locked
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-orange-400" />
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {!service.isLocked && (
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold text-sm transition-colors"
                    >
                      Learn More
                      <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-900/30">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <RevealSection>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Why Choose Us
              </h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
                We are committed to your success. Here is what sets us apart.
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              {WHY_CHOOSE_LEFT.map((item, index) => (
                <RevealSection key={item.title} delay={index * 100}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>

            {/* Center Image */}
            <RevealSection delay={200}>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-3xl blur-3xl" />
                  <div className="relative bg-gray-900/50 border border-white/10 rounded-3xl p-8 sm:p-12">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-6">
                        <Shield size={40} className="text-orange-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Trusted Partner
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Your success is our priority
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Right Column */}
            <div className="space-y-8">
              {WHY_CHOOSE_RIGHT.map((item, index) => (
                <RevealSection key={item.title} delay={index * 100}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
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

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <RevealSection>
            <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-2xl p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-8">
                Join thousands of entrepreneurs who have already started their
                journey with us. Take the first step towards building your
                online business today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/affiliate/landing"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  Start Affiliate Program
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors border border-white/10"
                >
                  Browse Shop
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
