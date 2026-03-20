/**
 * Image Library API Client
 *
 * Axios client for Image Library admin endpoints
 */

import { apiClient } from "./client";
import type { ImageLibrary } from "@/types/image-library.types";

interface GetAllParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  isActive?: boolean;
}

interface GetAllResponse {
  success: boolean;
  data: ImageLibrary[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export const imageLibraryApi = {
  getAll: async (params?: GetAllParams): Promise<GetAllResponse> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.category) searchParams.set("category", params.category);
    if (params?.search) searchParams.set("search", params.search);
    if (params?.isActive !== undefined)
      searchParams.set("isActive", String(params.isActive));
    const query = searchParams.toString();
    const url = query ? `/api/admin?${query}` : "/api/admin";
    const response = await apiClient.get<GetAllResponse>(url);
    return response.data;
  },
  getById: async (id: string): Promise<ImageLibrary> => {
    const response = await apiClient.get<{
      success: boolean;
      data: ImageLibrary;
    }>(`/api/admin/${id}`);
    return response.data.data;
  },
  create: async (data: Partial<ImageLibrary>): Promise<ImageLibrary> => {
    const response = await apiClient.post<{
      success: boolean;
      data: ImageLibrary;
    }>("/api/admin", data);
    return response.data.data;
  },
  update: async (
    id: string,
    data: Partial<ImageLibrary>,
  ): Promise<ImageLibrary> => {
    const response = await apiClient.patch<{
      success: boolean;
      data: ImageLibrary;
    }>(`/api/admin/${id}`, data);
    return response.data.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/admin/${id}`);
  },
};
