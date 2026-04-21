export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  position: number;
  created_at: string;
}

/**
 * Product Bundle - represents a bundle pricing option for a product
 * e.g., "Buy 2 Get 1 Free" = 3 items for a discounted price
 */
export interface ProductBundle {
  id: string;
  productId: string;
  name: string;
  bundleQty: number;
  bundlePrice: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  badge: string | null;
  rating: number | null;
  review_count: number | null;
  original_price: number | null;
  affiliate_link: string | null;
  videoUrl: string | null;
  created_at: string;
  images: ProductImage[];
  bundles?: ProductBundle[];
  stock?: number;
}

export interface ProductFilters {
  category?: string;
  search?: string;
}

export interface ProductMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductsResponse {
  data: Product[];
  meta: ProductMeta;
}

export interface CreateProductPayload {
  name: string;
  description?: string | null;
  price: number;
  category: string;
  image_url?: string | null;
  badge?: string | null;
  rating?: number | null;
  review_count?: number | null;
  original_price?: number | null;
  affiliate_link?: string | null;
  videoUrl?: string | null;
  bundles?: {
    name: string;
    bundleQty: number;
    bundlePrice: number;
    isActive: boolean;
  }[];
}

export type UpdateProductPayload = Partial<CreateProductPayload>;

export interface AddProductImagesPayload {
  urls: string[];
}

export interface ReorderProductImagesPayload {
  images: { id: string; position: number }[];
}
