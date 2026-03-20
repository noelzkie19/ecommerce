import { z } from "zod";

export const imageLibrarySchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  imageUrl: z.string().url("Invalid image URL"),
  thumbnailUrl: z
    .string()
    .url("Invalid thumbnail URL")
    .optional()
    .or(z.literal("")),
  category: z.enum(["banners", "gallery", "testimonials", "partners"]),
  description: z.string().max(500).optional(),
  displayOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export type ImageLibraryFormValues = z.infer<typeof imageLibrarySchema>;
