import type { PaymentMethod } from "@/types/order.types";

export const FREE_THRESHOLD = 50;

export const STEPS = [
  { id: 1, label: "Cart" },
  { id: 2, label: "Shipping" },
  { id: 3, label: "Payment" },
] as const;

export const PAYMENT_OPTIONS = [
  {
    id: "cod" as PaymentMethod,
    label: "Cash on Delivery",
    description: "Pay when you receive your order",
  },
  {
    id: "maya" as PaymentMethod,
    label: "Maya",
    description: "Pay via Maya mobile wallet",
  },
] as const;
