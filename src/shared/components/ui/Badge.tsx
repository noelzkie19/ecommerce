import { cn } from "@/shared/utils/cn";

const colors = {
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
  red: "bg-red-100 text-red-700",
  gray: "bg-gray-100 text-gray-600",
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
};

const dotColors: Record<keyof typeof colors, string> = {
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
  gray: "bg-gray-400",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
};

type BadgeColor = keyof typeof colors;

interface BadgeProps {
  readonly label: string;
  readonly color?: BadgeColor;
  readonly showDot?: boolean;
}

export const Badge = ({
  label,
  color = "gray",
  showDot = false,
}: BadgeProps) => (
  <span
    className={cn(
      "px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5",
      colors[color],
    )}
  >
    {showDot && (
      <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[color])} />
    )}
    {label}
  </span>
);

// Predefined status badges for common statuses
export const StatusBadge = {
  Active: (props?: Partial<BadgeProps>) => (
    <Badge label="Active" color="emerald" showDot {...props} />
  ),
  Pending: (props?: Partial<BadgeProps>) => (
    <Badge label="Pending" color="amber" showDot {...props} />
  ),
  Suspended: (props?: Partial<BadgeProps>) => (
    <Badge label="Suspended" color="red" showDot {...props} />
  ),
  Approved: (props?: Partial<BadgeProps>) => (
    <Badge label="Approved" color="green" showDot {...props} />
  ),
  Rejected: (props?: Partial<BadgeProps>) => (
    <Badge label="Rejected" color="red" showDot {...props} />
  ),
};
