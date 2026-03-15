import { adminOrdersApi } from "@/infrastructure/api/admin-orders.api";
import type {
  Order,
  OrderItem,
  OrderStatus,
  OrdersResponse,
} from "@/types/order.types";

// ── Mappers ──────────────────────────────────────────────────────────────────

const mapItem = (raw: any): OrderItem => ({
  id: raw.id,
  orderId: raw.order_id,
  productId: raw.product_id,
  quantity: raw.quantity,
  unitPrice: raw.unit_price,
  product: {
    id: raw.product.id,
    name: raw.product.name,
    price: raw.product.price,
    image_url: raw.product.image_url ?? null,
    images: raw.product.images ?? [],
  },
});

const mapOrder = (raw: any): Order => ({
  id: raw.id,
  userId: raw.user_id ?? null,
  guestId: raw.guest_id ?? null,
  fullName: raw.full_name,
  email: raw.email,
  phoneNumber: raw.phone_number,
  shippingAddress: raw.shipping_address,
  orderNotes: raw.order_notes ?? null,
  paymentMethod: raw.payment_method,
  paymentStatus: raw.payment_status,
  status: raw.status,
  subtotal: raw.subtotal,
  total: raw.total,
  payment_intent_id: raw.payment_intent_id ?? null,
  createdAt: raw.created_at,
  updatedAt: raw.updated_at,
  items: (raw.items ?? []).map(mapItem),
});

const mapOrdersResponse = (raw: any): OrdersResponse => ({
  data: (raw.data ?? []).map(mapOrder),
  meta: raw.meta,
});

// ── Service ──────────────────────────────────────────────────────────────────

export const adminOrdersService = {
  getAllAdmin: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<OrdersResponse> => {
    const res = (await adminOrdersApi.getAllAdmin(params)) as any;
    return mapOrdersResponse(res.data.data);
  },

  updateStatus: async (id: string, status: OrderStatus): Promise<Order> => {
    const res = (await adminOrdersApi.updateStatus(id, { status })) as any;
    return mapOrder(res.data.data);
  },

  getById: async (id: string): Promise<Order> => {
    const res = (await adminOrdersApi.getById(id)) as any;
    return mapOrder(res.data.data);
  },

  getMyOrders: async (): Promise<Order[]> => {
    const res = (await adminOrdersApi.getMyOrders()) as any;
    return (res.data.data ?? []).map(mapOrder);
  },
};
