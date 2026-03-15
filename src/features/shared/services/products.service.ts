import { productsApi } from "@/infrastructure/api/products.api";
import type {
  Product,
  ProductsResponse,
  CreateProductPayload,
  UpdateProductPayload,
  ProductImage,
} from "@/types/product.types";

export const productsService = {
  // -------------------------------------------------------------------------
  // Products
  // -------------------------------------------------------------------------
  async getAll(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }): Promise<ProductsResponse> {
    const { data } = await productsApi.getAll(params);
    return {
      data: (data as any).data,
      meta: (data as any).meta,
    };
  },

  async getById(id: string): Promise<Product> {
    const { data } = await productsApi.getById(id);
    return (data as any).data ?? data;
  },

  async getAllAdmin(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }): Promise<ProductsResponse> {
    const { data } = await productsApi.getAllAdmin(params);
    return {
      data: (data as any).data,
      meta: (data as any).meta,
    };
  },

  async create(payload: CreateProductPayload): Promise<Product> {
    const { data } = await productsApi.create(payload);
    return (data as any).data ?? data;
  },

  async update(id: string, payload: UpdateProductPayload): Promise<Product> {
    const { data } = await productsApi.update(id, payload);
    return (data as any).data ?? data;
  },

  async delete(id: string): Promise<void> {
    await productsApi.delete(id);
  },

  // -------------------------------------------------------------------------
  // Image upload
  // -------------------------------------------------------------------------

  async uploadImage(file: File): Promise<string> {
    const { data } = await productsApi.uploadImage(file);
    return (data as any).url;
  },

  async uploadImages(files: File[]): Promise<string[]> {
    const { data } = await productsApi.uploadImages(files);
    return (data as any).urls;
  },

  // -------------------------------------------------------------------------
  // Product images management
  // -------------------------------------------------------------------------

  async addProductImages(
    productId: string,
    urls: string[],
  ): Promise<ProductImage[]> {
    const { data } = await productsApi.addProductImages(productId, { urls });
    return (data as any).data ?? data;
  },

  async replaceProductImages(
    productId: string,
    urls: string[],
  ): Promise<ProductImage[]> {
    const { data } = await productsApi.replaceProductImages(productId, {
      urls,
    });
    return (data as any).data ?? data;
  },

  async reorderProductImages(
    productId: string,
    images: { id: string; position: number }[],
  ): Promise<void> {
    await productsApi.reorderProductImages(productId, { images });
  },

  async deleteProductImage(imageId: string): Promise<void> {
    await productsApi.deleteProductImage(imageId);
  },
};
