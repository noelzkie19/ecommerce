import { apiClient } from "./client";
import type { ImageLibrary } from "@/types/image-library.types";

export const mediaLibraryPublicApi = {
  getAll: (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    isActive?: boolean;
  }) =>
    apiClient.get<{ data: ImageLibrary[]; meta: unknown }>(
      "/api/image-library",
      { params },
    ),
};
