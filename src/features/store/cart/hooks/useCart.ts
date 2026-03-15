"use client";

import { useCallback, useEffect, useState } from "react";
import { cartService } from "../services/cart.service";
import type { CartSummary, AddToCartPayload } from "@/types/cart.types";

const EMPTY: CartSummary = {
  items: [],
  itemCount: 0,
  totalQty: 0,
  subtotal: 0,
};

export const useCart = () => {
  const [cart, setCart] = useState<CartSummary>(EMPTY);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setCart(await cartService.getCart());
    } catch {
      setError("Failed to load cart");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = useCallback(
    async (payload: AddToCartPayload) => {
      await cartService.addToCart(payload);
      await fetchCart();
    },
    [fetchCart],
  );

  const updateItem = useCallback(
    async (id: string, quantity: number) => {
      await cartService.updateItem(id, { quantity });
      await fetchCart();
    },
    [fetchCart],
  );

  const removeItem = useCallback(
    async (id: string) => {
      await cartService.removeItem(id);
      await fetchCart();
    },
    [fetchCart],
  );

  const clearCart = useCallback(async () => {
    await cartService.clearCart();
    setCart(EMPTY);
  }, []);

  return {
    cart,
    isLoading,
    error,
    addToCart,
    updateItem,
    removeItem,
    clearCart,
    refetch: fetchCart,
  };
};
