import type { PaymentMethod } from "./order.types";

/**
 * In-modal / in-form shape used by CheckoutModal and CheckoutPage.
 * Matches CheckoutModal's PaymentData export exactly.
 */
export interface PaymentFormData {
  method: PaymentMethod;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

/**
 * Payload sent to the order service when placing an order.
 * referenceNumber removed — PayMongo handles GCash confirmation automatically.
 */
export interface PaymentPayload {
  method: PaymentMethod;
}
