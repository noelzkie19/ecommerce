import { apiClient } from "./client";
import type { CommunityLink } from "@/types/community.types";

export const communityPublicApi = {
  getActiveLinks: () =>
    apiClient.get<CommunityLink[]>("/api/community-links?isActive=true"),
};
