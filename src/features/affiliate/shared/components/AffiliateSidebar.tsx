"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Link2,
  Banknote,
  Wallet,
  CreditCard,
  BookOpen,
  Users,
  LogOut,
  Menu,
  X,
  Image,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/features/auth";

const NAV_LINKS = [
  { href: "/affiliate/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/affiliate/profile", label: "Profile", icon: User },
  { href: "/affiliate/referral-link", label: "My Referral Link", icon: Link2 },
  { href: "/affiliate/courses", label: "Courses", icon: BookOpen },
  { href: "/affiliate/community", label: "Community", icon: Users },
  { href: "/affiliate/media-library", label: "Media Library", icon: Image },
  {
    href: "/affiliate/commission-sales",
    label: "Commission Sales",
    icon: Banknote,
  },
  {
    href: "/affiliate/commission-balance",
    label: "Commission Balance",
    icon: Wallet,
  },
  { href: "/affiliate/cashout", label: "Cashout (Maya)", icon: CreditCard },
];

interface SidebarContentProps {
  pathname: string;
  initial: string;
  user: { fullName?: string; email?: string } | null;
  onLinkClick: () => void;
  onSignOut: () => void;
}

const SidebarContent = ({
  pathname,
  initial,
  user,
  onLinkClick,
  onSignOut,
}: SidebarContentProps) => (
  <>
    {/* Logo */}
    <div className="p-5 border-b border-white/10">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 shadow-sm">
          {initial}
        </div>
        <div>
          <p className="font-bold text-white text-sm leading-tight">
            AffiliateHub
          </p>
          <p className="text-orange-400 text-xs">Affiliate Portal</p>
        </div>
      </div>
    </div>

    {/* Nav */}
    <nav className="flex-1 px-3 pt-4 space-y-0.5 overflow-y-auto">
      {NAV_LINKS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onLinkClick}
            className={[
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
              active
                ? "bg-orange-500 text-white font-medium shadow-sm"
                : "text-gray-400 hover:bg-white/5 hover:text-white",
            ].join(" ")}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>

    {/* User + Sign Out */}
    <div className="p-4 border-t border-white/10 space-y-3">
      {user && (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/30 rounded-full flex items-center justify-center text-sm font-bold text-orange-400 shrink-0">
            {initial}
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-xs font-medium truncate">
              {user.fullName}
            </p>
            <p className="text-gray-400 text-xs truncate">{user.email}</p>
          </div>
        </div>
      )}
      <button
        onClick={onSignOut}
        className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm w-full transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </div>
  </>
);

export const AffiliateSidebar = () => {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initial = user?.fullName?.[0]?.toUpperCase() ?? "A";

  const handleSignOut = () =>
    authService.logout().then(() => {
      globalThis.location.href = "/login";
    });

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-56 bg-gray-900 text-white flex-col z-40">
        <SidebarContent
          pathname={pathname}
          initial={initial}
          user={user}
          onLinkClick={closeMobile}
          onSignOut={handleSignOut}
        />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-xs font-bold">
            {initial}
          </div>
          <span className="font-bold text-sm">AffiliateHub</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="md:hidden fixed inset-0 z-50 bg-black/60 cursor-default"
          onClick={closeMobile}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={[
          "md:hidden fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex flex-col z-50 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        aria-hidden={!mobileOpen}
      >
        {/* Close button */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <span className="font-bold text-sm">Menu</span>
          <button
            onClick={closeMobile}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <SidebarContent
          pathname={pathname}
          initial={initial}
          user={user}
          onLinkClick={closeMobile}
          onSignOut={handleSignOut}
        />
      </aside>
    </>
  );
};
