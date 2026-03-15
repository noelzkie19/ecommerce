"use client";
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
  DollarSign,
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
    icon: DollarSign,
  },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <aside className="fixed left-0 top-0 h-full w-52 bg-gray-900 text-white flex flex-col z-40">
      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
            N
          </div>
          <div>
            <p className="font-bold text-white text-sm leading-tight">
              Triad Market
            </p>
            <p className="text-gray-400 text-xs">Admin Panel</p>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white text-xs"
        >
          <ArrowLeft className="w-3 h-3" /> Back to Store
        </Link>
      </div>

      {/* Nav */}
      <div className="px-3 pt-4 pb-1">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest px-3 mb-2">
          Main Menu
        </p>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={[
              "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition group",
              pathname === href
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white",
            ].join(" ")}
          >
            <span className="flex items-center gap-3">
              <Icon className="w-4 h-4" />
              {label}
            </span>
            {pathname === href && (
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            )}
          </Link>
        ))}
      </nav>

      {/* User + Sign Out */}
      <div className="p-4 border-t border-gray-700 space-y-3">
        {user && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
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
          onClick={() =>
            authService.logout().then(() => {
              globalThis.location.href = "/login";
            })
          }
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm w-full transition"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
};
