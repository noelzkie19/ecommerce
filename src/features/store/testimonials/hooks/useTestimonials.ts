import { useState, useEffect, useCallback } from "react";
import type {
  TestimonialItem,
  TestimonialMeta,
} from "@/types/testimonial.types";
import { testimonialApi } from "@/infrastructure/api/testimonials.api";

const unwrap = (res: any) => res.data?.data ?? res.data;

interface UsePublicTestimonialsParams {
  page?: number;
  limit?: number;
}

export const useTestimonials = (params: UsePublicTestimonialsParams = {}) => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [meta, setMeta] = useState<TestimonialMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await testimonialApi.getApproved({
        page: params.page,
        limit: params.limit,
      });
      const body = unwrap(res);
      setTestimonials(body?.data ?? []);
      setMeta(body?.meta ?? null);
    } catch {
      setError("Failed to load testimonials");
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  }, [params.page, params.limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { testimonials, meta, isLoading, error, refetch: fetch };
};
