export type PaymentMethod = "cod" | "maya";
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
  order_id?: string;
  orderId: string;
  product_id?: string;
  productId: string;
  quantity: number;
  unit_price?: number;
  unitPrice: number;
  product: OrderProduct;
}

export interface Order {
  id: string;
  user_id?: string | null;
  userId: string | null;
  guest_id?: string | null;
  guestId: string | null;
  full_name?: string;
  fullName: string;
  email: string;
  phone_number?: string;
  phoneNumber: string;
  shipping_address?: string;
  shippingAddress: string;
  order_notes?: string | null;
  orderNotes: string | null;
  payment_method?: PaymentMethod;
  paymentMethod: PaymentMethod;
  payment_status?: PaymentStatus;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  subtotal: number;
  total: number;
  payment_intent_id?: string | null;
  paymentIntentId?: string | null;
  created_at?: string;
  createdAt: string;
  updated_at?: string;
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
  /** Affiliate referral code — read from sessionStorage and sent to backend for commission tracking */
  referralCode?: string;
}

// ── PlaceOrder result shape from BE ──────────────────────────────────────────
// BE returns { order, mayaRedirectUrl } for maya, { order, mayaRedirectUrl: null } for COD/card

export interface PlaceOrderResult {
  order: Order;
  mayaRedirectUrl: string | null;
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

// ── Maya verify response ─────────────────────────────────────────────────────

export interface VerifyMayaResult {
  status: string;
  orderId: string;
  alreadyConfirmed: boolean;
}
