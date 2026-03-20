/**
 * Courses API Client
 *
 * Axios client for Courses admin endpoints
 */

import { apiClient } from "./client";
import type { Course } from "@/types/course.types";

interface GetAllParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  isPremium?: boolean;
  isActive?: boolean;
}

interface GetAllResponse {
  success: boolean;
  data: Course[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface CreateResponse {
  success: boolean;
  data: Course;
}

interface UpdateResponse {
  success: boolean;
  data: Course;
}

export const coursesApi = {
  getAll: async (params?: GetAllParams): Promise<GetAllResponse> => {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.category) searchParams.set("category", params.category);
    if (params?.search) searchParams.set("search", params.search);
    if (params?.isPremium !== undefined) {
      searchParams.set("isPremium", String(params.isPremium));
    }
    if (params?.isActive !== undefined) {
      searchParams.set("isActive", String(params.isActive));
    }

    const query = searchParams.toString();
    const url = query ? `/api/courses/admin?${query}` : "/api/courses/admin";
    const response = await apiClient.get<GetAllResponse>(url);
    return response.data;
  },

  getById: async (id: string): Promise<Course> => {
    const response = await apiClient.get<{ success: boolean; data: Course }>(
      `/api/courses/admin/${id}`,
    );
    return response.data.data;
  },

  create: async (data: Partial<Course>): Promise<Course> => {
    const response = await apiClient.post<CreateResponse>(
      "/api/courses/admin",
      data,
    );
    return response.data.data;
  },

  update: async (id: string, data: Partial<Course>): Promise<Course> => {
    const response = await apiClient.patch<UpdateResponse>(
      `/api/courses/admin/${id}`,
      data,
    );
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/courses/admin/${id}`);
  },
};
