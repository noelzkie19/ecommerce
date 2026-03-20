"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Menu,
  X,
  LogOut,
  ShoppingBag,
  LayoutDashboard,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/features/auth";
import { HOME_NAV_LINKS } from "@/shared/utils/home.constants";
import { useScrolled } from "@/features/store/home/hooks/useScrolled";
import { useCartStore } from "@/store/cart.store";

export function Navbar() {
  const { user, isAdmin } = useAuthStore();
  const { cart, fetchCart } = useCartStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled();

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleSignOut = () =>
    authService.logout().then(() => {
      globalThis.location.href = "/login";
    });

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100"
          : "bg-white/80 backdrop-blur-md border-b border-gray-100/50",
      ].join(" ")}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 flex items-center justify-between h-14 sm:h-[64px]">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <span className="text-xl font-extrabold text-blue-600">Triad365</span>
        </Link>

        {/* ── Desktop nav links ── */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          {HOME_NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:rounded-full after:transition-all hover:after:w-full"
            >
              {label}
            </Link>
          ))}
          {isAdmin() && (
            <Link
              href="/admin/dashboard"
              className="relative flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:rounded-full after:transition-all hover:after:w-full"
            >
              <LayoutDashboard size={15} /> Admin
            </Link>
          )}
        </nav>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
          >
            <ShoppingCart size={17} />
            {cart.totalQty > 0 && (
              <span className="absolute top-1 right-1 bg-blue-600 text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center leading-none">
                {cart.totalQty > 9 ? "9+" : cart.totalQty}
              </span>
            )}
          </Link>

          {/* Profile / Sign In */}
          {user ? (
            <div className="relative ml-0.5">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                aria-label="Profile menu"
                className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-md shadow-blue-200 hover:scale-105 transition-transform"
              >
                {user.fullName?.[0]?.toUpperCase() ?? "?"}
              </button>

              {profileOpen && (
                <>
                  <button
                    className="fixed inset-0 z-10 w-full h-full cursor-default bg-transparent border-0"
                    onClick={() => setProfileOpen(false)}
                    aria-label="Close menu"
                  />
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-20 overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="font-semibold text-sm text-gray-900">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/orders"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <ShoppingBag size={14} /> My Orders
                    </Link>
                    {isAdmin() && (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <LayoutDashboard size={14} /> Admin Panel
                      </Link>
                    )}
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="ml-0.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm shadow-blue-200 whitespace-nowrap"
            >
              Sign In
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            className="md:hidden p-1.5 text-gray-600 ml-0.5"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={[
          "md:hidden overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="bg-white border-t border-gray-100 px-4 sm:px-6 py-2 shadow-xl">
          {HOME_NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center text-sm font-semibold text-gray-700 hover:text-blue-600 py-3 border-b border-gray-50 last:border-0 transition-colors"
            >
              {label}
            </Link>
          ))}
          {isAdmin() && (
            <Link
              href="/admin/dashboard"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-600 py-3 border-b border-gray-50 transition-colors"
            >
              <LayoutDashboard size={14} /> Admin
            </Link>
          )}
          {user ? (
            <button
              onClick={() => {
                setMobileOpen(false);
                handleSignOut();
              }}
              className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 py-3 w-full transition-colors"
            >
              <LogOut size={14} /> Sign Out
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center text-sm font-semibold text-blue-600 py-3"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
