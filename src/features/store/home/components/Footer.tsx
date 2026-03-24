"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import {
  FOOTER_QUICK_LINKS,
  FOOTER_CATEGORIES,
} from "@/shared/utils/home.constants";

export const Footer = () => (
  <footer className="bg-purple-950 text-gray-400">
    {/* ── Main footer content ── */}
    <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-10 border-b border-purple-900">
        {/* ── Brand ── */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/images/logo.png"
              alt="Triad365"
              width={100}
              height={32}
              className="h-7 w-auto brightness-0 invert"
            />
          </Link>
          <p className="text-purple-300/70 text-sm leading-relaxed max-w-[220px] mb-5">
            Your premier destination for quality products delivered right to
            your doorstep.
          </p>
          <Link
            href="/affiliate/onboarding"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            Become an Affiliate
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ── Quick Links ── */}
        <div>
          <h4 className="font-extrabold text-white text-xs mb-5 tracking-widest uppercase">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {FOOTER_QUICK_LINKS.map((label) => (
              <li key={label}>
                <Link
                  href={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                  className="text-purple-300/70 hover:text-white text-sm font-medium transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Categories ── */}
        <div>
          <h4 className="font-extrabold text-white text-xs mb-5 tracking-widest uppercase">
            Categories
          </h4>
          <ul className="space-y-3">
            {FOOTER_CATEGORIES.map((cat) => (
              <li key={cat}>
                <Link
                  href="/shop"
                  className="text-purple-300/70 hover:text-white text-sm font-medium transition-colors"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contact ── */}
        <div>
          <h4 className="font-extrabold text-white text-xs mb-5 tracking-widest uppercase">
            Contact
          </h4>
          <ul className="space-y-3.5">
            <li className="flex items-start gap-2.5 text-sm">
              <Mail
                size={14}
                className="text-yellow-400 flex-shrink-0 mt-0.5"
              />
              <a
                href="mailto:support@triad365.com"
                className="text-purple-300/70 hover:text-white transition-colors"
              >
                support@triad365.com
              </a>
            </li>

            <li className="flex items-center gap-2.5 text-sm">
              <Phone size={14} className="text-yellow-400 flex-shrink-0" />
              <a
                href="tel:+639171336767"
                className="text-purple-300/70 hover:text-white transition-colors"
              >
                (+63) 917 133 6767
              </a>
            </li>

            <li className="flex items-start gap-2.5 text-sm">
              <MapPin
                size={14}
                className="text-yellow-400 flex-shrink-0 mt-0.5"
              />
              <span className="text-purple-300/70">Manila, Philippines</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
        <p className="text-purple-400/60 text-xs text-center sm:text-left">
          © 2026 Triad365 / Triad Multistream System. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/shop"
            className="text-purple-400/60 hover:text-purple-300 text-xs transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/testimonials"
            className="text-purple-400/60 hover:text-purple-300 text-xs transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="/affiliate/onboarding"
            className="text-purple-400/60 hover:text-purple-300 text-xs transition-colors"
          >
            Affiliate
          </Link>
        </div>
      </div>
    </div>
  </footer>
);
