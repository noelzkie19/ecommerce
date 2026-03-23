export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  position: number;
  created_at: string;
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
  created_at: string;
  images: ProductImage[];
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
}

export type UpdateProductPayload = Partial<CreateProductPayload>;

export interface AddProductImagesPayload {
  urls: string[];
}

export interface ReorderProductImagesPayload {
  images: { id: string; position: number }[];
}
