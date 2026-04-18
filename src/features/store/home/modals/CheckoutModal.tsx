"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  AlertTriangle,
  Check,
  ChevronRight,
  Loader2,
  PackageCheck,
  Smartphone,
} from "lucide-react";
import { useOrder } from "@/features/store/order/hooks/useOrder";
import { orderService } from "@/features/store/order/services/order.service";
import type {
  CheckoutModalProps,
  ShippingData,
  PaymentData,
  ModalCartItem,
} from "@/types/checkout.types";
import {
  getStepCircleClass,
  getStepLabelClass,
  getStepConnectorColor,
  getContinueButtonLabel,
  getBackButtonLabel,
} from "@/utils/checkout.utils";
import { STEPS } from "@/shared/utils/checkout.constants";
import { CartStep } from "../../order/components/CartStep";
import { ShippingStep } from "../../order/components/ShippingStep";
import { PaymentStep } from "../../order/components/PaymentStep";
import { trackPurchase, trackInitiateCheckout } from "@/lib/meta-pixel";
import { calculateItemTotal } from "@/domain/rules";

// ─── Step Indicator ───────────────────────────────────────────────────────────
const StepIndicator = ({ current }: { readonly current: number }) => (
  <div className="flex items-center w-full">
    {STEPS.map((step: { id: number; label: string }, idx: number) => {
      const done = current > step.id;
      const active = current === step.id;
      return (
        <div key={step.id} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${getStepCircleClass(done, active)}`}
            >
              {done ? <Check size={13} strokeWidth={3} /> : step.id}
            </div>
            <span
              className={`text-[9px] sm:text-[10px] font-semibold whitespace-nowrap ${getStepLabelClass(done, active)}`}
            >
              {step.label}
            </span>
          </div>
          {idx < STEPS.length - 1 && (
            <div
              className="flex-1 h-px mx-1.5 sm:mx-2 mb-4 transition-all duration-500"
              style={{ background: getStepConnectorColor(current, step.id) }}
            />
          )}
        </div>
      );
    })}
  </div>
);

// ─── Step Content ─────────────────────────────────────────────────────────────
const StepContent = ({
  step,
  items,
  onQuantityChange,
  onRemove,
  shipping,
  onShippingChange,
  payment,
  onPaymentChange,
}: {
  readonly step: number;
  readonly items: ModalCartItem[];
  readonly onQuantityChange: (id: string, qty: number) => void;
  readonly onRemove: (id: string) => void;
  readonly shipping: ShippingData;
  readonly onShippingChange: (d: ShippingData) => void;
  readonly payment: PaymentData;
  readonly onPaymentChange: (d: PaymentData) => void;
}) => {
  if (step === 1)
    return (
      <CartStep
        items={items}
        onQtyChange={onQuantityChange}
        onRemove={onRemove}
        compact
      />
    );
  if (step === 2)
    return <ShippingStep data={shipping} onChange={onShippingChange} compact />;
  return (
    <PaymentStep
      data={payment}
      onChange={onPaymentChange}
      items={items}
      compact
    />
  );
};

// ─── Success Screen ───────────────────────────────────────────────────────────
const SuccessScreen = ({ onClose }: { readonly onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center gap-5 py-6 sm:py-8 text-center">
    <div
      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 flex items-center justify-center"
      style={{
        animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
      }}
    >
      <Check size={30} className="text-emerald-500 sm:hidden" strokeWidth={3} />
      <Check
        size={36}
        className="text-emerald-500 hidden sm:block"
        strokeWidth={3}
      />
    </div>
    <div>
      <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-1">
        Order Placed!
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">
        Thank you for your purchase.
        <br />
        We'll send you a confirmation shortly.
      </p>
    </div>
    <button
      type="button"
      onClick={onClose}
      className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-sm px-8 py-3 rounded-xl transition-all shadow-md shadow-orange-200 w-full sm:w-auto"
    >
      Continue Shopping
    </button>
  </div>
);

// ─── QR Payment Screen ────────────────────────────────────────────────────────
const QrPaymentScreen = ({
  qrCodeUrl,
  intentId,
  onPaid,
  onSkip,
}: {
  readonly qrCodeUrl: string;
  readonly intentId: string | null;
  readonly onPaid: () => void;
  readonly onSkip: () => void;
}) => {
  const [pollStatus, setPollStatus] = useState<"waiting" | "paid" | "failed">(
    "waiting",
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!intentId) return;
    let attempts = 0;
    intervalRef.current = setInterval(async () => {
      attempts++;
      try {
        const result = await orderService.verifyMaya(intentId);
        if (result.status === "succeeded" || result.alreadyConfirmed) {
          clearInterval(intervalRef.current!);
          setPollStatus("paid");
          setTimeout(onPaid, 1500);
        } else if (result.status === "payment_intent.payment_failed") {
          clearInterval(intervalRef.current!);
          setPollStatus("failed");
        }
      } catch {
        /* ignore transient errors */
      }
      if (attempts >= 100) clearInterval(intervalRef.current!);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [intentId, onPaid]);

  if (pollStatus === "paid") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-6 sm:py-8 text-center">
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
            animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
          }}
        >
          <PackageCheck
            size={32}
            color="white"
            strokeWidth={2}
            className="sm:hidden"
          />
          <PackageCheck
            size={36}
            color="white"
            strokeWidth={2}
            className="hidden sm:block"
          />
        </div>
        <h3 className="text-lg sm:text-xl font-extrabold text-gray-900">
          Payment Received!
        </h3>
        <p className="text-sm text-gray-500">Confirming your order...</p>
        <Loader2 size={18} className="text-orange-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-2 text-center">
      <div className="flex items-center gap-2">
        <Smartphone size={18} className="text-blue-500 shrink-0" />
        <h3 className="text-sm sm:text-base font-extrabold text-gray-900">
          Pay via Maya
        </h3>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
        Your <span className="font-bold text-blue-600">Maya app</span> will open
        directly to complete your payment.
      </p>
      {/* QR code — smaller on mobile to fit without scroll */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={qrCodeUrl}
        alt="Maya QR Code"
        className="w-36 h-36 sm:w-48 sm:h-48 rounded-2xl border border-gray-100 shadow"
      />
      <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-2.5 w-full justify-center">
        {pollStatus === "failed" ? (
          <span className="text-red-500 text-xs font-semibold">
            Payment failed. Please try again.
          </span>
        ) : (
          <>
            <Loader2
              size={13}
              className="text-blue-400 animate-spin shrink-0"
            />
            <span className="text-blue-600 text-xs font-semibold">
              Waiting for payment confirmation...
            </span>
          </>
        )}
      </div>
      <button
        type="button"
        onClick={onSkip}
        className="text-gray-400 text-xs underline underline-offset-2 hover:text-gray-600 transition-colors py-1"
      >
        I'll pay later — close
      </button>
    </div>
  );
};

// ─── Main Modal ───────────────────────────────────────────────────────────────
export const CheckoutModal = ({
  isOpen,
  onClose,
  items,
  onQuantityChange,
  onRemove,
  onPlaceOrder,
}: CheckoutModalProps) => {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [shipping, setShipping] = useState<ShippingData>({
    email: "",
    fullName: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [payment, setPayment] = useState<PaymentData>({ method: "cod" });
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { placeOrder, order, qrCodeUrl } = useOrder();

  // Check if any item exceeds available stock
  const hasStockIssue = items.some(
    (item) => item.stock != null && item.quantity > item.stock,
  );

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSuccess(false);
      setIsSubmitting(false);
      setShipping({
        email: "",
        fullName: "",
        phone: "",
        address: "",
        notes: "",
      });
      setPayment({ method: "cod" });
      dialogRef.current?.showModal();

      // Track InitiateCheckout event when checkout modal opens
      if (items && items.length > 0) {
        const total = items.reduce((sum, item) => {
          const lineTotal = calculateItemTotal(
            item.price,
            item.quantity,
            item.productBundle,
          );
          return sum + lineTotal;
        }, 0);
        trackInitiateCheckout(
          total,
          items.map((item) => {
            const lineTotal = calculateItemTotal(
              item.price,
              item.quantity,
              item.productBundle,
            );
            return {
              id: item.id,
              quantity: item.quantity,
              price: lineTotal / item.quantity,
            };
          }),
        );
      }
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    el.addEventListener("cancel", handleCancel);
    return () => el.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (qrCodeUrl && !success) return;
      const rect = el.getBoundingClientRect();
      const outside =
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom;
      if (outside) onClose();
    };
    el.addEventListener("mousedown", handleMouseDown);
    return () => el.removeEventListener("mousedown", handleMouseDown);
  }, [onClose, qrCodeUrl, success]);

  // Track purchase event when order is successful
  useEffect(() => {
    if (success && items.length > 0) {
      const total = items.reduce((sum, item) => {
        const lineTotal = calculateItemTotal(
          item.price,
          item.quantity,
          item.productBundle,
        );
        return sum + lineTotal;
      }, 0);
      trackPurchase(
        total,
        items.map((item) => {
          const lineTotal = calculateItemTotal(
            item.price,
            item.quantity,
            item.productBundle,
          );
          return {
            id: item.id,
            quantity: item.quantity,
            price: lineTotal / item.quantity,
          };
        }),
      );
    }
  }, [success, items]);

  const isShippingValid = Boolean(
    shipping.fullName.trim() &&
    shipping.phone.trim() &&
    shipping.address.trim(),
  );

  const getCanContinue = (): boolean => {
    if (step === 1) return items.length > 0 && !hasStockIssue;
    if (step === 2) return isShippingValid;
    return !hasStockIssue;
  };

  const handleContinue = async () => {
    if (step < 3) {
      setStep((s) => s + 1);
      return;
    }
    setIsSubmitting(true);
    setOrderError(null);
    try {
      // Read affiliate referral code from sessionStorage (set by GoogleButton/useRegister)
      let referralCode: string | undefined;
      try {
        referralCode = sessionStorage.getItem("affiliate_ref") ?? undefined;
      } catch {
        // ignore
      }

      await placeOrder({
        fullName: shipping.fullName,
        email: shipping.email ?? "",
        phoneNumber: shipping.phone,
        shippingAddress: shipping.address,
        orderNotes: shipping.notes || undefined,
        paymentMethod: payment.method,
        referralCode,
      });

      // Store order data for Meta Pixel tracking (used by Maya callback)
      if (typeof sessionStorage !== "undefined") {
        const orderData = {
          items: items.map((item) => {
            const lineTotal = calculateItemTotal(
              item.price,
              item.quantity,
              item.productBundle,
            );
            return {
              id: item.id,
              quantity: item.quantity,
              price: lineTotal / item.quantity,
            };
          }),
          total: items.reduce((sum, item) => {
            const lineTotal = calculateItemTotal(
              item.price,
              item.quantity,
              item.productBundle,
            );
            return sum + lineTotal;
          }, 0),
          timestamp: Date.now(),
        };
        sessionStorage.setItem("pending_order", JSON.stringify(orderData));
      }

      await onPlaceOrder();
      if (payment.method === "cod") {
        setSuccess(true);
      }
    } catch (err: unknown) {
      console.error("Order failed:", err);
      const axiosErr = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const serverMsg =
        axiosErr?.response?.data?.message ?? axiosErr?.message ?? "";
      const isStockError =
        serverMsg.toLowerCase().includes("stock") ||
        serverMsg.toLowerCase().includes("insufficient") ||
        serverMsg.toLowerCase().includes("available");
      setOrderError(
        isStockError
          ? "Some items are no longer available in the requested quantity. Please review your cart."
          : "Failed to place order. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      onClose();
      return;
    }
    setStep((s) => s - 1);
  };

  const showQr = Boolean(qrCodeUrl) && !success;
  const showSteps = !showQr && !success;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <dialog
        ref={dialogRef}
        aria-label="Checkout"
        className={[
          "p-0 bg-transparent overflow-visible",

          // Mobile bottom sheet
          "fixed bottom-0 left-0 right-0 w-full max-w-full m-0 rounded-t-3xl",

          // Desktop centered modal
          "sm:fixed sm:top-1/2 sm:left-1/2 sm:bottom-auto sm:right-auto",
          "sm:-translate-x-1/2 sm:-translate-y-1/2",
          "sm:max-w-md sm:w-full sm:rounded-3xl",

          "backdrop:bg-black/40 backdrop:backdrop-blur-sm",
        ].join(" ")}
        style={{ animation: "slideUp 0.25s cubic-bezier(0.34,1.2,0.64,1)" }}
      >
        {/* Inner card — square bottom on mobile (flush with screen edge), rounded top */}
        <div className="bg-white w-full overflow-hidden rounded-t-3xl sm:rounded-3xl shadow-2xl">
          {/* Drag handle — mobile only */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-gray-200" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-5 border-b border-gray-100">
            <h2 className="text-base sm:text-lg font-extrabold text-gray-900">
              Checkout
            </h2>
            {!showQr && (
              <button
                type="button"
                aria-label="Close checkout"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Step Indicator */}
          {showSteps && (
            <div className="px-5 sm:px-6 pt-4 sm:pt-5 pb-1">
              <StepIndicator current={step} />
            </div>
          )}

          {/* Body — capped height so it never overflows viewport */}
          <div
            className="px-5 sm:px-6 py-4 sm:py-5 overflow-y-auto overscroll-contain"
            style={{ maxHeight: "calc(100dvh - 220px)" }}
          >
            {success && <SuccessScreen onClose={onClose} />}
            {showQr && (
              <QrPaymentScreen
                qrCodeUrl={qrCodeUrl!}
                intentId={order?.payment_intent_id ?? null}
                onPaid={() => setSuccess(true)}
                onSkip={onClose}
              />
            )}
            {showSteps && (
              <StepContent
                step={step}
                items={items}
                onQuantityChange={onQuantityChange}
                onRemove={onRemove}
                shipping={shipping}
                onShippingChange={setShipping}
                payment={payment}
                onPaymentChange={setPayment}
              />
            )}
          </div>

          {/* Footer */}
          {showSteps && (
            <div className="flex flex-col px-5 sm:px-6 pb-6 sm:pb-6 pt-3 gap-2 border-t border-gray-50">
              {/* Order error */}
              {orderError && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
                  <AlertTriangle
                    size={13}
                    className="text-red-500 shrink-0 mt-0.5"
                  />
                  <p className="text-xs font-semibold text-red-600 leading-snug">
                    {orderError}
                  </p>
                </div>
              )}
              {/* Safe-area padding for iPhones with home indicator */}
              <div className="pb-safe w-full flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="border-2 border-gray-200 text-gray-600 hover:border-gray-300 font-bold text-sm px-4 sm:px-5 py-2.5 rounded-xl transition-all shrink-0"
                >
                  {getBackButtonLabel(step)}
                </button>
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!getCanContinue() || isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed active:scale-[0.98] text-white font-bold text-sm py-2.5 px-4 sm:px-6 rounded-xl transition-all shadow-md shadow-orange-200"
                >
                  {isSubmitting ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <>
                      {getContinueButtonLabel(step)}
                      <ChevronRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes popIn {
          from { transform: scale(0); }
          to   { transform: scale(1); }
        }
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
        }
        /* iPhone safe area support */
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
      `}</style>
      </dialog>
    </div>
  );
};
