/**
 * Community Link Schema Validation
 *
 * Zod validation schemas for Community Links
 */

import { z } from "zod";

export const communityLinkCategoryEnum = z.enum([
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
]);

export const communityLinkSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  url: z.string().url("Invalid URL"),
  description: z.string().max(500, "Description is too long").optional(),
  category: communityLinkCategoryEnum.default("other"),
  icon: z.string().optional(),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
  orderIndex: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export type CommunityLinkFormValues = z.infer<typeof communityLinkSchema>;

export const communityLinkUpdateSchema = communityLinkSchema.partial();

export type CommunityLinkUpdateValues = z.infer<
  typeof communityLinkUpdateSchema
>;
