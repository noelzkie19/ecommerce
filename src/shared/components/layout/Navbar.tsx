"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  UserCheck,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/features/auth";
import { HOME_NAV_LINKS } from "@/shared/utils/home.constants";
import { useScrolled } from "@/features/store/home/hooks/useScrolled";
import { useCartStore } from "@/store/cart.store";
import { getGuestId } from "@/utils/guest.utils";

const CUSTOMER_NAME_KEY = "customer_name";

export function Navbar() {
  const { user, isAdmin } = useAuthStore();
  const { cart, fetchCart } = useCartStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [guestId, setGuestId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const scrolled = useScrolled();
  const pathname = usePathname();
  const isShopPage = pathname?.startsWith("/shop");

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    if (isShopPage) {
      fetchCart();
    }
  }, [fetchCart, isShopPage]);

  useEffect(() => {
    if (isShopPage && !user) {
      const id = getGuestId();
      setGuestId(id);
      const name = localStorage.getItem(CUSTOMER_NAME_KEY);
      if (name) {
        setCustomerName(name);
      }
    }
  }, [user, isShopPage]);

  const handleSignOut = () =>
    authService.logout().then(() => {
      globalThis.location.href = "/login";
    });

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-gray-950/98 backdrop-blur-lg shadow-lg shadow-black/20 border-b border-white/5"
          : "bg-gray-950/95 backdrop-blur-md border-b border-white/10",
      ].join(" ")}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 flex items-center justify-between h-14 sm:h-[64px]">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Triad365"
            width={100}
            height={32}
            className="h-6 w-auto sm:h-8 brightness-0 invert"
          />
        </Link>

        {/* ── Desktop nav links ── */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          {HOME_NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative text-sm font-semibold text-gray-300 hover:text-orange-400 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-orange-500 after:rounded-full after:transition-all hover:after:w-full"
            >
              {label}
            </Link>
          ))}
          {isAdmin() && (
            <Link
              href="/admin/dashboard"
              className="relative flex items-center gap-1.5 text-sm font-semibold text-gray-300 hover:text-orange-400 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-orange-500 after:rounded-full after:transition-all hover:after:w-full"
            >
              <LayoutDashboard size={15} /> Admin
            </Link>
          )}
        </nav>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {/* Cart - only on shop page */}
          {isShopPage && (
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative p-2 text-gray-400 hover:text-orange-400 hover:bg-white/10 rounded-xl transition-all"
            >
              <ShoppingCart size={17} />
              {cart.totalQty > 0 && (
                <span className="absolute top-1 right-1 bg-orange-500 text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center leading-none">
                  {cart.totalQty > 9 ? "9+" : cart.totalQty}
                </span>
              )}
            </Link>
          )}

          {/* Profile / Sign In / Guest - only on shop page */}
          {isShopPage &&
            (user ? (
              <div className="relative ml-0.5">
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Profile menu"
                  className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-md shadow-orange-500/30 hover:scale-105 transition-transform"
                >
                  {user.fullName?.[0]?.toUpperCase() ?? "?"}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 ml-0.5">
                {/* Customer name or Guest indicator */}
                {guestId && (
                  <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-white/10 rounded-lg border border-white/20">
                    <UserCheck size={12} className="text-orange-400" />
                    <span className="text-xs text-orange-300 font-medium">
                      {customerName || "Guest"}
                    </span>
                  </div>
                )}
                <Link
                  href="/login"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm shadow-orange-500/30 whitespace-nowrap"
                >
                  Sign In
                </Link>
              </div>
            ))}

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            className="md:hidden p-1.5 text-gray-300 hover:text-orange-400 ml-0.5 transition-colors"
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
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="bg-gray-900 border-t border-white/10 px-4 sm:px-6 py-2 shadow-xl">
          {HOME_NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center text-sm font-semibold text-gray-300 hover:text-orange-400 py-3 border-b border-white/5 last:border-0 transition-colors"
            >
              {label}
            </Link>
          ))}
          {isAdmin() && (
            <Link
              href="/admin/dashboard"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-orange-400 py-3 border-b border-white/5 transition-colors"
            >
              <LayoutDashboard size={14} /> Admin
            </Link>
          )}
          {isShopPage && (
            <>
              {/* Cart link */}
              <Link
                href="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-orange-400 py-3 border-b border-white/5 transition-colors"
              >
                <ShoppingCart size={14} />
                Cart
                {cart.totalQty > 0 && (
                  <span className="ml-auto bg-orange-500 text-white text-[10px] font-bold rounded-full px-2 py-0.5">
                    {cart.totalQty > 9 ? "9+" : cart.totalQty}
                  </span>
                )}
              </Link>
              {user ? (
                <>
                  <div className="py-3 border-b border-white/5">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-semibold text-white">
                      {user.fullName}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleSignOut();
                    }}
                    className="flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-300 py-3 w-full transition-colors"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  {guestId && (
                    <div className="flex items-center gap-2 py-3 border-b border-white/5">
                      <UserCheck size={14} className="text-orange-400" />
                      <span className="text-sm text-orange-300 font-medium">
                        {customerName
                          ? `Hi, ${customerName}`
                          : "Browsing as Guest"}
                      </span>
                    </div>
                  )}
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center text-sm font-semibold text-orange-400 py-3"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
