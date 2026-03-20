import { testimonialApi } from "@/infrastructure/api/testimonials.api";
import type {
  TestimonialResponse,
  TestimonialStatus,
} from "@/types/testimonial.types";

const getData = <T>(response: { data: unknown }): T => {
  const body =
    (response.data as Record<string, unknown>)?.data ?? response.data;
  return body as T;
};

export const testimonialsService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: TestimonialStatus;
  }): Promise<TestimonialResponse> => {
    const response = await testimonialApi.getAll(params);
    const data = getData<{
      testimonials?: unknown[];
      stats?: {
        total: number;
        pending: number;
        approved: number;
        rejected: number;
        averageRating: number;
      };
      meta?: { total: number; page: number; limit: number; totalPages: number };
    }>(response);
    return {
      testimonials:
        (data.testimonials as TestimonialResponse["testimonials"]) ?? [],
      stats: data.stats ?? {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        averageRating: 0,
      },
      meta: data.meta ?? {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    };
  },

  approve: async (id: string): Promise<void> => {
    await testimonialApi.approve(id);
  },

  reject: async (id: string): Promise<void> => {
    await testimonialApi.reject(id);
  },

  delete: async (id: string): Promise<void> => {
    await testimonialApi.delete(id);
  },
};
