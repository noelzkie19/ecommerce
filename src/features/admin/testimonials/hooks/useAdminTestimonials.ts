import { useState, useEffect, useCallback } from "react";
import { testimonialsService } from "../services/testimonials.service";
import type {
  TestimonialItem,
  TestimonialStats,
  TestimonialMeta,
  TestimonialStatus,
} from "@/types/testimonial.types";

interface UseAdminTestimonialsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: TestimonialStatus;
}

export const useAdminTestimonials = (
  params: UseAdminTestimonialsParams = {},
) => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [stats, setStats] = useState<TestimonialStats | null>(null);
  const [meta, setMeta] = useState<TestimonialMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await testimonialsService.getAll(params);
      setTestimonials(res.testimonials ?? []);
      setStats(res.stats ?? null);
      setMeta(res.meta ?? null);
    } catch {
      setError("Failed to load testimonials");
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  }, [params.page, params.limit, params.search, params.status]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { testimonials, stats, meta, isLoading, error, refetch: fetch };
};
