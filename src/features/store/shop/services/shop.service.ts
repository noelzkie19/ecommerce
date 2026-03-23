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
    // Use public availability endpoint that doesn't require auth
    const { data } = await productsApi.getStockAvailability(productId);
    return (data as { data?: { available?: boolean } }).data?.available ? 1 : 0;
  },
};
