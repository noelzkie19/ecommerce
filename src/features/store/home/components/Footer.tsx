"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const SERVICES_LIST = [
  "Dropshipping",
  "Affiliate Program",
  "E-commerce Shops",
  "Web Development",
];

const CONSULTANCY_SERVICES = [
  "Business Website Development",
  "E-commerce Systems",
  "Inventory System Development",
  "Custom Web Applications",
  "Affiliate System Setup",
];

const INFORMATION_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export const Footer = () => (
  <footer className="bg-gray-950 text-gray-400">
    {/* ── Main footer content ── */}
    <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-12 border-b border-gray-800">
        {/* ── Brand Column ── */}
        <div>
          <Link href="/" className="inline-block mb-5">
            <Image
              src="/images/logo.png"
              alt="Triad365"
              width={120}
              height={40}
              className="h-8 w-auto brightness-0 invert"
            />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            We aim to support businesses and entrepreneurs in creating
            sustainable wealth and achieving their financial objectives through
            a combination of strategic guidance and technological solutions.
          </p>
        </div>

        {/* ── Services Column ── */}
        <div>
          <h4 className="font-bold text-white text-sm mb-5 tracking-wide">
            Services
          </h4>
          <ul className="space-y-3">
            {SERVICES_LIST.map((service) => (
              <li key={service}>
                <span className="text-gray-400 text-sm">{service}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Information Column ── */}
        <div>
          <h4 className="font-bold text-white text-sm mb-5 tracking-wide">
            Information
          </h4>
          <ul className="space-y-3">
            {INFORMATION_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-gray-400 hover:text-orange-400 text-sm transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contacts Column ── */}
        <div>
          <h4 className="font-bold text-white text-sm mb-5 tracking-wide">
            Contacts
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin size={14} className="text-orange-400" />
              </div>
              <span className="text-gray-400 leading-relaxed">
                Manila, Philippines
              </span>
            </li>

            <li className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                <Phone size={14} className="text-orange-400" />
              </div>
              <a
                href="tel:+639203295363"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                0920 329 5363
              </a>
            </li>

            <li className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                <Mail size={14} className="text-orange-400" />
              </div>
              <a
                href="mailto:support@triad365.com"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                support@triad365.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
        <p className="text-gray-600 text-xs text-center sm:text-left">
          © 2026 Triad365 / Triad Multistream System. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
