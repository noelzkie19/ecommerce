"use client";

import { Loader2, Check, X, Trash2, Star } from "lucide-react";
import type {
  TestimonialItem,
  TestimonialStatus,
} from "@/types/testimonial.types";
import { useAdminTestimonialMutation } from "../hooks/useAdminTestimonialMutation";

interface Props {
  readonly testimonials: TestimonialItem[];
  readonly onSuccess: () => void;
}

const StatusBadge = ({ status }: { readonly status: TestimonialStatus }) => {
  const map: Record<TestimonialStatus, { label: string; className: string }> = {
    approved: {
      label: "Approved",
      className: "bg-emerald-100 text-emerald-600",
    },
    pending: { label: "Pending", className: "bg-yellow-100 text-yellow-600" },
    rejected: { label: "Rejected", className: "bg-red-100 text-red-600" },
  };
  const { label, className } = map[status];
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
};

const StarRating = ({ rating }: { readonly rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
      <Star
        key={star}
        size={13}
        className={
          star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
        }
      />
    ))}
  </div>
);

const TestimonialRow = ({
  item,
  onSuccess,
}: {
  readonly item: TestimonialItem;
  readonly onSuccess: () => void;
}) => {
  const {
    approveTestimonial,
    rejectTestimonial,
    deleteTestimonial,
    isLoading,
  } = useAdminTestimonialMutation(onSuccess);

  return (
    <tr className="hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-sm font-semibold flex-shrink-0">
            {item.customer_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {item.customer_name}
            </p>
            <p className="text-xs text-gray-400">{item.location}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <StarRating rating={item.rating} />
      </td>
      <td className="px-6 py-4 max-w-xs">
        <p className="text-sm text-gray-600 truncate">{item.message}</p>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={item.status} />
      </td>
      <td className="px-6 py-4 text-sm text-gray-400">
        {new Date(item.created_at).toLocaleDateString("en-PH", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-1.5">
          {item.status === "pending" && (
            <>
              <button
                onClick={() => approveTestimonial(item.id)}
                disabled={isLoading}
                title="Approve"
                className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 disabled:opacity-40 transition-colors"
              >
                <Check size={15} />
              </button>
              <button
                onClick={() => rejectTestimonial(item.id)}
                disabled={isLoading}
                title="Reject"
                className="p-1.5 rounded-lg text-yellow-500 hover:bg-yellow-50 disabled:opacity-40 transition-colors"
              >
                <X size={15} />
              </button>
            </>
          )}
          <button
            onClick={() => deleteTestimonial(item.id)}
            disabled={isLoading}
            title="Delete"
            className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 disabled:opacity-40 transition-colors"
          >
            {isLoading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Trash2 size={15} />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default function TestimonialsTable({ testimonials, onSuccess }: Props) {
  if (testimonials.length === 0) {
    return (
      <tr>
        <td
          colSpan={7}
          className="px-6 py-16 text-center text-sm text-gray-400"
        >
          No testimonials found.
        </td>
      </tr>
    );
  }
  return (
    <>
      {testimonials.map((item) => (
        <TestimonialRow key={item.id} item={item} onSuccess={onSuccess} />
      ))}
    </>
  );
}
