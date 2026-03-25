import { apiClient } from "@/infrastructure/api/client";
import type {
  Order,
  CreateOrderPayload,
  PlaceOrderResult,
  VerifyMayaResult,
} from "@/types/order.types";
import { getGuestId } from "@/utils/guest.utils";

const guestHeaders = () => {
  const guestId = getGuestId();
  return guestId ? { "x-guest-id": guestId } : {};
};

export const orderApi = {
  // ── Place order ─────────────────────────────────────────────────────────────
  // Returns { order, mayaRedirectUrl } — mayaRedirectUrl is null for COD/card
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

  // ── Verify Maya/GCash payment after redirect back from Maya ───────────────
  // Called by the callback page with the intent_id from the URL
  verifyMaya: (intentId: string) =>
    apiClient.get<VerifyMayaResult>(`/api/orders/verify-gcash`, {
      params: { payment_intent_id: intentId },
      headers: guestHeaders(),
    }),
};
