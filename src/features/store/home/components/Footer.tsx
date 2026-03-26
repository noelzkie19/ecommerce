"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

// Social icons as inline SVG components to avoid deprecated icon warnings
const FacebookIcon = ({ size = 15 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 15 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ size = 15 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" />
  </svg>
);

const SERVICES_LINKS = [
  { label: "Dropshipping Platform", href: "/shop" },
  { label: "Business to Business", href: "/shop" },
  { label: "Consulting & Training", href: "/register" },
];

const INFORMATION_LINKS = [
  { label: "Services", href: "/shop" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "About Us", href: "/#about" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export const Footer = () => (
  <footer className="bg-gray-950 text-gray-400">
    {/* ── Main footer content ── */}
    <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-gray-800">
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
          {/* Social icons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all cursor-pointer"
            >
              <FacebookIcon />
            </button>
            <button
              type="button"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all cursor-pointer"
            >
              <InstagramIcon />
            </button>
            <button
              type="button"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all cursor-pointer"
            >
              <YoutubeIcon />
            </button>
          </div>
        </div>

        {/* ── Services Column ── */}
        <div>
          <h4 className="font-bold text-white text-sm mb-5 tracking-wide">
            Services
          </h4>
          <ul className="space-y-3">
            {SERVICES_LINKS.map(({ label, href }) => (
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
        <div className="flex items-center gap-4">
          <Link
            href="/shop"
            className="text-gray-600 hover:text-orange-400 text-xs transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/testimonials"
            className="text-gray-600 hover:text-orange-400 text-xs transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="/register"
            className="text-gray-600 hover:text-orange-400 text-xs transition-colors"
          >
            Affiliate
          </Link>
        </div>
      </div>
    </div>
  </footer>
);
