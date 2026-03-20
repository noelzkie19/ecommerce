"use client";
import { useState, useEffect, useCallback } from "react";
import {
  ImageLibrary,
  ImageLibraryResponse,
} from "@/types/image-library.types";
import { imageLibraryService } from "../services/image-library.service";

interface UseImageLibraryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  isActive?: boolean;
}

export const useImageLibrary = (params: UseImageLibraryParams = {}) => {
  const [images, setImages] = useState<ImageLibrary[]>([]);
  const [meta, setMeta] = useState<ImageLibraryResponse["meta"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await imageLibraryService.getAll({
        page: params.page,
        limit: params.limit,
        category: params.category,
        search: params.search,
        isActive: params.isActive,
      });
      setImages(res.data);
      setMeta(res.meta);
    } catch {
      setError("Failed to load images");
    } finally {
      setIsLoading(false);
    }
  }, [
    params.page,
    params.limit,
    params.category,
    params.search,
    params.isActive,
  ]);

  useEffect(() => {
    fetch();
  }, [fetch]);
  return { images, meta, isLoading, error, refetch: fetch };
};
