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
    // Returns { available: boolean, quantity: number }
    try {
      const { data } = await productsApi.getStockAvailability(productId);
      const inner = (data as any).data ?? data;
      // Prefer quantity if available, fall back to boolean available
      if (typeof inner?.quantity === "number") return inner.quantity;
      return inner?.available ? 1 : 0;
    } catch {
      return 0;
    }
  },
};
