"use client";

import { useAuthStore } from "@/store/auth.store";

interface AffiliateTopBarProps {
  title: string;
  subtitle?: string;
}

export const AffiliateTopBar = ({ title, subtitle }: AffiliateTopBarProps) => {
  const { user } = useAuthStore();
  const initial = user?.fullName?.[0]?.toUpperCase() ?? "A";

  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-500 text-sm mt-0.5">{subtitle}</p>}
      </div>
      <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm shadow-orange-200">
        {initial}
      </div>
    </header>
  );
};
