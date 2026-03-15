import { useState, useEffect, useCallback } from "react";
import { shopService } from "../services/shop.service";
import type { Product } from "@/types/product.types";

export const useShop = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [stock, setStock] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const [productData, stockQty] = await Promise.all([
        shopService.getById(id),
        shopService.getStockByProductId(id),
      ]);
      setProduct(productData);
      setStock(stockQty);
    } catch {
      setError("Failed to load product");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { product, stock, isLoading, error, refetch: fetch };
};
