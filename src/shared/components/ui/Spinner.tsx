import { cn } from "@/shared/utils/cn";
import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export const Spinner = ({ size = "md", className }: SpinnerProps) => (
  <Loader2 className={cn("animate-spin", sizes[size], className)} />
);

export const LoadingOverlay = ({
  message = "Loading...",
}: {
  message?: string;
}) => (
  <div className="flex flex-col items-center justify-center py-12 gap-3">
    <Spinner size="lg" className="text-purple-500" />
    <p className="text-sm text-gray-500">{message}</p>
  </div>
);
