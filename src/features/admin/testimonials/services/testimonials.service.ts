import { testimonialApi } from "@/infrastructure/api/testimonials.api";
import type {
  TestimonialResponse,
  TestimonialStatus,
} from "@/types/testimonial.types";

export const testimonialsService = {
  async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: TestimonialStatus;
  }): Promise<TestimonialResponse> {
    const { data } = await testimonialApi.getAll(params);
    return {
      testimonials: (data as any).data?.testimonials ?? [],
      stats: (data as any).data?.stats ?? {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        averageRating: 0,
      },
      meta: (data as any).data?.meta ?? {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    };
  },

  async approve(id: string): Promise<void> {
    await testimonialApi.approve(id);
  },

  async reject(id: string): Promise<void> {
    await testimonialApi.reject(id);
  },

  async delete(id: string): Promise<void> {
    await testimonialApi.delete(id);
  },
};
