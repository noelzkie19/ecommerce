/**
 * Order Service
 *
 * Application layer service for order operations.
 * Uses the domain layer for business logic and infrastructure for API calls.
 */

import { orderApi } from "@/infrastructure/api/orders.api";
import { mapOrderDtoToEntity, extractData } from "@/infrastructure/mappers";
import type {
  Order,
  CreateOrderPayload,
  PlaceOrderResult,
  VerifyMayaResult,
} from "@/types/order.types";
import type { Order as OrderEntity } from "@/domain/entities";

/**
 * Place order result with domain entity
 */
export interface PlaceOrderResultEntity {
  order: OrderEntity;
  mayaRedirectUrl: string | null;
  qrCodeUrl: string | null;
}

export const orderService = {
  /**
   * Place an order.
   *
   * For Maya: BE returns a mayaRedirectUrl — caller must redirect to it.
   * For COD/card: mayaRedirectUrl is null — caller proceeds normally.
   *
   * @returns PlaceOrderResultEntity with domain order entity
   */
  async placeOrder(
    payload: CreateOrderPayload,
  ): Promise<PlaceOrderResultEntity> {
    const { data } = await orderApi.placeOrder(payload);
    const result = extractData<PlaceOrderResult>(data);

    return {
      order: mapOrderDtoToEntity(result!.order),
      mayaRedirectUrl: result!.mayaRedirectUrl,
      qrCodeUrl: result!.qrCodeUrl,
    };
  },

  /**
   * Get all orders for current user
   * @returns Array of domain order entities
   */
  async getOrders(): Promise<OrderEntity[]> {
    const { data } = await orderApi.getOrders();
    const orders = extractData<Order[]>(data);
    return (orders ?? []).map(mapOrderDtoToEntity);
  },

  /**
   * Get single order by ID
   * @returns Domain order entity
   */
  async getOrder(id: string): Promise<OrderEntity> {
    const { data } = await orderApi.getOrder(id);
    const order = extractData<Order>(data);
    return mapOrderDtoToEntity(order!);
  },

  /**
   * Verify Maya payment status after user returns from Maya app.
   * Call this on the /checkout/callback page with the intent_id query param.
   */
  async verifyMaya(intentId: string): Promise<VerifyMayaResult> {
    const { data } = await orderApi.verifyMaya(intentId);
    return extractData<VerifyMayaResult>(data)!;
  },
};
