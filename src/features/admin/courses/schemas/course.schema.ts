/**
 * Course Schema Validation
 *
 * Zod validation schemas for Courses
 */

import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().max(500, "Description is too long").optional(),
  youtubeUrl: z.string().url("Invalid YouTube URL"),
  duration: z.number().int().min(0).optional(),
  category: z.string().optional(),
  isPremium: z.boolean().default(false),
  displayOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export type CourseFormValues = z.infer<typeof courseSchema>;

export const courseUpdateSchema = courseSchema.partial();

export type CourseUpdateValues = z.infer<typeof courseUpdateSchema>;
