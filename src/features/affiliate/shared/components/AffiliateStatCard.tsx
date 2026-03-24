import type { LucideIcon } from "lucide-react";

interface AffiliateStatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

export const AffiliateStatCard = ({
  label,
  value,
  icon: Icon,
}: AffiliateStatCardProps) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
    <div>
      <p className="text-gray-500 text-xs font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
    <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
      <Icon className="w-5 h-5 text-orange-500" />
    </div>
  </div>
);
