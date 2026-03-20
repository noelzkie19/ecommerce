/**
 * Image Library Service
 *
 * Service layer for Image Library admin operations
 */

import { imageLibraryApi } from "@/infrastructure/api/image-library.api";
import type {
  ImageLibrary,
  ImageLibraryResponse,
} from "@/types/image-library.types";

interface GetAllParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  isActive?: boolean;
}

const mapImage = (raw: Record<string, unknown>): ImageLibrary => ({
  id: raw.id as string,
  title: raw.title as string,
  category: raw.category as ImageLibrary["category"],
  thumbnailUrl: raw.thumbnailUrl as string | null,
  imageUrl: raw.imageUrl as string,
  description: raw.description as string | null,
  displayOrder: raw.displayOrder as number,
  isActive: raw.isActive as boolean,
  createdAt: raw.createdAt as string,
  updatedAt: raw.updatedAt as string,
});

const mapResponse = (raw: Record<string, unknown>): ImageLibraryResponse => {
  const records = (raw.data as unknown[]) ?? [];
  const meta = (raw.meta as Record<string, unknown>) ?? {
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  };
  return {
    data: records.map((r) => mapImage(r as Record<string, unknown>)),
    meta: meta as ImageLibraryResponse["meta"],
  };
};

const getData = <T>(response: { data: unknown }): T => {
  const body =
    (response.data as Record<string, unknown>)?.data ?? response.data;
  return body as T;
};

export const imageLibraryService = {
  getAll: async (params?: GetAllParams): Promise<ImageLibraryResponse> => {
    const response = await imageLibraryApi.getAll(params);
    const data = getData<Record<string, unknown>>(response);
    return mapResponse(data);
  },
  getById: async (id: string): Promise<ImageLibrary> => {
    const response = await imageLibraryApi.getById(id);
    return response;
  },
  create: async (data: Partial<ImageLibrary>): Promise<ImageLibrary> => {
    const response = await imageLibraryApi.create(data);
    return response;
  },
  update: async (
    id: string,
    data: Partial<ImageLibrary>,
  ): Promise<ImageLibrary> => {
    const response = await imageLibraryApi.update(id, data);
    return response;
  },
  delete: async (id: string): Promise<void> => {
    await imageLibraryApi.delete(id);
  },
};
