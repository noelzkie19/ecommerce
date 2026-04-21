import { z } from "zod";

export const bundleSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Bundle name is required"),
  bundleQty: z.coerce.number().int().positive("Quantity must be at least 1"),
  bundlePrice: z.coerce.number().positive("Price must be greater than 0"),
  isActive: z.boolean().default(true),
});

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be greater than 0"),
  original_price: z.coerce.number().positive().optional(),
  category: z.string().min(1, "Category is required"),
  image_url: z.string().optional(),
  badge: z.string().optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  review_count: z.coerce.number().int().min(0).optional(),
  videoUrl: z.string().optional(),
  bundles: z.array(bundleSchema).optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
export type BundleFormValues = z.infer<typeof bundleSchema>;
