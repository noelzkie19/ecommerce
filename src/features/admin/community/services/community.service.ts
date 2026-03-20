/**
 * Community Links Service
 *
 * Service layer for Community Links admin operations
 */

import { communityApi } from "@/infrastructure/api/community.api";
import type {
  CommunityLink,
  CommunityLinksResponse,
} from "@/types/community.types";

interface GetAllParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  isActive?: boolean;
}

const mapCommunityLink = (raw: Record<string, unknown>): CommunityLink => ({
  id: raw.id as string,
  title: raw.title as string,
  url: raw.url as string,
  description: raw.description as string | null,
  category: raw.category as CommunityLink["category"],
  icon: raw.icon as string | null,
  imageUrl: raw.imageUrl as string | null,
  orderIndex: raw.orderIndex as number,
  isActive: raw.isActive as boolean,
  createdAt: raw.createdAt as string,
  updatedAt: raw.updatedAt as string,
});

const mapResponse = (raw: Record<string, unknown>): CommunityLinksResponse => {
  const records = (raw.data as unknown[]) ?? [];
  const meta = (raw.meta as Record<string, unknown>) ?? {
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  };
  return {
    data: records.map((r) => mapCommunityLink(r as Record<string, unknown>)),
    meta: meta as CommunityLinksResponse["meta"],
  };
};

const getData = <T>(response: { data: unknown }): T => {
  const body =
    (response.data as Record<string, unknown>)?.data ?? response.data;
  return body as T;
};

export const communityService = {
  getAll: async (params?: GetAllParams): Promise<CommunityLinksResponse> => {
    const response = await communityApi.getAll(params);
    const data = getData<Record<string, unknown>>(response);
    return mapResponse(data);
  },

  getById: async (id: string): Promise<CommunityLink> => {
    const response = await communityApi.getById(id);
    return response;
  },

  create: async (data: {
    title: string;
    url: string;
    description?: string;
    category?: CommunityLink["category"];
    icon?: string;
    imageUrl?: string;
    orderIndex?: number;
    isActive?: boolean;
  }): Promise<CommunityLink> => {
    const response = await communityApi.create(data);
    return response;
  },

  update: async (
    id: string,
    data: Partial<{
      title: string;
      url: string;
      description: string | null;
      category: CommunityLink["category"];
      icon: string | null;
      imageUrl: string | null;
      orderIndex: number;
      isActive: boolean;
    }>,
  ): Promise<CommunityLink> => {
    const response = await communityApi.update(id, data);
    return response;
  },

  delete: async (id: string): Promise<void> => {
    await communityApi.delete(id);
  },
};
