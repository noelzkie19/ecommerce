"use client";

import Link from "next/link";
import {
  Users,
  Target,
  Award,
  Heart,
  ArrowRight,
  CheckCircle2,
  Building2,
  Globe,
  Zap,
  Shield,
} from "lucide-react";

const VALUES = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "We help businesses build, launch, and scale digital systems that sell.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Your success is our priority. We're committed to delivering exceptional value.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We maintain the highest standards in everything we do, from code to customer service.",
  },
  {
    icon: Globe,
    title: "Innovation",
    description:
      "We stay ahead of trends to bring you cutting-edge solutions that work.",
  },
];

const STATS = [
  { value: "28,000+", label: "Community Members" },
  { value: "500+", label: "Stores Launched" },
  { value: "₱50M+", label: "Revenue Generated" },
  { value: "99%", label: "Customer Satisfaction" },
];

const SERVICES = [
  {
    icon: Building2,
    title: "E-Commerce Solutions",
    description:
      "Complete online store setup with payment integration and automation.",
  },
  {
    icon: Zap,
    title: "Affiliate Systems",
    description:
      "Build your affiliate network and earn commissions through our platform.",
  },
  {
    icon: Shield,
    title: "Web Development",
    description: "Custom web applications tailored to your business needs.",
  },
  {
    icon: Target,
    title: "Social Media Strategy",
    description:
      "Data-driven social media campaigns that engage audiences and drive conversions.",
  },
  {
    icon: Award,
    title: "Media Buying",
    description:
      "Strategic ad placement across platforms to maximize ROI and reach.",
  },
  {
    icon: Heart,
    title: "Graphic Design",
    description:
      "Visual content creation that strengthens your brand and captures attention.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent" />
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
            <Users className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 text-sm font-medium">
              About Triad365
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            We Help Businesses Build Digital Systems That Sell
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            From social media strategy to web development, we create profitable
            digital ecosystems that help you launch, optimize, and scale.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center"
              >
                <p className="text-3xl md:text-4xl font-extrabold text-orange-400 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Who We Are
          </h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              We are a team of skilled professionals specializing in social
              media strategy, media buying, graphic design, and web development.
              We work closely with businesses to build systems that are not only
              visually strong but also designed to generate real results.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Our focus is creating profitable digital ecosystems — from
              dropshipping and e-commerce stores to digital service platforms.
              We combine strategy, design, and technology to help clients
              launch, optimize, and scale their operations effectively.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              We also provide consultancy in web development, helping businesses
              choose the right structure, tools, and systems based on their
              goals.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose Triad365?
          </h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <ul className="space-y-4">
              {[
                "Expert team specializing in social media, design, and development",
                "Profitable digital ecosystems from dropshipping to e-commerce",
                "Strategy-driven approach for real, measurable results",
                "Web development consultancy for the right tools and systems",
                "Comprehensive support from launch to scale",
                "Proven track record of helping businesses succeed",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join thousands of entrepreneurs who have already built successful
            businesses with Triad365. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/25"
            >
              View Pricing
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/shop"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25"
            >
              Browse Shop
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
