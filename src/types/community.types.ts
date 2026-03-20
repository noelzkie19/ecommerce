/**
 * Community Link Types
 *
 * Types for the Community Links module
 */

export type CommunityLinkCategory =
  | "youtube"
  | "facebook"
  | "telegram"
  | "website"
  | "discord"
  | "instagram"
  | "tiktok"
  | "twitter"
  | "linkedin"
  | "other";

export interface CommunityLink {
  id: string;
  title: string;
  url: string;
  description: string | null;
  category: CommunityLinkCategory;
  icon: string | null;
  imageUrl: string | null;
  orderIndex: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityLinksResponse {
  data: CommunityLink[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CommunityLinkFilters {
  category?: CommunityLinkCategory;
  search?: string;
  isActive?: boolean;
}

export const COMMUNITY_LINK_CATEGORIES: CommunityLinkCategory[] = [
  "youtube",
  "facebook",
  "telegram",
  "website",
  "discord",
  "instagram",
  "tiktok",
  "twitter",
  "linkedin",
  "other",
];

export const CATEGORY_ICONS: Record<CommunityLinkCategory, string> = {
  youtube: "youtube",
  facebook: "facebook",
  telegram: "send",
  website: "globe",
  discord: "message-circle",
  instagram: "instagram",
  tiktok: "video",
  twitter: "twitter",
  linkedin: "linkedin",
  other: "link",
};
