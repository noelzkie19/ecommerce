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
  FREE_SHIPPING_THRESHOLD: 0,

  /** Shipping cost - always free now */
  SHIPPING_COST: 0,

  /** Bundle pricing */
  BUNDLE: {
    BUY_2_GET_1: {
      quantity: 3,
      price: 990,
      label: "Buy 2 Get 1 Free",
    },
    BUY_5_GET_3: {
      quantity: 8,
      price: 2560,
      label: "Buy 5 Get 3 Free",
    },
  },
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
    // {
    //   id: "maya" as PaymentMethod,
    //   label: "Maya",
    //   description: "Pay via Maya mobile wallet",
    // },
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
 * Returns 0 (free shipping on all orders)
 */
export const calculateShipping = (subtotal: number): number => {
  return 0;
};

/**
 * Calculate bundle price based on quantity
 * - Buy 2 get 1 free: 3 items for P990
 * - Buy 5 get 3 free: 8 items for P2560
 * - Else: regular price per item
 */
export const calculateBundlePrice = (
  unitPrice: number,
  quantity: number,
): number => {
  const { BUNDLE } = PRICING;

  if (quantity >= BUNDLE.BUY_5_GET_3.quantity) {
    return BUNDLE.BUY_5_GET_3.price;
  }

  if (quantity >= BUNDLE.BUY_2_GET_1.quantity) {
    return BUNDLE.BUY_2_GET_1.price;
  }

  return unitPrice * quantity;
};

/**
 * Get bundle offer info if applicable
 */
export const getBundleOffer = (
  quantity: number,
): { label: string; description: string } | null => {
  const { BUNDLE } = PRICING;

  if (quantity >= BUNDLE.BUY_5_GET_3.quantity) {
    return {
      label: BUNDLE.BUY_5_GET_3.label,
      description: `${quantity} items for ₱${BUNDLE.BUY_5_GET_3.price.toLocaleString()}`,
    };
  }

  if (quantity >= BUNDLE.BUY_2_GET_1.quantity) {
    return {
      label: BUNDLE.BUY_2_GET_1.label,
      description: `${quantity} items for ₱${BUNDLE.BUY_2_GET_1.price.toLocaleString()}`,
    };
  }

  return null;
};

/**
 * Calculate line total for a cart item, respecting explicit bundle selection.
 * If a productBundle is provided and quantity >= bundle.bundleQty, applies
 * full bundles and charges regular price for any remainder.
 * Otherwise falls back to unitPrice × quantity.
 */
export const calculateItemTotal = (
  unitPrice: number,
  quantity: number,
  productBundle?: { bundleQty: number; bundlePrice: number } | null,
): number => {
  if (productBundle && quantity >= productBundle.bundleQty) {
    const fullBundles = Math.floor(quantity / productBundle.bundleQty);
    const remainder = quantity % productBundle.bundleQty;
    return fullBundles * productBundle.bundlePrice + remainder * unitPrice;
  }
  return unitPrice * quantity;
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
