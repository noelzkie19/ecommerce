import { useState, useEffect, useCallback } from "react";
import { shopService } from "../services/shop.service";
import type { Product, ProductMeta } from "@/types/product.types";

interface UseShopsParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

export const useShops = (params: UseShopsParams = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<ProductMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await shopService.getAll(params);
      setProducts(res.data);
      setMeta(res.meta);
    } catch {
      setError("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  }, [params.page, params.limit, params.category, params.search]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { products, meta, isLoading, error, refetch: fetch };
};
