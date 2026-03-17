import { adminOrdersApi } from "@/infrastructure/api/admin-orders.api";
import type {
  Order,
  OrderItem,
  OrderProduct,
  OrderStatus,
  OrdersResponse,
  PaymentMethod,
  PaymentStatus,
} from "@/types/order.types";

const getData = <T>(response: { data: unknown }): T => {
  const body =
    (response.data as Record<string, unknown>)?.data ?? response.data;
  return body as T;
};

const mapProduct = (
  raw: Record<string, unknown> | undefined,
): OrderProduct => ({
  id: (raw?.id as string) ?? "",
  name: (raw?.name as string) ?? "",
  price: (raw?.price as number) ?? 0,
  image_url: (raw?.image_url as string | null) ?? null,
  images:
    (raw?.images as { id: string; url: string; position: number }[]) ?? [],
});

const mapItem = (raw: Record<string, unknown>): OrderItem => ({
  id: raw.id as string,
  orderId: raw.order_id as string,
  productId: raw.product_id as string,
  quantity: raw.quantity as number,
  unitPrice: raw.unit_price as number,
  product: mapProduct(raw.product as Record<string, unknown> | undefined),
});

const mapOrder = (raw: Record<string, unknown>): Order => ({
  id: raw.id as string,
  userId: raw.user_id as string | null,
  guestId: raw.guest_id as string | null,
  fullName: raw.full_name as string,
  email: raw.email as string,
  phoneNumber: raw.phone_number as string,
  shippingAddress: raw.shipping_address as string,
  orderNotes: raw.order_notes as string | null,
  paymentMethod: raw.payment_method as PaymentMethod,
  paymentStatus: raw.payment_status as PaymentStatus,
  status: raw.status as OrderStatus,
  subtotal: raw.subtotal as number,
  total: raw.total as number,
  payment_intent_id: raw.payment_intent_id as string | null,
  createdAt: raw.created_at as string,
  updatedAt: raw.updated_at as string,
  items: ((raw.items as Record<string, unknown>[]) ?? []).map(mapItem),
});

const mapOrdersResponse = (raw: Record<string, unknown>): OrdersResponse => ({
  data: ((raw.data as Record<string, unknown>[]) ?? []).map(mapOrder),
  meta: raw.meta as OrdersResponse["meta"],
});

export const adminOrdersService = {
  getAllAdmin: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<OrdersResponse> => {
    const response = await adminOrdersApi.getAllAdmin(params);
    const data = getData<Record<string, unknown>>(response);
    return mapOrdersResponse(data);
  },

  updateStatus: async (id: string, status: OrderStatus): Promise<Order> => {
    const response = await adminOrdersApi.updateStatus(id, { status });
    const data = getData<Record<string, unknown>>(response);
    return mapOrder(data);
  },

  getById: async (id: string): Promise<Order> => {
    const response = await adminOrdersApi.getById(id);
    const data = getData<Record<string, unknown>>(response);
    return mapOrder(data);
  },

  getMyOrders: async (): Promise<Order[]> => {
    const response = await adminOrdersApi.getMyOrders();
    const data = getData<Record<string, unknown>[]>(response);
    return (data ?? []).map(mapOrder);
  },
};
