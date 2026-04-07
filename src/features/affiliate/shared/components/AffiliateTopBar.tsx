"use client";

import { useAuthStore } from "@/store/auth.store";

interface AffiliateTopBarProps {
  title: string;
  subtitle?: string;
  showDate?: boolean;
}

export const AffiliateTopBar = ({
  title,
  subtitle,
  showDate,
}: AffiliateTopBarProps) => {
  const { user } = useAuthStore();
  const initial = user?.fullName?.[0]?.toUpperCase() ?? "A";

  // Format current date as "Day N" or just date
  const today = new Date();
  const dayOfYear = getDayOfYear(today);

  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-500 text-sm mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {showDate && (
          <span className="text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
            Day {dayOfYear}
          </span>
        )}
        <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm shadow-orange-200">
          {initial}
        </div>
      </div>
    </header>
  );
};

// Helper function to get day of year
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}
