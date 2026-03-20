/**
 * Image Library Types
 *
 * Types for the Image Library module
 */

export type ImageLibraryCategory =
  | "banners"
  | "gallery"
  | "testimonials"
  | "partners";

export interface ImageLibrary {
  id: string;
  title: string;
  category: ImageLibraryCategory;
  thumbnailUrl: string | null;
  imageUrl: string;
  description: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ImageLibraryResponse {
  data: ImageLibrary[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const IMAGE_LIBRARY_CATEGORIES: ImageLibraryCategory[] = [
  "banners",
  "gallery",
  "testimonials",
  "partners",
];
