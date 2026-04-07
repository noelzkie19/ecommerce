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

const mapCourse = (raw: Course): Course => ({
  id: raw.id,
  title: raw.title,
  description: raw.description,
  youtubeUrl: raw.youtubeUrl,
  youtubeVideoId: raw.youtubeVideoId,
  thumbnailUrl: raw.thumbnailUrl,
  category: raw.category,
  isPremium: raw.isPremium,
  isActive: raw.isActive,
  viewsCount: raw.viewsCount,
  embedUrl: raw.embedUrl,
  createdAt: raw.createdAt,
  updatedAt: raw.updatedAt,
});

const mapResponse = (raw: GetAllResponse): CoursesResponse => {
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
