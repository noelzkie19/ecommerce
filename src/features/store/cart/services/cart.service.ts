import { cartApi } from "@/infrastructure/api/cart.api";
import type {
  CartItemWithProduct,
  CartSummary,
  AddToCartPayload,
  UpdateCartItemPayload,
} from "@/types/cart.types";
import { calculateItemTotal } from "@/domain/rules";

const buildSummary = (items: CartItemWithProduct[]): CartSummary => {
  return {
    items,
    itemCount: items.length,
    totalQty: items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal: items.reduce((sum, i) => {
      const unitPrice = i.product.price ?? 0;
      return sum + calculateItemTotal(unitPrice, i.quantity, i.productBundle);
    }, 0),
  };
};

export const cartService = {
  async getCart(): Promise<CartSummary> {
    const { data } = await cartApi.getCart();
    const items: CartItemWithProduct[] = (data as any).data ?? data ?? [];
    console.log("Fetched cart items raw:", items);
    return buildSummary(items);
  },

  async addToCart(payload: AddToCartPayload): Promise<void> {
    console.log("Adding to cart with payload:", payload);
    await cartApi.addToCart(payload);
  },

  async updateItem(id: string, payload: UpdateCartItemPayload): Promise<void> {
    await cartApi.updateItem(id, payload);
  },

  async removeItem(id: string): Promise<void> {
    await cartApi.removeItem(id);
  },

  async clearCart(): Promise<void> {
    await cartApi.clearCart();
  },
};
