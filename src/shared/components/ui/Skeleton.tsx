import { cn } from "@/shared/utils/cn";
import { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({
  variant = "rectangular",
  width,
  height,
  className,
  ...props
}: SkeletonProps) => {
  // Extract default dimensions to avoid nested ternary
  let defaultHeight: number;
  if (variant === "text") {
    defaultHeight = 16;
  } else if (variant === "circular") {
    defaultHeight = 40;
  } else {
    defaultHeight = 48;
  }

  const defaultWidth = variant === "circular" ? 40 : "100%";

  return (
    <div
      className={cn(
        "animate-pulse bg-gray-100",
        variant === "text" && "h-4 rounded",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded-lg",
        className,
      )}
      style={{
        width: width ?? defaultWidth,
        height: height ?? defaultHeight,
      }}
      {...props}
    />
  );
};

export const SkeletonCard = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden",
      className,
    )}
  >
    <div className="h-10 bg-gray-50 animate-pulse" />
    <div className="p-5 space-y-3">
      <Skeleton height={40} />
      <Skeleton height={40} />
      <Skeleton height={40} />
    </div>
  </div>
);

export const SkeletonAvatar = ({ size = 40 }: { size?: number }) => (
  <Skeleton variant="circular" width={size} height={size} />
);
