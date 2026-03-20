import { coursesPublicApi } from "@/infrastructure/api/courses-public.api";
import { Course } from "@/types/course.types";

export const affiliateCoursesService = {
  async getActiveCourses(): Promise<Course[]> {
    const { data } = await coursesPublicApi.getActiveCourses();
    return (data as any).data ?? data;
  },
};
