import { useState } from "react";
import { testimonialsService } from "../services/testimonials.service";

export const useAdminTestimonialMutation = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (fn: () => Promise<void>) => {
    setIsLoading(true);
    setError(null);
    try {
      await fn();
      onSuccess?.();
    } catch {
      setError("Action failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const approveTestimonial = (id: string) =>
    run(() => testimonialsService.approve(id));

  const rejectTestimonial = (id: string) =>
    run(() => testimonialsService.reject(id));

  const deleteTestimonial = (id: string) =>
    run(() => testimonialsService.delete(id));

  return {
    approveTestimonial,
    rejectTestimonial,
    deleteTestimonial,
    isLoading,
    error,
  };
};
