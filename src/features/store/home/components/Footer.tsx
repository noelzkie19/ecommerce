"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  FOOTER_QUICK_LINKS,
  FOOTER_CATEGORIES,
} from "@/shared/utils/home.constants";

export const Footer = () => (
  <footer className="bg-gray-100 border-t border-gray-200 text-gray-900">
    <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 pb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-8 border-b border-gray-200">
        {/* ── Brand ── */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-block mb-3">
            <span className="text-lg font-extrabold text-gray-900 tracking-tight">
              Triad365
            </span>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed max-w-[220px]">
            Your premier destination for quality products delivered right to
            your doorstep.
          </p>
        </div>

        {/* ── Quick Links ── */}
        <div>
          <h4 className="font-extrabold text-gray-900 text-xs mb-4 tracking-widest uppercase">
            Quick Links
          </h4>
          <ul className="space-y-2.5">
            {FOOTER_QUICK_LINKS.map((label) => (
              <li key={label}>
                <Link
                  href={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                  className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Categories ── */}
        <div>
          <h4 className="font-extrabold text-gray-900 text-xs mb-4 tracking-widest uppercase">
            Categories
          </h4>
          <ul className="space-y-2.5">
            {FOOTER_CATEGORIES.map((cat) => (
              <li key={cat}>
                <Link
                  href="/shop"
                  className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contact ── */}
        <div>
          <h4 className="font-extrabold text-gray-900 text-xs mb-4 tracking-widest uppercase">
            Contact
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5 text-gray-500 text-sm">
              <Mail size={14} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <a
                href="mailto:support@triad365.com"
                className="hover:text-purple-600 transition-colors"
              >
                support@triad365.com
              </a>
            </li>

            <li className="flex items-center gap-2.5 text-gray-500 text-sm">
              <Phone size={14} className="text-blue-600 flex-shrink-0" />
              <a
                href="tel:+639171336767"
                className="hover:text-blue-600 transition-colors"
              >
                (+63) 917 133 6767
              </a>
            </li>

            <li className="flex items-start gap-2.5 text-gray-500 text-sm">
              <MapPin
                size={14}
                className="text-blue-600 flex-shrink-0 mt-0.5"
              />
              <span>Manila, Philippines</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-5">
        <p className="text-gray-400 text-xs text-center sm:text-left">
          © 2026 Triad365. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
