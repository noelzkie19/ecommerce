/**
 * Community Links API Client
 *
 * Axios client for Community Links admin endpoints
 */

import { apiClient } from "./client";
import type { CommunityLink } from "@/types/community.types";

interface GetAllParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  isActive?: boolean;
}

interface GetAllResponse {
  success: boolean;
  data: CommunityLink[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface CreateResponse {
  success: boolean;
  data: CommunityLink;
}

interface UpdateResponse {
  success: boolean;
  data: CommunityLink;
}

export const communityApi = {
  getAll: async (params?: GetAllParams): Promise<GetAllResponse> => {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.category) searchParams.set("category", params.category);
    if (params?.search) searchParams.set("search", params.search);
    if (params?.isActive !== undefined) {
      searchParams.set("isActive", String(params.isActive));
    }

    const query = searchParams.toString();
    const url = query
      ? `/api/community-links/admin?${query}`
      : "/api/community-links/admin";
    const response = await apiClient.get<GetAllResponse>(url);
    return response.data;
  },

  getById: async (id: string): Promise<CommunityLink> => {
    const response = await apiClient.get<{
      success: boolean;
      data: CommunityLink;
    }>(`/api/community-links/admin/${id}`);
    return response.data.data;
  },

  create: async (data: Partial<CommunityLink>): Promise<CommunityLink> => {
    const response = await apiClient.post<CreateResponse>(
      "/api/community-links/admin",
      data,
    );
    return response.data.data;
  },

  update: async (
    id: string,
    data: Partial<CommunityLink>,
  ): Promise<CommunityLink> => {
    const response = await apiClient.patch<UpdateResponse>(
      `/api/community-links/admin/${id}`,
      data,
    );
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/community-links/admin/${id}`);
  },
};
