"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart2,
  MessageSquare,
  Users,
  ArrowLeft,
  LogOut,
  Banknote,
  Link2,
  Video,
  Image,
  Menu,
  X,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/features/auth";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/stocks", label: "Stock / POS", icon: BarChart2 },
  { href: "/admin/affiliates", label: "Affiliates", icon: Users },
  {
    href: "/admin/affiliate-sales",
    label: "Affiliate Sales",
    icon: Banknote,
  },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/community", label: "Community", icon: Link2 },
  { href: "/admin/courses", label: "Courses", icon: Video },
  { href: "/admin/media-library", label: "Media Library", icon: Image },
];

interface SidebarInnerProps {
  pathname: string;
  user: { fullName?: string; email?: string } | null;
  onLinkClick?: () => void;
  onSignOut: () => void;
}

function SidebarInner({
  pathname,
  user,
  onLinkClick,
  onSignOut,
}: SidebarInnerProps) {
  return (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-gray-700/60">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-sm font-bold text-white shadow-sm">
            T
          </div>
          <div>
            <p className="font-bold text-white text-sm leading-tight">
              Triad 365
            </p>
            <p className="text-gray-400 text-xs">Admin Panel</p>
          </div>
        </div>
        <Link
          href="/"
          onClick={onLinkClick}
          className="flex items-center gap-2 text-gray-400 hover:text-orange-400 text-xs transition-colors"
        >
          <ArrowLeft className="w-3 h-3" /> Back to Store
        </Link>
      </div>

      {/* Nav */}
      <div className="px-3 pt-4 pb-1">
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest px-3 mb-2">
          Main Menu
        </p>
      </div>
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onLinkClick}
            className={[
              "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all group",
              pathname === href
                ? "bg-orange-500 text-white font-medium shadow-sm"
                : "text-gray-400 hover:bg-gray-800 hover:text-white",
            ].join(" ")}
          >
            <span className="flex items-center gap-3">
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </span>
            {pathname === href && (
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
            )}
          </Link>
        ))}
      </nav>

      {/* User + Sign Out */}
      <div className="p-4 border-t border-gray-700/60 space-y-3">
        {user && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/30 rounded-full flex items-center justify-center text-sm font-bold text-orange-400 shrink-0">
              {user.fullName?.[0]?.toUpperCase() ?? "N"}
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
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </>
  );
}

export const AdminSidebar = () => {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = () =>
    authService.logout().then(() => {
      globalThis.location.href = "/login";
    });

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-52 bg-gray-900 text-white flex-col z-40">
        <SidebarInner
          pathname={pathname}
          user={user}
          onSignOut={handleSignOut}
        />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white flex items-center justify-between px-4 py-3 border-b border-gray-700/60">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-xs font-bold">
            T
          </div>
          <span className="font-bold text-sm">Triad 365</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile overlay */}
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
        <div className="flex items-center justify-between p-4 border-b border-gray-700/60">
          <span className="font-bold text-sm">Menu</span>
          <button
            onClick={closeMobile}
            className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <SidebarInner
          pathname={pathname}
          user={user}
          onLinkClick={closeMobile}
          onSignOut={handleSignOut}
        />
      </aside>
    </>
  );
};
