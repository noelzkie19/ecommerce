import type { PaymentMethod } from "./order.types";

export interface ModalCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  stock?: number | null;
  productBundleId?: string | null;
  productBundle?: {
    id: string;
    name: string;
    bundleQty: number;
    bundlePrice: number;
  } | null;
}

export interface ShippingData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

export interface PaymentData {
  method: PaymentMethod;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  // referenceNumber removed — PayMongo handles GCash automatically
}

export interface CheckoutModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly items: ModalCartItem[];
  readonly onQuantityChange: (id: string, qty: number) => void;
  readonly onRemove: (id: string) => void;
  readonly onPlaceOrder: () => Promise<void>;
}
