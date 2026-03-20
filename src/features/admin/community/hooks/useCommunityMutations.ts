"use client";

import { useState } from "react";
import { communityService } from "../services/community.service";
import type { CommunityLinkCategory } from "@/types/community.types";

interface UseCommunityMutationsProps {
  onSuccess?: () => void;
}

export const useCommunityMutations = ({
  onSuccess,
}: UseCommunityMutationsProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createLink = async (data: {
    title: string;
    url: string;
    description?: string;
    category?: CommunityLinkCategory;
    icon?: string;
    imageUrl?: string;
    orderIndex?: number;
    isActive?: boolean;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      await communityService.create(data);
      onSuccess?.();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to create link";
      setError(message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const updateLink = async (
    id: string,
    data: Partial<{
      title: string;
      url: string;
      description: string | null;
      category: CommunityLinkCategory;
      icon: string | null;
      imageUrl: string | null;
      orderIndex: number;
      isActive: boolean;
    }>,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      await communityService.update(id, data);
      onSuccess?.();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to update link";
      setError(message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteLink = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await communityService.delete(id);
      onSuccess?.();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to delete link";
      setError(message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createLink,
    updateLink,
    deleteLink,
    isLoading,
    error,
  };
};
