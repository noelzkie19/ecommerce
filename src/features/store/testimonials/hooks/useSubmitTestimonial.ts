import { useState } from "react";
import type { SubmitTestimonialPayload } from "@/types/testimonial.types";
import { testimonialApi } from "@/infrastructure/api/testimonials.api";

export const useSubmitTestimonial = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (payload: SubmitTestimonialPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      await testimonialApi.submit(payload);
      setSuccess(true);
      onSuccess?.();
    } catch {
      setError("Failed to submit testimonial. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading, error, success };
};
