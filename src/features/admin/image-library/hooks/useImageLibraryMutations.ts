"use client";
import { useState } from "react";
import { imageLibraryService } from "../services/image-library.service";

interface UseImageLibraryMutationsProps {
  onSuccess?: () => void;
}

export const useImageLibraryMutations = ({
  onSuccess,
}: UseImageLibraryMutationsProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createImage = async (
    data: Parameters<typeof imageLibraryService.create>[0],
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      await imageLibraryService.create(data);
      onSuccess?.();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to create";
      setError(msg);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const updateImage = async (
    id: string,
    data: Parameters<typeof imageLibraryService.update>[1],
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      await imageLibraryService.update(id, data);
      onSuccess?.();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to update";
      setError(msg);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteImage = async (id: string) => {
    setIsDeleting(true);
    setError(null);
    try {
      await imageLibraryService.delete(id);
      onSuccess?.();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to delete";
      setError(msg);
      throw e;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    createImage,
    updateImage,
    deleteImage,
    isLoading,
    isDeleting,
    error,
  };
};
