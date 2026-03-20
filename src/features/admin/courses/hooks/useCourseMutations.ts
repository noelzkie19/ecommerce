"use client";

import { useState } from "react";
import { coursesService } from "../services/courses.service";

interface UseCourseMutationsProps {
  onSuccess?: () => void;
}

export const useCourseMutations = ({
  onSuccess,
}: UseCourseMutationsProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCourse = async (data: {
    title: string;
    description?: string;
    youtubeUrl: string;
    duration?: number;
    category?: string;
    isPremium?: boolean;
    displayOrder?: number;
    isActive?: boolean;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      await coursesService.create(data);
      onSuccess?.();
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Failed to create course";
      setError(message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCourse = async (
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
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      await coursesService.update(id, data);
      onSuccess?.();
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Failed to update course";
      setError(message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCourse = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await coursesService.delete(id);
      onSuccess?.();
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Failed to delete course";
      setError(message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCourse,
    updateCourse,
    deleteCourse,
    isLoading,
    error,
  };
};
