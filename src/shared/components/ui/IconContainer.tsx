import { cn } from "@/shared/utils/cn";
import type { LucideIcon } from "lucide-react";
import type { HTMLAttributes } from "react";

interface IconContainerProps extends HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  variant?: "purple" | "green" | "yellow" | "red" | "blue" | "gray";
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "w-8 h-8",
  md: "w-9 h-9",
  lg: "w-10 h-10",
};

const iconSizes = {
  sm: "w-4 h-4",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const variants = {
  purple: "bg-purple-50 text-purple-500",
  green: "bg-green-50 text-green-600",
  yellow: "bg-yellow-50 text-yellow-600",
  red: "bg-red-50 text-red-500",
  blue: "bg-blue-50 text-blue-600",
  gray: "bg-gray-50 text-gray-500",
};

export const IconContainer = ({
  icon: Icon,
  variant = "purple",
  size = "md",
  className,
  ...props
}: IconContainerProps) => (
  <div
    className={cn(
      "rounded-lg flex items-center justify-center shrink-0",
      sizes[size],
      variants[variant],
      className,
    )}
    {...props}
  >
    <Icon className={iconSizes[size]} />
  </div>
);
