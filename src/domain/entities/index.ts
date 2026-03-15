/**
 * Domain Layer - Core Business Entities
 *
 * These entities represent the core business concepts, independent of
 * any framework or infrastructure concerns.
 */

export type PaymentMethod = "cod" | "gcash";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed";

/**
 * Product entity - represents a product in the domain
 */
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl: string | null;
  images?: ProductImage[];
}

export interface ProductImage {
  id?: string;
  url: string;
  position: number;
}

/**
 * OrderItem entity - represents an item in an order
 */
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  product: Product;
}

/**
 * Order entity - represents a complete order
 */
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

/**
 * CartItem entity - represents an item in the cart
 */
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
}

/**
 * Cart entity - represents the shopping cart
 */
export interface Cart {
  items: CartItem[];
  itemCount: number;
  totalQty: number;
  subtotal: number;
}

/**
 * ShippingInfo entity - represents shipping information
 */
export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

/**
 * Pricing breakdown
 */
export interface Pricing {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}
