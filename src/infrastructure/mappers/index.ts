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
const mapOrderProduct = (dto: OrderProduct): Product => ({
  id: dto.id,
  name: dto.name,
  price: dto.price,
  imageUrl: dto.image_url,
  images: dto.images?.map((img) => ({
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
  orderId: dto.orderId,
  productId: dto.productId,
  quantity: dto.quantity,
  unitPrice: dto.unitPrice,
  product: mapOrderProduct(dto.product),
});

/**
 * Map API order response to domain order entity
 */
export const mapOrderDtoToEntity = (dto: OrderDto): Order => ({
  id: dto.id,
  userId: dto.userId,
  guestId: dto.guestId,
  fullName: dto.fullName,
  email: dto.email,
  phoneNumber: dto.phoneNumber,
  shippingAddress: dto.shippingAddress,
  orderNotes: dto.orderNotes,
  paymentMethod: dto.paymentMethod,
  paymentStatus: dto.paymentStatus,
  status: dto.status,
  subtotal: dto.subtotal,
  total: dto.total,
  payment_intent_id: dto.payment_intent_id,
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
  items: dto.items.map(mapOrderItem),
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
 */
export const mapCartItemDtoToEntity = (dto: CartItemWithProduct): CartItem => ({
  id: dto.id,
  productId: dto.product_id,
  name: dto.product.name,
  price: dto.product.price,
  quantity: dto.quantity,
  imageUrl: dto.product.image_url,
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
