/**
 * Checkout Utilities
 *
 * UI-related utilities for checkout flow.
 * Delegates to domain rules for business logic.
 */

import type { PaymentMethod } from "@/types/order.types";
import type { ModalCartItem } from "@/types/checkout.types";
import {
  calculateShipping,
  calculateBaseTotal,
  calculateGCashTotal,
  getPaymentMethodLabel,
  calculateItemTotal,
} from "@/domain/rules";

// Re-export PRICING from domain
export { PRICING } from "@/domain/rules";

/**
 * Step indicator UI styles
 */
export const getStepCircleClass = (done: boolean, active: boolean): string => {
  if (done) return "bg-purple-600 text-white shadow-md shadow-purple-200";
  if (active)
    return "bg-purple-600 text-white shadow-lg shadow-purple-300 ring-4 ring-purple-100";
  return "bg-gray-100 text-gray-400";
};

/**
 * Step label UI styles
 */
export const getStepLabelClass = (done: boolean, active: boolean): string => {
  if (active) return "text-purple-600";
  if (done) return "text-purple-400";
  return "text-gray-400";
};

/**
 * Step connector color
 */
export const getStepConnectorColor = (
  current: number,
  stepId: number,
): string => (current > stepId ? "#9333ea" : "#e5e7eb");

/**
 * Get continue button label
 */
export const getContinueButtonLabel = (step: number): string =>
  step === 3 ? "Place Order" : "Continue";

/**
 * Get back button label
 */
export const getBackButtonLabel = (step: number): string =>
  step === 1 ? "Cancel" : "Back";

/**
 * Get payment method label - delegates to domain
 */
export const getPaymentMethodLabelFn = (method: PaymentMethod): string => {
  return getPaymentMethodLabel(method);
};

/**
 * Calculate subtotal - respects explicit bundle selection
 */
export const calcSubtotal = (items: ModalCartItem[]): number => {
  return items.reduce((sum, item) => {
    const unitPrice = item.price;
    return (
      sum + calculateItemTotal(unitPrice, item.quantity, item.productBundle)
    );
  }, 0);
};

/**
 * Calculate shipping - delegates to domain
 */
export const calcShipping = (subtotal: number): number => {
  return calculateShipping(subtotal);
};

/**
 * Calculate total - delegates to domain
 */
export const calcTotal = (subtotal: number): number => {
  return calculateBaseTotal(subtotal, calculateShipping(subtotal));
};

/**
 * Calculate total with GCash discount
 */
export const calcGCashTotal = (subtotal: number): number => {
  const shipping = calculateShipping(subtotal);
  return calculateGCashTotal(subtotal, shipping);
};
