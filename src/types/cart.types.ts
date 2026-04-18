export interface CartItem {
  id: string;
  userId: string;
  product_id: string;
  productBundleId?: string | null;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  productBundle?: {
    id: string;
    name: string;
    bundleQty: number;
    bundlePrice: number;
  } | null;
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
  productBundleId?: string | null;
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
