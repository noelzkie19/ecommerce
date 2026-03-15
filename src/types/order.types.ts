export type PaymentMethod = "cod" | "gcash";
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";
export type PaymentStatus = "pending" | "paid" | "failed";

export interface OrderProduct {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  images?: { id: string; url: string; position: number }[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  product: OrderProduct;
}

export interface Order {
  id: string;
  userId: string | null;
  guestId: string | null;
  fullName: string;
  email: string;
  phoneNumber: string;
  shippingAddress: string;
  orderNotes: string | null;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  subtotal: number;
  total: number;
  payment_intent_id: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface CreateOrderPayload {
  fullName: string;
  email: string;
  phoneNumber: string;
  shippingAddress: string;
  orderNotes?: string;
  paymentMethod: PaymentMethod;
  discount?: number;
}

// ── PlaceOrder result shape from BE ──────────────────────────────────────────
// BE returns { order, gcashRedirectUrl } for gcash, { order, gcashRedirectUrl: null } for COD/card

export interface PlaceOrderResult {
  order: Order;
  gcashRedirectUrl: string | null;
  qrCodeUrl: string | null; // For QR PH flow — if present, caller should display this instead of redirecting
}

// ── Admin additions ───────────────────────────────────────────────────────────

export interface UpdateOrderStatusPayload {
  status: OrderStatus;
}

export interface OrderMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OrdersResponse {
  data: Order[];
  meta: OrderMeta;
}

// ── GCash verify response ─────────────────────────────────────────────────────

export interface VerifyGCashResult {
  status: string;
  orderId: string;
  alreadyConfirmed: boolean;
}
