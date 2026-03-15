"use client";

import { useState } from "react";
import { X, Send, Loader2, Star } from "lucide-react";
import { useSubmitTestimonial } from "../hooks/useSubmitTestimonial";

interface Props {
  readonly onClose: () => void;
}

export default function WriteTestimonialModal({ onClose }: Props) {
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [product, setProduct] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const { submit, isLoading, error, success } = useSubmitTestimonial();

  const handleSubmit = async () => {
    if (!customerName.trim() || !message.trim()) return;
    await submit({
      customerName: customerName.trim(),
      rating,
      message: message.trim(),
      location: location.trim() || null,
    });
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-8 text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
              <Send size={20} className="text-emerald-500" />
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Thank you!</h2>
          <p className="text-sm text-gray-500">
            Your testimonial has been submitted and is pending review.
          </p>
          <button
            onClick={onClose}
            className="mt-2 w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Write a Testimonial</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Rating — uses aria-label since it's a group of buttons, not a single input */}
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </legend>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  aria-label={`Rate ${star} out of 5`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={28}
                    className={
                      star <= (hovered || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-200"
                    }
                  />
                </button>
              ))}
            </div>
          </fieldset>

          {/* Name */}
          <div>
            <label
              htmlFor="testimonial-name"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Your Name <span className="text-red-400">*</span>
            </label>
            <input
              id="testimonial-name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Juan dela Cruz"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Product */}
          <div>
            <label
              htmlFor="testimonial-product"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Product{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              id="testimonial-product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="e.g. Viramed"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="testimonial-location"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Location{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              id="testimonial-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Manila"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="testimonial-message"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Your Experience <span className="text-red-400">*</span>
            </label>
            <textarea
              id="testimonial-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your experience..."
              rows={4}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !customerName.trim() || !message.trim()}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Send size={15} />
            )}
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
