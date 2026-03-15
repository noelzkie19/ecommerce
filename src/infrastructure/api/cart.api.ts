import { apiClient } from "@/infrastructure/api/client";
import type {
  CartItemWithProduct,
  CartItem,
  AddToCartPayload,
  UpdateCartItemPayload,
} from "@/types/cart.types";
import { getGuestId } from "@/utils/guest.utils";

const guestHeaders = () => {
  const guestId = getGuestId();
  return guestId ? { "x-guest-id": guestId } : {};
};

export const cartApi = {
  getCart: () =>
    apiClient.get<CartItemWithProduct[]>("/api/cart", {
      headers: guestHeaders(),
    }),

  addToCart: (payload: AddToCartPayload) =>
    apiClient.post<CartItem>("/api/cart", payload, {
      headers: guestHeaders(),
    }),

  updateItem: (id: string, payload: UpdateCartItemPayload) =>
    apiClient.patch<CartItem>(`/api/cart/${id}`, payload, {
      headers: guestHeaders(),
    }),

  removeItem: (id: string) =>
    apiClient.delete(`/api/cart/${id}`, {
      headers: guestHeaders(),
    }),

  clearCart: () =>
    apiClient.delete("/api/cart", {
      headers: guestHeaders(),
    }),
};
