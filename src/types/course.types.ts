/**
 * Course Types
 *
 * Types for the Courses module
 */

export interface Course {
  id: string;
  title: string;
  description: string | null;
  youtubeUrl: string;
  youtubeVideoId: string;
  thumbnailUrl: string | null;
  duration: number | null;
  formattedDuration: string | null;
  category: string | null;
  isPremium: boolean;
  displayOrder: number;
  isActive: boolean;
  viewsCount: number;
  embedUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CoursesResponse {
  data: Course[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CourseFilters {
  category?: string;
  search?: string;
  isPremium?: boolean;
  isActive?: boolean;
}

export const COURSE_CATEGORIES = [
  "Marketing",
  "Sales",
  "Product",
  "Technology",
  "Business",
  "Personal Development",
  "Other",
];
