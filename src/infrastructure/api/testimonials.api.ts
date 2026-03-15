import { apiClient } from "@/infrastructure/api/client";
import type {
  TestimonialItem,
  TestimonialResponse,
  PublicTestimonialsResponse,
  SubmitTestimonialPayload,
  TestimonialStatus,
} from "@/types/testimonial.types";

export const testimonialApi = {
  // ── Public ──────────────────────────────────────────────────────────────────
  getApproved: (params?: { page?: number; limit?: number }) =>
    apiClient.get<PublicTestimonialsResponse>("/api/testimonials", { params }),

  submit: (payload: SubmitTestimonialPayload) =>
    apiClient.post<TestimonialItem>("/api/testimonials", payload),

  // ── Admin ────────────────────────────────────────────────────────────────────
  getAll: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: TestimonialStatus;
  }) =>
    apiClient.get<TestimonialResponse>("/api/testimonials/admin/all", {
      params,
    }),

  approve: (id: string) =>
    apiClient.patch<TestimonialItem>(
      `/api/testimonials/admin/${id}/approve`,
      {},
    ),

  reject: (id: string) =>
    apiClient.patch<TestimonialItem>(
      `/api/testimonials/admin/${id}/reject`,
      {},
    ),

  delete: (id: string) => apiClient.delete(`/api/testimonials/admin/${id}`),
};
