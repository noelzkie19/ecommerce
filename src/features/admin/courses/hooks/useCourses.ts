"use client";

import { useState, useEffect, useCallback } from "react";
import { Course, CoursesResponse } from "@/types/course.types";
import { coursesService } from "../services/courses.service";

interface UseCoursesParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  isPremium?: boolean;
  isActive?: boolean;
}

export const useCourses = (params: UseCoursesParams = {}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [meta, setMeta] = useState<CoursesResponse["meta"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await coursesService.getAll({
        page: params.page,
        limit: params.limit,
        category: params.category,
        search: params.search,
        isPremium: params.isPremium,
        isActive: params.isActive,
      });
      setCourses(res.data);
      setMeta(res.meta);
    } catch {
      setError("Failed to load courses");
    } finally {
      setIsLoading(false);
    }
  }, [
    params.page,
    params.limit,
    params.category,
    params.search,
    params.isPremium,
    params.isActive,
  ]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { courses, meta, isLoading, error, refetch: fetch };
};
