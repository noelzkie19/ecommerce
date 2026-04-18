"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  AlertTriangle,
  Check,
  Loader2,
  PackageCheck,
  QrCode,
} from "lucide-react";
import { useOrder } from "./hooks/useOrder";
import { useCartStore } from "@/store/cart.store";
import { orderService } from "./services/order.service";
import type {
  ShippingData,
  PaymentData,
  ModalCartItem,
} from "@/types/checkout.types";
import {
  getContinueButtonLabel,
  getBackButtonLabel,
} from "@/utils/checkout.utils";
import { STEPS } from "@/shared/utils/checkout.constants";
import { CartStep } from "./components/CartStep";
import { ShippingStep } from "./components/ShippingStep";
import { PaymentStep } from "./components/PaymentStep";

// ─── Payment Success Modal ────────────────────────────────────────────────────
const PaymentSuccessModal = ({
  visible,
  onHome,
  onContinue,
}: {
  readonly visible: boolean;
  readonly onHome: () => void;
  readonly onContinue: () => void;
}) => {
  if (!visible) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center gap-4 max-w-sm w-full"
        style={{
          animation: "successPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-1"
          style={{
            background: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
            boxShadow: "0 8px 32px rgba(249,115,22,0.35)",
            animation: "successPulse 1.5s ease-in-out infinite",
          }}
        >
          <PackageCheck size={38} color="white" strokeWidth={2} />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight text-center">
          Order Confirmed! 🎉
        </h2>
        <p className="text-gray-500 text-sm text-center leading-relaxed">
          Your payment was received and your order is now being processed.
        </p>
        <div className="w-full h-px bg-gray-100 my-1" />
        <div className="flex items-center gap-2 bg-orange-50 rounded-xl px-4 py-2.5 w-full">
          <Check
            size={15}
            className="text-orange-600 shrink-0"
            strokeWidth={3}
          />
          <span className="text-orange-600 text-xs font-semibold">
            Confirmation sent to your contact details
          </span>
        </div>
        <div className="flex flex-col gap-2 w-full mt-1">
          <button
            type="button"
            onClick={onHome}
            className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-bold text-sm py-3 rounded-xl transition-all shadow-md shadow-orange-200"
          >
            Back to Home
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="w-full border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-bold text-sm py-3 rounded-xl transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
      <style>{`
        @keyframes successPop {
          from { opacity: 0; transform: scale(0.7) translateY(24px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes successPulse {
          0%, 100% { box-shadow: 0 8px 32px rgba(124,58,237,0.35); }
          50%       { box-shadow: 0 8px 48px rgba(124,58,237,0.55); }
        }
      `}</style>
    </div>
  );
};

// ─── QR Payment Modal ─────────────────────────────────────────────────────────
const QrPaymentModal = ({
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
        /* ignore transient */
      }
      if (attempts >= 100) clearInterval(intervalRef.current!);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [intentId, onPaid]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center gap-4 max-w-sm w-full"
        style={{ animation: "qrPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}
      >
        {pollStatus === "paid" ? (
          <>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
              }}
            >
              <Check size={38} color="white" strokeWidth={3} />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 text-center">
              Payment Received!
            </h2>
            <p className="text-gray-500 text-sm text-center">
              Confirming your order...
            </p>
            <Loader2 size={20} className="text-orange-400 animate-spin" />
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <QrCode size={20} className="text-blue-500 shrink-0" />
              <h2 className="text-lg font-extrabold text-gray-900">
                Scan to Pay via Maya
              </h2>
            </div>
            <p className="text-gray-500 text-sm text-center leading-relaxed">
              Open your{" "}
              <span className="font-bold text-blue-600">Maya app</span> and scan
              the QR code below to complete your payment.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrCodeUrl}
              alt="Maya QR Code"
              className="w-56 h-56 rounded-2xl border border-gray-100 shadow"
            />
            <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-2.5 w-full">
              {pollStatus === "failed" ? (
                <span className="text-red-500 text-xs font-semibold w-full text-center">
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
              className="text-gray-400 text-xs underline underline-offset-2 hover:text-gray-600 transition-colors"
            >
              I&apos;ll pay later — go to home
            </button>
          </>
        )}
      </div>
      <style>{`
        @keyframes qrPop {
          from { opacity: 0; transform: scale(0.7) translateY(24px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

// ─── Step Indicator ───────────────────────────────────────────────────────────
const getCircleClass = (done: boolean, active: boolean) => {
  if (done) return "bg-orange-500 text-white";
  if (active) return "bg-orange-500 text-white ring-4 ring-orange-100";
  return "bg-gray-100 text-gray-400";
};
const getLabelClass = (done: boolean, active: boolean) => {
  if (active) return "text-orange-600";
  if (done) return "text-orange-400";
  return "text-gray-400";
};
const StepIndicator = ({ current }: { readonly current: number }) => (
  <div className="flex items-center w-full max-w-xs">
    {STEPS.map((step: { id: number; label: string }, idx: number) => {
      const done = current > step.id;
      const active = current === step.id;
      return (
        <div key={step.id} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${getCircleClass(done, active)}`}
            >
              {done ? <Check size={14} strokeWidth={3} /> : step.id}
            </div>
            <span
              className={`text-[11px] font-semibold ${getLabelClass(done, active)}`}
            >
              {step.label}
            </span>
          </div>
          {idx < STEPS.length - 1 && (
            <div
              className="flex-1 h-px mx-2 mb-4 transition-all"
              style={{ background: current > step.id ? "#9333ea" : "#e5e7eb" }}
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
  shipping,
  onShippingChange,
  payment,
  onPaymentChange,
}: {
  readonly step: number;
  readonly items: ModalCartItem[];
  readonly shipping: ShippingData;
  readonly onShippingChange: (d: ShippingData) => void;
  readonly payment: PaymentData;
  readonly onPaymentChange: (d: PaymentData) => void;
}) => {
  if (step === 1)
    return (
      <CartStep items={items} onQtyChange={() => {}} onRemove={() => {}} />
    );
  if (step === 2)
    return <ShippingStep data={shipping} onChange={onShippingChange} />;
  return (
    <PaymentStep data={payment} onChange={onPaymentChange} items={items} />
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function OrderPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [shipping, setShipping] = useState<ShippingData>({
    email: "",
    fullName: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [payment, setPayment] = useState<PaymentData>({ method: "cod" });

  const {
    placeOrder,
    isLoading,
    error: orderError,
    qrCodeUrl,
    order,
  } = useOrder();
  const { cart } = useCartStore();

  const items: ModalCartItem[] = cart.items.map((item) => {
    // Use bundle price if applicable
    const unitPrice =
      item.productBundle && item.quantity >= item.productBundle.bundleQty
        ? item.productBundle.bundlePrice / item.productBundle.bundleQty
        : item.product.price;
    return {
      id: item.id,
      name: item.product.name,
      price: unitPrice,
      quantity: item.quantity,
      image:
        item.product.images?.[0]?.url ?? item.product.image_url ?? undefined,
      stock: item.product.stock ?? null,
      productBundleId: item.productBundleId,
      productBundle: item.productBundle,
    };
  });

  // Check if any item exceeds available stock
  const hasStockIssue = items.some(
    (item) => item.stock != null && item.quantity > item.stock,
  );

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
    // Maya → qrCodeUrl is set in useOrder → QrPaymentModal appears automatically
    // COD → show success modal directly
    if (payment.method === "cod") setShowSuccess(true);
  };

  const handleBack = () => {
    if (step === 1) {
      router.back();
      return;
    }
    setStep((s) => s - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* COD: success modal */}
      <PaymentSuccessModal
        visible={showSuccess}
        onHome={() => router.push("/")}
        onContinue={() => router.push("/shop")}
      />

      {/* Maya: QR modal → polls PayMongo → on paid shows success modal */}
      {qrCodeUrl && !showSuccess && (
        <QrPaymentModal
          qrCodeUrl={qrCodeUrl}
          intentId={order?.payment_intent_id ?? null}
          onPaid={() => setShowSuccess(true)}
          onSkip={() => router.push("/")}
        />
      )}

      <div className="w-full max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-8 sm:pb-12">
        <div className="flex items-center gap-4 mb-8">
          <button
            type="button"
            onClick={handleBack}
            className="w-9 h-9 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-orange-300 hover:text-orange-600 transition-all"
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Checkout
          </h1>
        </div>
        <div className="mb-8">
          <StepIndicator current={step} />
        </div>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-6">
          <StepContent
            step={step}
            items={items}
            shipping={shipping}
            onShippingChange={setShipping}
            payment={payment}
            onPaymentChange={setPayment}
          />
        </div>
        {/* Order error */}
        {orderError && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 mb-4">
            <AlertTriangle size={15} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-red-600 leading-snug">
              {orderError}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="border-2 border-gray-200 text-gray-600 hover:border-gray-300 font-bold text-sm px-6 py-3 rounded-xl transition-all"
          >
            {getBackButtonLabel(step)}
          </button>
          <button
            type="button"
            onClick={handleContinue}
            disabled={!getCanContinue() || isLoading}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed active:scale-[0.98] text-white font-bold text-sm py-3 px-8 rounded-xl transition-all shadow-md shadow-orange-200"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              getContinueButtonLabel(step)
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
