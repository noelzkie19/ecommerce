import { cn } from "@/shared/utils/cn";
import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, leftIcon, rightIcon, className, ...props }, ref) => {
    let paddingClass = "px-4";
    if (leftIcon) {
      paddingClass = "pl-10 pr-4";
    } else if (rightIcon) {
      paddingClass = "pl-4 pr-10";
    }

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full border border-gray-200 rounded-xl py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 bg-white transition-colors",
              paddingClass,
              error && "border-red-400 focus:ring-red-400",
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 flex items-center">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";
