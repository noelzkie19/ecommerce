import { productsApi } from "@/infrastructure/api/products.api";
import type { Product, ProductsResponse } from "@/types/product.types";

export const shopService = {
  async getAll(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }): Promise<ProductsResponse> {
    const { data } = await productsApi.getAll(params);
    return {
      data: (data as any).data ?? [],
      meta: (data as any).meta ?? {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    };
  },

  async getById(id: string): Promise<Product> {
    const { data } = await productsApi.getById(id);
    return (data as any).data ?? data;
  },

  async getStockByProductId(productId: string): Promise<number> {
    const { data } = await productsApi.getStockByProductId(productId);
    return (data as { data?: { quantity?: number } }).data?.quantity ?? 0;
  },
};
