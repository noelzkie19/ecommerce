import { cn } from "@/shared/utils/cn";
import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "outline" | "purple";
}

export const Card = ({
  children,
  className,
  variant = "default",
  ...props
}: CardProps) => (
  <div
    className={cn(
      "rounded-xl shadow-sm overflow-hidden",
      variant === "default" && "bg-white border border-gray-100",
      variant === "outline" && "bg-white border border-gray-200",
      variant === "purple" && "bg-purple-50 border border-purple-100",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  title?: string;
}

export const CardHeader = ({
  children,
  title,
  className,
  ...props
}: CardHeaderProps) => (
  <div
    className={cn(
      "px-6 py-4 border-b border-gray-100 bg-gray-50/70",
      className,
    )}
    {...props}
  >
    {title ? (
      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
        {title}
      </h3>
    ) : (
      children
    )}
  </div>
);

export const CardContent = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6", className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "px-6 py-4 border-t border-gray-100 bg-gray-50/70",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
