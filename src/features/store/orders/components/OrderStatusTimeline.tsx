/**
 * Order Status Timeline Component
 *
 * Visual component showing order progress with status steps.
 */

"use client";

import { Check } from "lucide-react";
import type { OrderStatus } from "@/domain/entities";

interface OrderStatusTimelineProps {
  readonly status: OrderStatus;
}

const STATUS_ORDER: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
];

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-amber-500",
  confirmed: "bg-blue-500",
  processing: "bg-purple-500",
  shipped: "bg-cyan-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
};

const STATUS_TEXT_COLORS: Record<string, string> = {
  current: "text-gray-900",
  completed: "text-gray-600",
  pending: "text-gray-400",
};

const getTextColorClass = (
  isCurrent: boolean,
  isCompleted: boolean,
): string => {
  if (isCurrent) {
    return STATUS_TEXT_COLORS.current;
  }
  if (isCompleted) {
    return STATUS_TEXT_COLORS.completed;
  }
  return STATUS_TEXT_COLORS.pending;
};

export function OrderStatusTimeline({ status }: OrderStatusTimelineProps) {
  const currentIndex = STATUS_ORDER.indexOf(status);
  const isCancelled = status === "cancelled";

  if (isCancelled) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <span className="text-red-600 font-semibold text-sm">
          Order Cancelled
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2">
      {STATUS_ORDER.map((step, index) => {
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;
        const colorClass = STATUS_COLORS[step];
        const textColorClass = getTextColorClass(isCurrent, isCompleted);

        return (
          <div key={step} className="flex items-center flex-shrink-0">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${isCompleted ? colorClass : "bg-gray-200"}
                  ${isCurrent ? "ring-4 ring-opacity-30 ring-gray-300" : ""}
                `}
              >
                {isCompleted ? (
                  <Check size={12} className="text-white" strokeWidth={3} />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                )}
              </div>
              <span
                className={`
                  text-[10px] font-medium mt-1 whitespace-nowrap
                  ${textColorClass}
                `}
              >
                {STATUS_LABELS[step]}
              </span>
            </div>

            {/* Connector line */}
            {index < STATUS_ORDER.length - 1 && (
              <div
                className={`
                  h-0.5 w-4 sm:w-8 mx-0.5 mb-4
                  transition-colors duration-300
                  ${index < currentIndex ? colorClass : "bg-gray-200"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
