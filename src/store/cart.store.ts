import { create } from "zustand";
import { cartService } from "@/features/store/cart/services/cart.service";
import type { CartSummary, AddToCartPayload } from "@/types/cart.types";

const EMPTY: CartSummary = {
  items: [],
  itemCount: 0,
  totalQty: 0,
  subtotal: 0,
};

interface CartStore {
  cart: CartSummary;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (payload: AddToCartPayload) => Promise<void>;
  updateItem: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  reset: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: EMPTY,
  isLoading: false,
  fetchCart: async () => {
    set({ isLoading: true });
    try {
      set({ cart: await cartService.getCart() });
    } catch {
      set({ cart: EMPTY });
    } finally {
      set({ isLoading: false });
    }
  },

  addToCart: async (payload) => {
    await cartService.addToCart(payload);
    await get().fetchCart();
  },

  updateItem: async (id, quantity) => {
    await cartService.updateItem(id, { quantity });
    await get().fetchCart();
  },

  removeItem: async (id) => {
    await cartService.removeItem(id);
    await get().fetchCart();
  },

  clearCart: async () => {
    await cartService.clearCart();
    set({ cart: EMPTY });
  },

  reset: () => set({ cart: EMPTY }),
}));
