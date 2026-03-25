/**
 * Order Hook
 *
 * Custom hook for order operations.
 * Uses domain entities from the application layer.
 */

"use client";

import { useCallback, useState } from "react";
import {
  orderService,
  type PlaceOrderResultEntity,
} from "../services/order.service";
import type { CreateOrderPayload } from "@/types/order.types";
import type { Order } from "@/domain/entities";

export const useOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const placeOrder = useCallback(
    async (payload: CreateOrderPayload): Promise<Order> => {
      setIsLoading(true);
      setError(null);
      setQrCodeUrl(null);

      try {
        const result: PlaceOrderResultEntity =
          await orderService.placeOrder(payload);
        setOrder(result.order);

        if (payload.paymentMethod === "maya") {
          if (result.mayaRedirectUrl) {
            // Redirect flow (legacy maya)
            globalThis.window.location.href = result.mayaRedirectUrl;
          } else if (result.qrCodeUrl) {
            // QR PH — store QR URL so the page can display it
            setQrCodeUrl(result.qrCodeUrl);
          }
          return result.order;
        }

        // COD / card
        return result.order;
      } catch (err: unknown) {
        console.error("[useOrder] placeOrder error:", err);
        const axiosErr = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        const serverMsg =
          axiosErr?.response?.data?.message ?? axiosErr?.message ?? "";
        const isStockError =
          serverMsg.toLowerCase().includes("stock") ||
          serverMsg.toLowerCase().includes("insufficient") ||
          serverMsg.toLowerCase().includes("available");
        setError(
          isStockError
            ? "Some items in your cart are no longer available in the requested quantity. Please review your cart."
            : "Failed to place order. Please try again.",
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { order, isLoading, error, placeOrder, qrCodeUrl };
};
