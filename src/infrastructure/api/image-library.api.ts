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
    const url = query
      ? `/api/admin/image-library?${query}`
      : "/api/admin/image-library";
    const response = await apiClient.get<GetAllResponse>(url);
    return response.data;
  },
  getById: async (id: string): Promise<ImageLibrary> => {
    const response = await apiClient.get<{
      success: boolean;
      data: ImageLibrary;
    }>(`/api/admin/image-library/${id}`);
    return response.data.data;
  },
  create: async (data: Partial<ImageLibrary>): Promise<ImageLibrary> => {
    const response = await apiClient.post<{
      success: boolean;
      data: ImageLibrary;
    }>("/api/admin/image-library", data);
    return response.data.data;
  },
  update: async (
    id: string,
    data: Partial<ImageLibrary>,
  ): Promise<ImageLibrary> => {
    const response = await apiClient.patch<{
      success: boolean;
      data: ImageLibrary;
    }>(`/api/admin/image-library/${id}`, data);
    return response.data.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/admin/image-library/${id}`);
  },

  upload: async (
    file: File,
    onProgress?: (progress: number) => void,
  ): Promise<{ imageUrl: string; thumbnailUrl: string }> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<{
      success: boolean;
      data?: { imageUrl: string; thumbnailUrl: string };
      imageUrl?: string;
      thumbnailUrl?: string;
    }>("/api/admin/image-library/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          onProgress(progress);
        }
      },
    });

    // Handle different response structures
    const responseData = response.data;

    // Case 1: { success: true, data: { imageUrl, thumbnailUrl } }
    if (responseData.data) {
      return responseData.data;
    }

    // Case 2: { success: true, imageUrl, thumbnailUrl } (direct properties)
    if (responseData.imageUrl) {
      return {
        imageUrl: responseData.imageUrl,
        thumbnailUrl: responseData.thumbnailUrl ?? responseData.imageUrl,
      };
    }

    // Case 3: Server returned just { imageUrl, thumbnailUrl } without success wrapper
    // In axios, this would be accessible via response.data directly
    throw new Error("Invalid response format from server");
  },
};
