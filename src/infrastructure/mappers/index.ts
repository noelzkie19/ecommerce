/**
 * Infrastructure Layer - DTO Mappers
 *
 * Transforms API responses (DTOs) into domain entities.
 * This decouples the UI from the backend response structure.
 */

import type {
  Order,
  OrderItem,
  CartItem,
  Product,
  Cart,
} from "@/domain/entities";
import type {
  Order as OrderDto,
  OrderItem as OrderItemDto,
  OrderProduct,
} from "@/types/order.types";
import type {
  CartItemWithProduct,
  CartSummary,
  CartProduct,
} from "@/types/cart.types";
import type { Product as ProductDto } from "@/types/product.types";

/**
 * Map API order product to domain product
 */
const mapOrderProduct = (dto: OrderProduct | undefined | null): Product => ({
  id: dto?.id ?? "",
  name: dto?.name ?? "",
  price: dto?.price ?? 0,
  imageUrl: dto?.image_url ?? null,
  images: dto?.images?.map((img) => ({
    id: img.id,
    url: img.url,
    position: img.position,
  })),
});

/**
 * Map API order item to domain order item
 */
const mapOrderItem = (dto: OrderItemDto): OrderItem => ({
  id: dto.id,
  orderId: dto.order_id ?? dto.orderId ?? "",
  productId: dto.product_id ?? dto.productId ?? "",
  quantity: dto.quantity ?? 0,
  unitPrice: dto.unit_price ?? dto.unitPrice ?? 0,
  product: mapOrderProduct(dto.product),
});

/**
 * Map API order response to domain order entity
 * Handles both snake_case (from API) and camelCase (from types)
 */
export const mapOrderDtoToEntity = (dto: OrderDto): Order => ({
  id: dto.id,
  userId: dto.user_id ?? dto.userId ?? null,
  guestId: dto.guest_id ?? dto.guestId ?? null,
  fullName: dto.full_name ?? dto.fullName ?? "",
  email: dto.email ?? "",
  phoneNumber: dto.phone_number ?? dto.phoneNumber ?? "",
  shippingAddress: dto.shipping_address ?? dto.shippingAddress ?? "",
  orderNotes: dto.order_notes ?? dto.orderNotes ?? null,
  paymentMethod: dto.payment_method ?? dto.paymentMethod ?? "cod",
  paymentStatus: dto.payment_status ?? dto.paymentStatus ?? "pending",
  status: dto.status ?? "pending",
  subtotal: dto.subtotal ?? 0,
  total: dto.total ?? 0,
  payment_intent_id: dto.payment_intent_id ?? dto.paymentIntentId ?? null,
  createdAt: dto.created_at ?? dto.createdAt ?? new Date().toISOString(),
  updatedAt: dto.updated_at ?? dto.updatedAt ?? new Date().toISOString(),
  items: (dto.items ?? []).map(mapOrderItem),
});

/**
 * Map API cart product to domain product
 */
const mapCartProduct = (dto: CartProduct): Product => ({
  id: dto.id,
  name: dto.name,
  price: dto.price,
  imageUrl: dto.image_url,
  images: dto.images,
});

/**
 * Map API cart item to domain cart item
 * Includes productBundle data if present
 */
export const mapCartItemDtoToEntity = (dto: CartItemWithProduct): CartItem => ({
  id: dto.id,
  productId: dto.product_id,
  name: dto.product.name,
  price: dto.product.price,
  quantity: dto.quantity,
  imageUrl: dto.product.image_url,
  productBundleId: dto.productBundleId ?? null,
  productBundle: dto.productBundle
    ? {
        id: dto.productBundle.id,
        name: dto.productBundle.name,
        bundleQty: dto.productBundle.bundleQty,
        bundlePrice: dto.productBundle.bundlePrice,
      }
    : null,
});

/**
 * Map API cart summary to domain cart
 */
export const mapCartDtoToEntity = (dto: CartSummary): Cart => ({
  items: dto.items.map(mapCartItemDtoToEntity),
  itemCount: dto.itemCount,
  totalQty: dto.totalQty,
  subtotal: dto.subtotal,
});

/**
 * Map API product to domain product
 */
export const mapProductDtoToEntity = (dto: ProductDto): Product => ({
  id: dto.id,
  name: dto.name,
  description: dto.description ?? undefined,
  price: dto.price,
  imageUrl: dto.image_url,
  images: dto.images.map((img) => ({
    id: img.id,
    url: img.url,
    position: img.position,
  })),
});

/**
 * Generic safe data extraction from API responses
 * Handles various response wrapper formats
 */
export const extractData = <T>(response: unknown): T | null => {
  if (!response) return null;

  // Handle { data: ... } wrapper
  if (typeof response === "object" && response !== null && "data" in response) {
    const data = (response as { data: unknown }).data;

    // Handle { data: { data: ... } } wrapper (double wrapped)
    if (typeof data === "object" && data !== null && "data" in data) {
      return (data as { data: T }).data;
    }

    return data as T;
  }

  return response as T;
};
