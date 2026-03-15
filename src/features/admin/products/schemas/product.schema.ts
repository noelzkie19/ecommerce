import { z } from "zod";

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
  affiliate_link: z
    .string()
    .url("Affiliate link must be a valid URL")
    .optional()
    .or(z.literal("")),
});

export type ProductFormValues = z.infer<typeof productSchema>;
