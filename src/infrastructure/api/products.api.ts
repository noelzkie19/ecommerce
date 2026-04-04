import { apiClient } from "./client";
import { tokenStorage } from "@/infrastructure/storage/tokenStorage";
import type {
  Product,
  ProductsResponse,
  CreateProductPayload,
  UpdateProductPayload,
  ProductImage,
  AddProductImagesPayload,
  ReorderProductImagesPayload,
} from "@/types/product.types";

// Helper to get storeId from sessionStorage for affiliate tracking
export function getStoreIdFromSession(): string | undefined {
  if (!globalThis.window) return undefined;
  try {
    return globalThis.sessionStorage.getItem("affiliate_store_id") ?? undefined;
  } catch {
    return undefined;
  }
}

export const productsApi = {
  // -------------------------------------------------------------------------
  // Public
  // -------------------------------------------------------------------------
  getAll: (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    storeId?: string;
  }) => {
    const storeId = getStoreIdFromSession();
    const requestParams = { ...params };
    // Include storeId from sessionStorage for affiliate tracking
    if (storeId) {
      requestParams.storeId = storeId;
    }
    return apiClient.get<ProductsResponse>("/api/products", {
      params: requestParams,
    });
  },

  getById: (id: string) => apiClient.get<Product>(`/api/products/${id}`),

  getStockAvailability: (productId: string) =>
    apiClient.get<{ available: boolean; quantity: number }>(
      `/api/stocks/availability/${productId}`,
    ),

  getStockByProductId: (productId: string) =>
    apiClient.get(`/api/stocks/${productId}`),

  // -------------------------------------------------------------------------
  // Admin – products
  // -------------------------------------------------------------------------
  getAllAdmin: (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }) => apiClient.get<ProductsResponse>("/api/products/admin", { params }),

  create: (payload: CreateProductPayload) =>
    apiClient.post<Product>("/api/products", payload),

  update: (id: string, payload: UpdateProductPayload) =>
    apiClient.patch<Product>(`/api/products/${id}`, payload),

  delete: (id: string) => apiClient.delete(`/api/products/${id}`),

  // -------------------------------------------------------------------------
  // Admin – file upload
  // -------------------------------------------------------------------------

  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    return apiClient.post<{ url: string }>(
      "/api/products/admin/upload-image",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
  },

  uploadImages: (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    return apiClient.post<{ urls: string[] }>(
      "/api/products/admin/upload-images",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
  },

  // -------------------------------------------------------------------------
  // Admin – product images management
  // -------------------------------------------------------------------------

  addProductImages: (productId: string, payload: AddProductImagesPayload) =>
    apiClient.post<ProductImage[]>(
      `/api/products/${productId}/images`,
      payload,
    ),

  replaceProductImages: (productId: string, payload: AddProductImagesPayload) =>
    apiClient.put<ProductImage[]>(`/api/products/${productId}/images`, payload),

  reorderProductImages: (
    productId: string,
    payload: ReorderProductImagesPayload,
  ) => apiClient.patch(`/api/products/${productId}/images/reorder`, payload),

  deleteProductImage: (imageId: string) =>
    apiClient.delete(`/api/products/images/${imageId}`),
};
