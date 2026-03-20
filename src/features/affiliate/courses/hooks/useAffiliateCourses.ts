"use client";
import { useState, useEffect } from "react";
import { affiliateCoursesService } from "../services/affiliate-courses.service";
import { Course } from "@/types/course.types";

interface UseAffiliateCoursesResult {
  courses: Course[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useAffiliateCourses(): UseAffiliateCoursesResult {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await affiliateCoursesService.getActiveCourses();
      setCourses(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch courses");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchCourses();
  }, []);

  return {
    courses,
    isLoading,
    error,
    refetch: () => {
      fetchCourses();
    },
  };
}
