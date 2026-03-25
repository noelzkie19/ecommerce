export interface CartItem {
  id: string;
  userId: string;
  product_id: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  images?: { url: string; position: number }[];
  stock?: number | null;
}

export interface CartItemWithProduct extends CartItem {
  product: CartProduct;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemPayload {
  quantity: number;
}

export interface CartSummary {
  items: CartItemWithProduct[];
  itemCount: number;
  totalQty: number;
  subtotal: number;
}
