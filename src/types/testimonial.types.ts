export type TestimonialStatus = "pending" | "approved" | "rejected";

export interface TestimonialItem {
  id: string;
  customer_name: string;
  location: string | null;
  rating: number;
  message: string;
  status: TestimonialStatus;
  created_at: string;
  updated_at: string;
}

export interface TestimonialStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  averageRating: number;
}

export interface TestimonialMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TestimonialResponse {
  testimonials: TestimonialItem[];
  stats: TestimonialStats;
  meta: TestimonialMeta;
}

export interface CreateTestimonialPayload {
  customerName: string;
  location?: string | null;
  rating: number;
  message: string;
}

export interface UpdateTestimonialPayload {
  customerName?: string;
  location?: string;
  rating?: number;
  message?: string;
  status?: TestimonialStatus;
}

export interface SubmitTestimonialPayload {
  customerName: string;
  location?: string | null;
  rating: number;
  message: string;
}

export interface PublicTestimonialsResponse {
  data: TestimonialItem[];
  meta: TestimonialMeta;
}
