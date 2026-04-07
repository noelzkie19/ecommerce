/**
 * Courses Service
 *
 * Service layer for Courses admin operations
 */

import { coursesApi } from "@/infrastructure/api/courses.api";
import type { Course, CoursesResponse } from "@/types/course.types";

interface GetAllParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  isPremium?: boolean;
  isActive?: boolean;
}

interface ApiResponse {
  success: boolean;
  data: Record<string, unknown>[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const mapCourse = (raw: Record<string, unknown>): Course => ({
  id: String(raw.id ?? ""),
  title: String(raw.title ?? ""),
  description: raw.description ? String(raw.description) : null,
  youtubeUrl: String(raw.youtubeUrl ?? ""),
  youtubeVideoId: String(raw.youtubeVideoId ?? ""),
  thumbnailUrl: raw.thumbnailUrl ? String(raw.thumbnailUrl) : null,
  category: raw.category ? String(raw.category) : null,
  isPremium: Boolean(raw.isPremium),
  isActive: Boolean(raw.isActive),
  viewsCount: Number(raw.viewsCount) || 0,
  embedUrl: String(raw.embedUrl ?? ""),
  createdAt: String(raw.createdAt ?? ""),
  updatedAt: String(raw.updatedAt ?? ""),
});

const mapResponse = (raw: ApiResponse): CoursesResponse => {
  const records = raw.data ?? [];
  const meta = raw.meta ?? { total: 0, page: 1, limit: 20, totalPages: 0 };
  return {
    data: records.map((r) => mapCourse(r)),
    meta,
  };
};

export const coursesService = {
  getAll: async (params?: GetAllParams): Promise<CoursesResponse> => {
    const response = await coursesApi.getAll(params);
    return mapResponse(response);
  },

  getById: async (id: string): Promise<Course> => {
    const response = await coursesApi.getById(id);
    return response;
  },

  create: async (data: {
    title: string;
    description?: string;
    youtubeUrl: string;
    category?: string;
    isPremium?: boolean;
    isActive?: boolean;
  }): Promise<Course> => {
    const response = await coursesApi.create(data);
    return response;
  },

  update: async (
    id: string,
    data: Partial<{
      title: string;
      description: string | null;
      youtubeUrl: string;
      thumbnailUrl: string | null;
      category: string | null;
      isPremium: boolean;
      isActive: boolean;
    }>,
  ): Promise<Course> => {
    const response = await coursesApi.update(id, data);
    return response;
  },

  delete: async (id: string): Promise<void> => {
    await coursesApi.delete(id);
  },
};