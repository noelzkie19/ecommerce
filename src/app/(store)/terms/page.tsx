"use client";

import Link from "next/link";
import { Shield, FileText, Mail, Phone, MapPin } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />
        <div className="relative w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full text-orange-400 text-xs sm:text-sm font-semibold mb-6">
              <FileText size={16} />
              Legal Documentation
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase leading-none tracking-tight mb-6">
              Terms & Conditions
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Please read these terms and conditions carefully before using our
              services. By accessing or using Triad365 services, you agree to be
              bound by these terms.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Company Information */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                1. Company Information
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Triad365 (also known as Triad Multistream System) is a
                Philippine-based company providing dropshipping, affiliate
                marketing, and e-commerce solutions to entrepreneurs and
                businesses.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-orange-400" />
                  </div>
                  <span className="text-gray-400">Manila, Philippines</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-orange-400" />
                  </div>
                  <span className="text-gray-400">0920 329 5363</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-orange-400" />
                  </div>
                  <span className="text-gray-400">support@triad365.com</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Services Offered
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Triad365 provides the following services to our customers:
              </p>

              <div className="space-y-6">
                {/* Dropshipping */}
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    2.1 Dropshipping
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-3">
                    Our dropshipping service allows you to sell products without
                    maintaining inventory. We handle product sourcing, storage,
                    and shipping directly to your customers.
                  </p>
                  <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                    <li>Access to curated product catalog</li>
                    <li>Competitive pricing on all products</li>
                    <li>Fast delivery nationwide</li>
                    <li>No need to stock or manage inventory</li>
                  </ul>
                </div>

                {/* Affiliate Program */}
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    2.2 Affiliate Program
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-3">
                    Our affiliate program provides you with a complete business
                    system and the opportunity to earn commissions by promoting
                    our products and services.
                  </p>
                  <div className="bg-gray-800 rounded-xl p-4 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-bold">
                        One-Time Access Fee
                      </span>
                      <span className="text-orange-400 font-bold text-xl">
                        ₱999
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Includes all training materials, systems, and support
                    </p>
                  </div>
                  <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                    <li>Dropshipping Training Series</li>
                    <li>3-Day Dropship Bootcamp</li>
                    <li>3-Day Retail Mastery Bootcamp</li>
                    <li>Dropshipping Website</li>
                    <li>Dropshipping System</li>
                    <li>15-20% commission per sale</li>
                  </ul>
                </div>

                {/* E-commerce Shops */}
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    2.3 E-commerce Shops
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-3">
                    We provide ready-to-use e-commerce systems with automation
                    features to help you start selling immediately.
                  </p>
                  <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                    <li>Ready-to-sell items (no need to stock products)</li>
                    <li>Order processing setup</li>
                    <li>Chatbot system with auto replies</li>
                    <li>Ready funnel page (high-converting design)</li>
                    <li>Step-by-step training videos</li>
                    <li>Beginner-friendly guide</li>
                    <li>Lifetime access</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Pricing & Payment */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                3. Pricing & Payment Terms
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  <strong className="text-white">3.1</strong> The affiliate
                  program access fee is ₱999 (Philippine Pesos) as a one-time
                  payment. This fee is non-refundable once the account has been
                  activated and access has been granted.
                </p>
                <p>
                  <strong className="text-white">3.2</strong> Commission
                  payments are processed according to our payment schedule.
                  Affiliates earn 15-20% commission on each successful sale made
                  through their referral link.
                </p>
                <p>
                  <strong className="text-white">3.3</strong> All prices for
                  products in our shop are displayed in Philippine Pesos (₱) and
                  include applicable taxes unless otherwise stated.
                </p>
                <p>
                  <strong className="text-white">3.4</strong> We accept various
                  payment methods including Maya, COD (Cash on Delivery), and
                  bank transfers. Payment must be completed before order
                  processing.
                </p>
              </div>
            </div>

            {/* User Responsibilities */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                4. User Responsibilities
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  <strong className="text-white">4.1</strong> Users must provide
                  accurate and complete information when registering for an
                  account or making a purchase.
                </p>
                <p>
                  <strong className="text-white">4.2</strong> Users are
                  responsible for maintaining the confidentiality of their
                  account credentials and for all activities that occur under
                  their account.
                </p>
                <p>
                  <strong className="text-white">4.3</strong> Users agree not to
                  use our services for any illegal or unauthorized purpose and
                  must comply with all applicable laws and regulations.
                </p>
                <p>
                  <strong className="text-white">4.4</strong> Affiliates must
                  accurately represent our products and services and must not
                  make false or misleading claims.
                </p>
              </div>
            </div>

            {/* Refund Policy */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Refund Policy
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  <strong className="text-white">5.1</strong> The ₱999 affiliate
                  program access fee is non-refundable once the account has been
                  activated and access to training materials and systems has
                  been granted.
                </p>
                <p>
                  <strong className="text-white">5.2</strong> For product
                  purchases through our shop, we offer a 30-day return policy
                  for items that are defective or damaged upon delivery. Items
                  must be returned in their original packaging and condition.
                </p>
                <p>
                  <strong className="text-white">5.3</strong> Refunds will be
                  processed within 7-14 business days after we receive and
                  inspect the returned item.
                </p>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Intellectual Property
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  <strong className="text-white">6.1</strong> All content,
                  materials, and systems provided by Triad365, including but not
                  limited to training videos, guides, website designs, and
                  automation systems, are the intellectual property of Triad365.
                </p>
                <p>
                  <strong className="text-white">6.2</strong> Users are granted
                  a limited, non-exclusive license to use these materials for
                  personal business purposes only. Redistribution, resale, or
                  unauthorized sharing of these materials is strictly
                  prohibited.
                </p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Limitation of Liability
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  <strong className="text-white">7.1</strong> Triad365 provides
                  training, tools, and systems to help users build their
                  businesses. However, we do not guarantee specific income
                  results or business success.
                </p>
                <p>
                  <strong className="text-white">7.2</strong> Users acknowledge
                  that business results depend on various factors including
                  individual effort, market conditions, and external factors
                  beyond our control.
                </p>
                <p>
                  <strong className="text-white">7.3</strong> Triad365 shall not
                  be liable for any indirect, incidental, special, or
                  consequential damages arising from the use of our services.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-2xl p-8 border border-orange-500/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                  <Shield size={24} className="text-orange-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    8. Contact Us
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    If you have any questions about these Terms & Conditions,
                    please contact us:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail size={16} className="text-orange-400" />
                      <a
                        href="mailto:support@triad365.com"
                        className="text-gray-400 hover:text-orange-400 transition-colors"
                      >
                        support@triad365.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone size={16} className="text-orange-400" />
                      <a
                        href="tel:+639203295363"
                        className="text-gray-400 hover:text-orange-400 transition-colors"
                      >
                        0920 329 5363
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin size={16} className="text-orange-400" />
                      <span className="text-gray-400">Manila, Philippines</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-center text-gray-500 text-sm">
              <p>Last updated: March 2026</p>
              <p className="mt-2">
                <Link
                  href="/privacy"
                  className="text-orange-400 hover:text-orange-300 transition-colors"
                >
                  View our Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
