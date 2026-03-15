import { apiClient } from "@/infrastructure/api/client";
import type {
  Order,
  CreateOrderPayload,
  PlaceOrderResult,
  VerifyGCashResult,
} from "@/types/order.types";
import { getGuestId } from "@/utils/guest.utils";

const guestHeaders = () => {
  const guestId = getGuestId();
  return guestId ? { "x-guest-id": guestId } : {};
};

export const orderApi = {
  // ── Place order ─────────────────────────────────────────────────────────────
  // Returns { order, gcashRedirectUrl } — gcashRedirectUrl is null for COD/card
  placeOrder: (payload: CreateOrderPayload) =>
    apiClient.post<PlaceOrderResult>("/api/orders", payload, {
      headers: guestHeaders(),
    }),

  // ── Get all orders for current user/guest ───────────────────────────────────
  getOrders: () =>
    apiClient.get<Order[]>("/api/orders", {
      headers: guestHeaders(),
    }),

  // ── Get single order ────────────────────────────────────────────────────────
  getOrder: (id: string) =>
    apiClient.get<Order>(`/api/orders/${id}`, {
      headers: guestHeaders(),
    }),

  // ── Verify GCash payment after redirect back from GCash ─────────────────────
  // Called by the callback page with the intent_id from the URL
  verifyGCash: (intentId: string) =>
    apiClient.get<VerifyGCashResult>(`/api/orders/verify-gcash/${intentId}`, {
      headers: guestHeaders(),
    }),
};
