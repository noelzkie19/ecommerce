/**
 * Domain Layer - Business Rules & Pricing
 *
 * Contains all business rules, pricing calculations, and constants.
 * This is the heart of the domain layer - pure business logic with
 * no dependencies on frameworks or infrastructure.
 */

import type { CartItem, Pricing, PaymentMethod } from "../entities";

/**
 * Pricing constants - all price-related values in one place
 */
export const PRICING = {
  /** Discount amount for Maya payments */
  MAYA_DISCOUNT: 50,

  /** Discount amount for GCash payments */
  GCASH_DISCOUNT: 50,

  /** Minimum order amount for free shipping */
  FREE_SHIPPING_THRESHOLD: 50,

  /** Shipping cost when not meeting free shipping threshold */
  SHIPPING_COST: 150,
} as const;

/**
 * Checkout step constants
 */
export const CHECKOUT = {
  STEPS: [
    { id: 1, label: "Cart" },
    { id: 2, label: "Shipping" },
    { id: 3, label: "Payment" },
  ] as const,

  PAYMENT_METHODS: {
    COD: "cod" as PaymentMethod,
    MAYA: "maya" as PaymentMethod,
  },

  PAYMENT_OPTIONS: [
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
  ] as const,
} as const;

/**
 * Calculate the subtotal from cart items
 */
export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

/**
 * Calculate shipping cost based on subtotal
 * Returns 0 if subtotal meets free shipping threshold
 */
export const calculateShipping = (subtotal: number): number => {
  return subtotal >= PRICING.FREE_SHIPPING_THRESHOLD
    ? 0
    : PRICING.SHIPPING_COST;
};

/**
 * Calculate total before any discounts
 */
export const calculateBaseTotal = (
  subtotal: number,
  shipping: number,
): number => {
  return subtotal + shipping;
};

/**
 * Calculate discount based on payment method
 */
export const calculateDiscount = (paymentMethod: PaymentMethod): number => {
  return paymentMethod === "maya" ? PRICING.MAYA_DISCOUNT : 0;
};

/**
 * Calculate the final total including all adjustments
 */
export const calculatePricing = (
  items: CartItem[],
  paymentMethod: PaymentMethod,
): Pricing => {
  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal);
  const discount = calculateDiscount(paymentMethod);
  const baseTotal = calculateBaseTotal(subtotal, shipping);
  const total = baseTotal - discount;

  return {
    subtotal,
    shipping,
    discount,
    total: Math.max(0, total),
  };
};

/**
 * Calculate total with Maya discount applied
 * Convenience function for displaying the discounted total
 */
export const calculateMayaTotal = (
  subtotal: number,
  shipping: number,
): number => {
  return subtotal + shipping - PRICING.MAYA_DISCOUNT;
};

/**
 * Calculate total with GCash discount applied
 * Convenience function for displaying the discounted total
 */
export const calculateGCashTotal = (
  subtotal: number,
  shipping: number,
): number => {
  return subtotal + shipping - PRICING.GCASH_DISCOUNT;
};

/**
 * Validate shipping information
 */
export const validateShipping = (shipping: {
  fullName: string;
  phone: string;
  address: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!shipping.fullName.trim()) {
    errors.push("Full name is required");
  }

  if (!shipping.phone.trim()) {
    errors.push("Phone number is required");
  }

  if (!shipping.address.trim()) {
    errors.push("Shipping address is required");
  }

  if (shipping.phone.trim() && !/^[\d\s\-+()]{7,}$/.test(shipping.phone)) {
    errors.push("Please enter a valid phone number");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Get human-readable payment method label
 */
export const getPaymentMethodLabel = (method: PaymentMethod): string => {
  const labels: Record<PaymentMethod, string> = {
    cod: "Cash on Delivery",
    maya: "Maya",
  };
  return labels[method];
};
