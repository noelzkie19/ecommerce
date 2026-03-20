import { cn } from "@/shared/utils/cn";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "purple";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-900 hover:bg-gray-800 text-white",
  ghost: "border border-gray-200 hover:bg-gray-50 text-gray-700 bg-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  purple: "bg-purple-600 hover:bg-purple-700 text-white",
};
const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  className,
  children,
  disabled,
  ...props
}: Readonly<Props>) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "w-full rounded-xl font-medium transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
