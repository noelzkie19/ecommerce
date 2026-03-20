import { communityPublicApi } from "@/infrastructure/api/community-public.api";
import { CommunityLink } from "@/types/community.types";

export const affiliateCommunityService = {
  async getActiveLinks(): Promise<CommunityLink[]> {
    const { data } = await communityPublicApi.getActiveLinks();
    return (data as any).data ?? data;
  },
};
