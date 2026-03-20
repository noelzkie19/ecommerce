import { apiClient } from "./client";
import type { Course } from "@/types/course.types";

export const coursesPublicApi = {
  getActiveCourses: () => apiClient.get<Course[]>("/api/courses?isActive=true"),
};
