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

const mapCourse = (raw: Record<string, unknown>): Course => ({
  id: raw.id as string,
  title: raw.title as string,
  description: raw.description as string | null,
  youtubeUrl: raw.youtubeUrl as string,
  youtubeVideoId: raw.youtubeVideoId as string,
  thumbnailUrl: raw.thumbnailUrl as string | null,
  duration: raw.duration as number | null,
  formattedDuration: raw.formattedDuration as string | null,
  category: raw.category as string | null,
  isPremium: raw.isPremium as boolean,
  displayOrder: raw.displayOrder as number,
  isActive: raw.isActive as boolean,
  viewsCount: raw.viewsCount as number,
  embedUrl: raw.embedUrl as string,
  createdAt: raw.createdAt as string,
  updatedAt: raw.updatedAt as string,
});

const mapResponse = (raw: Record<string, unknown>): CoursesResponse => {
  const records = (raw.data as unknown[]) ?? [];
  const meta = (raw.meta as Record<string, unknown>) ?? {
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  };
  return {
    data: records.map((r) => mapCourse(r as Record<string, unknown>)),
    meta: meta as CoursesResponse["meta"],
  };
};

const getData = <T>(response: { data: unknown }): T => {
  const body =
    (response.data as Record<string, unknown>)?.data ?? response.data;
  return body as T;
};

export const coursesService = {
  getAll: async (params?: GetAllParams): Promise<CoursesResponse> => {
    const response = await coursesApi.getAll(params);
    const data = getData<Record<string, unknown>>(response);
    return mapResponse(data);
  },

  getById: async (id: string): Promise<Course> => {
    const response = await coursesApi.getById(id);
    return response;
  },

  create: async (data: {
    title: string;
    description?: string;
    youtubeUrl: string;
    duration?: number;
    category?: string;
    isPremium?: boolean;
    displayOrder?: number;
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
      duration: number | null;
      category: string | null;
      isPremium: boolean;
      displayOrder: number;
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
